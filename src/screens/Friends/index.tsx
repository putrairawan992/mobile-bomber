/* eslint-disable react-native/no-inline-styles */
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {Setting2} from 'iconsax-react-native';
import * as React from 'react';
import {createRef, useContext, useState} from 'react';
import {Pressable, View} from 'react-native';
import PagerView from 'react-native-pager-view';
import {Gap, Layout, Loading, Section, Spacer, TextInput} from '../../components/atoms';

import {Header, ModalToast, TabMenu} from '../../components/molecules';
import {
  FriendInviteConfirmationSheet,
  FriendOptionSheet,
  ProfileSecuritySheet,
} from '../../components/organism';
import {FriendBottomSheet} from '../../components/organism/Friends/FriendBottomSheet';
import {FriendInvitePartySheet} from '../../components/organism/Friends/FriendInvitePartySheet';
import {PartyInterface} from '../../interfaces/BookingInterface';
import {
  FriendInterface,
  RequestFriendHistoryInterface,
} from '../../interfaces/UserInterface';
import {Colors} from '../../theme';
import useTheme from '../../theme/useTheme';
import {WIDTH} from '../../utils/config';
import {PARTY_DATA} from '../../utils/data';
import styles from '../Styles';
import {ExploreTab} from './ExploreTab';
import {FriendsTab} from './FriendsTab';
import {FriendshipService} from '../../service/FriendshipService';
import {useAppSelector} from '../../hooks/hooks';
import {ModalToastContext} from '../../context/AppModalToastContext';
import {RequestTab} from './RequestTab';
import {MainStackParams} from '../../navigation/MainScreenStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useFocusEffect} from '@react-navigation/native';
import {RequestFriendNotificationInterface} from '../../interfaces/NotificationInterface';
import {NotificationService} from '../../service/NotificationService';
import {useDispatch} from 'react-redux';

type Props = NativeStackScreenProps<MainStackParams, 'Friends', 'MyStack'>;

function FriendsScreen({navigation}: Props) {
  const [menu] = useState<string[]>(['Friends', 'Explore', 'Request', 'Squad']);
  const [sheetAction, setSheetAction] = useState<string>('');
  const [initialPage, setInitialPage] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<FriendInterface | null>(
    null,
  );
  const [selectedParty, setSelectedParty] = useState<PartyInterface | null>(
    null,
  );
  const [friendshipData, setFriendshipData] = useState<FriendInterface[]>([]);
  const [allUsers, setAllUsers] = useState<FriendInterface[]>([]);
  const [requestHistory, setRequestHistory] = useState<
    RequestFriendHistoryInterface[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const ref = createRef<PagerView>();
  const theme = useTheme();
  const {user} = useAppSelector(state => state.user);
  const {friendRequest} = useAppSelector(state => state.notification);
  const [sheetIndex, setSheetIndex] = React.useState<number>(-1);
  const friendSheetRef = React.useRef<BottomSheetModal>(null);
  const dispatch = useDispatch();
  const snapPoints = React.useMemo(
    () =>
      sheetAction === 'profileSecurity'
        ? ['30']
        : sheetAction === 'friendOption'
        ? ['48']
        : sheetAction === 'inviteParty'
        ? ['40']
        : sheetAction === 'inviteConfirmation'
        ? ['80']
        : ['60'],
    [sheetAction],
  );

  const {
    isShowToast,
    setIsShowToast,
    toastMessage,
    setToastMessage,
    type,
    setType,
  } = useContext(ModalToastContext);

  const openToast = (toastType: 'success' | 'error', message: string) => {
    setIsShowToast(true);
    setType(toastType);
    setToastMessage(message);
  };

  const handleSheetChanges = React.useCallback((index: number) => {
    setSheetIndex(index);
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      await Promise.all([
        FriendshipService.getFriendship({
          userId: user.id,
        }),
        FriendshipService.getAllUsers({
          userId: user.id,
        }),
        FriendshipService.getSendRequestHistory({
          userId: user.id,
        }),
      ])
        .then(response => {
          setFriendshipData(response[0].data);
          setAllUsers(response[1].data);
          setRequestHistory(response[2].data);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    } catch (error: any) {}
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigation]),
  );

  const fetchNotification = async () => {
    try {
      await NotificationService.getInvitationNotification(user.id, dispatch);
      await NotificationService.getRequestFriendNotification(user.id, dispatch);
    } catch (error: any) {}
  };

  const onOpenBottomSheet = (sheetType: string, data?: FriendInterface) => {
    data && setSelectedUser(data);
    setSheetAction(sheetType);
    setTimeout(() => {
      friendSheetRef.current?.present();
    }, 100);
  };

  const handleAddFriend = async () => {
    try {
      friendSheetRef.current?.close();
      setIsLoading(true);
      const response = await FriendshipService.postAddFriend({
        payload: {
          customer_id: user.id,
          new_friend_id: selectedUser?.customerId as string,
        },
      });
      await fetchData();
      setIsLoading(false);
      openToast('success', response.message);
    } catch (error: any) {
      openToast('error', error.response.data?.message);
      setIsLoading(false);
    }
  };

  const handleApproveFriendRequest = async (
    data: RequestFriendNotificationInterface,
  ) => {
    try {
      setIsLoading(true);
      const response = await FriendshipService.putAcceptFriendRequest({
        id: data.id,
        user_id: user.id,
        new_friend_id: data.senderId,
      });
      if (!response.error) {
        await fetchNotification();
        await fetchData();
        setIsLoading(false);
        openToast('success', 'You accepted the friend request');
      }
    } catch (error: any) {
      setIsLoading(false);
      openToast('error', error.response.data.message);
    }
  };

  return (
    <Layout contentContainerStyle={styles.container} isDisableKeyboardAware>
      <Header
        transparent
        title="Friends"
        rightCustomComponent={<Setting2 size={24} color={theme?.colors.ICON} />}
        onRightCustomComponentPress={() => onOpenBottomSheet('profileSecurity')}
      />
      {isLoading && <Loading />}
      <Section padding="12px 16px">
        <TextInput
          type="search"
          value={searchValue}
          onChangeText={(text: string) => setSearchValue(text)}
          placeholder="Search friend's name or email"
        />
      </Section>
      <Spacer sm />
      <Section isRow isCenter>
        {menu.map((item, index) => {
          const isSelected = index === initialPage;
          return (
            <TabMenu
              onPress={idx => ref.current?.setPage(idx)}
              isSelected={isSelected}
              width={WIDTH / menu.length}
              item={item}
              index={index}
            />
          );
        })}
      </Section>
      <Gap height={20} />
      <Section style={{flex: 1}}>
        <PagerView
          style={styles.container}
          initialPage={initialPage}
          ref={ref}
          onPageSelected={e => setInitialPage(e.nativeEvent.position)}>
          <View key="1">
            <FriendsTab
              data={friendshipData}
              searchValue={searchValue}
              onSelectUser={userData =>
                onOpenBottomSheet('userProfile', userData)
              }
              onFriendOption={userData =>
                onOpenBottomSheet('friendOption', userData)
              }
            />
          </View>
          <View key="2">
            <ExploreTab
              data={allUsers}
              searchValue={searchValue}
              onSelect={data => {
                setSelectedUser(data);
                setSheetAction('addFriend');
                setTimeout(() => {
                  friendSheetRef.current?.present();
                }, 100);
              }}
            />
          </View>
          <View key="3">
            <RequestTab
              sendData={requestHistory}
              receivedData={friendRequest}
              searchValue={searchValue}
              onSelectUser={() => undefined}
              onApprove={handleApproveFriendRequest}
              onCancel={() => undefined}
            />
          </View>
        </PagerView>
      </Section>
      <BottomSheetModal
        ref={friendSheetRef}
        index={0}
        enablePanDownToClose
        snapPoints={snapPoints}
        backdropComponent={({style}) =>
          sheetIndex === 0 ? (
            <Pressable
              onPress={() => friendSheetRef.current?.close()}
              style={[style, {backgroundColor: 'rgba(0, 0, 0, 0.60)'}]}
            />
          ) : (
            <></>
          )
        }
        handleStyle={{
          backgroundColor: theme?.colors.SECTION,
          borderTopRightRadius: 14,
          borderTopLeftRadius: 14,
        }}
        handleIndicatorStyle={{backgroundColor: Colors['black-70'], width: 50}}
        onChange={handleSheetChanges}>
        {sheetAction === 'profileSecurity' ? (
          <ProfileSecuritySheet />
        ) : sheetAction === 'friendOption' ? (
          <FriendOptionSheet
            data={selectedUser}
            onInviteParty={data =>
              onOpenBottomSheet('inviteParty', data ?? undefined)
            }
          />
        ) : sheetAction === 'inviteParty' ? (
          <FriendInvitePartySheet
            data={selectedUser}
            partyData={PARTY_DATA}
            onBackPress={() => setSheetAction('friendOption')}
            onInviteConfirmation={(party, userData) => {
              setSelectedUser(userData);
              setSelectedParty(party);
              setSheetAction('inviteConfirmation');
            }}
          />
        ) : sheetAction === 'inviteConfirmation' ? (
          <FriendInviteConfirmationSheet
            user={selectedUser}
            party={selectedParty}
            onBackPress={() => setSheetAction('inviteParty')}
            type="invite"
            data={null}
            onConfirm={() => undefined}
          />
        ) : (
          <FriendBottomSheet
            data={selectedUser}
            isFriend={initialPage === 0}
            onConfirm={() => {
              if (initialPage === 1) {
                handleAddFriend();
              }
            }}
          />
        )}
      </BottomSheetModal>
      <ModalToast
        isVisible={isShowToast}
        onCloseModal={() => setIsShowToast(false)}
        message={toastMessage}
        type={type}
      />
    </Layout>
  );
}

export default FriendsScreen;

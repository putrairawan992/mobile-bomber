/* eslint-disable react-native/no-inline-styles */
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {Setting2} from 'iconsax-react-native';
import * as React from 'react';
import {createRef, useEffect, useState} from 'react';
import {Pressable, View} from 'react-native';
import PagerView from 'react-native-pager-view';
import {Gap, Layout, Loading, Section, TextInput} from '../../components/atoms';

import {Header, TabMenu} from '../../components/molecules';
import {
  FriendInviteConfirmationSheet,
  FriendOptionSheet,
  ProfileSecuritySheet,
} from '../../components/organism';
import {FriendBottomSheet} from '../../components/organism/Friends/FriendBottomSheet';
import {FriendInvitePartySheet} from '../../components/organism/Friends/FriendInvitePartySheet';
import {PartyInterface} from '../../interfaces/BookingInterface';
import {FriendInterface, UserInterface} from '../../interfaces/UserInterface';
import {Colors} from '../../theme';
import useTheme from '../../theme/useTheme';
import {WIDTH} from '../../utils/config';
import {PARTY_DATA, USER_DATA} from '../../utils/data';
import styles from '../Styles';
import {ExploreTab} from './ExploreTab';
import {FriendsTab} from './FriendsTab';
import {FriendshipService} from '../../service/FriendshipService';

// type Props = NativeStackScreenProps<MainStackParams, 'Booked', 'MyStack'>;

function FriendsScreen() {
  const [menu] = useState<string[]>(['Friends', 'Explore', 'Request', 'Squad']);
  const [sheetAction, setSheetAction] = useState<string>('');
  const [initialPage, setInitialPage] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<UserInterface | null>(null);
  const [selectedParty, setSelectedParty] = useState<PartyInterface | null>(
    null,
  );
  const [friendshipData, setFriendshipData] = useState<FriendInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const ref = createRef<PagerView>();
  const theme = useTheme();

  const [sheetIndex, setSheetIndex] = React.useState<number>(-1);
  const friendSheetRef = React.useRef<BottomSheetModal>(null);
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
  const handleSheetChanges = React.useCallback((index: number) => {
    setSheetIndex(index);
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      await Promise.all([
        FriendshipService.getFriendship({
          userId: 'FQ5OvkolZtSBZEMlG1R3gtowbQv1',
        }),
      ])
        .then(response => {
          setFriendshipData(response[0].result);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    } catch (error: any) {}
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onOpenBottomSheet = (sheetType: string, data?: UserInterface) => {
    data && setSelectedUser(data);
    setSheetAction(sheetType);
    setTimeout(() => {
      friendSheetRef.current?.present();
    }, 100);
  };

  return (
    <Layout contentContainerStyle={styles.container}>
      <Header
        transparent
        title="Friends"
        rightCustomComponent={<Setting2 size={24} color={theme?.colors.ICON} />}
        onRightCustomComponentPress={() => onOpenBottomSheet('profileSecurity')}
      />
      {isLoading && <Loading />}
      <Section padding="22px 16px">
        <TextInput
          type="search"
          value={searchValue}
          onChangeText={(text: string) => setSearchValue(text)}
          placeholder="Search friend's name or email"
        />
      </Section>
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
              data={USER_DATA}
              searchValue={searchValue}
              onSelectUser={user => onOpenBottomSheet('userProfile', user)}
              onFriendOption={user => onOpenBottomSheet('friendOption', user)}
            />
          </View>
          <View key="2">
            <ExploreTab data={friendshipData} searchValue={searchValue} />
          </View>
          <View key="3" />
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
        handleIndicatorStyle={{backgroundColor: Colors['black-70']}}
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
            onInviteConfirmation={(party, user) => {
              setSelectedUser(user);
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
          />
        ) : (
          <FriendBottomSheet data={selectedUser} />
        )}
      </BottomSheetModal>
    </Layout>
  );
}

export default FriendsScreen;

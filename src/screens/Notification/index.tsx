/* eslint-disable react-native/no-inline-styles */
import BottomSheet from '@gorhom/bottom-sheet';
import * as React from 'react';
import {createRef, useState} from 'react';
import {Pressable, View} from 'react-native';
import PagerView from 'react-native-pager-view';
import {Gap, Layout, Loading, Section} from '../../components/atoms';
import {Header, ModalToast, TabMenu} from '../../components/molecules';
import {
  FriendInviteConfirmationSheet,
  NotificationPaymentSheet,
} from '../../components/organism';
import {
  BillNotificationInterface,
  InviteNotificationInterface,
  RequestFriendNotificationInterface,
} from '../../interfaces/NotificationInterface';
import {Colors} from '../../theme';
import useTheme from '../../theme/useTheme';
import {WIDTH} from '../../utils/config';
import {BILL_NOTIFICATION} from '../../utils/data';
import NotificationApps from './NotificationApps';
import NotificationBill from './NotificationBill';
import NotificationFriends from './NotificationFriends';
import NotificationInvitation from './NotificationInvitation';
import styles from './Styles';
import {useAppSelector} from '../../hooks/hooks';
import {NotificationService} from '../../service/NotificationService';
import {useDispatch} from 'react-redux';
import {ModalToastContext} from '../../context/AppModalToastContext';
import {FriendshipService} from '../../service/FriendshipService';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParams} from '../../navigation/MainScreenStack';

type Props = NativeStackScreenProps<MainStackParams, 'Notification', 'MyStack'>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function NotificationScreen({route}: Props) {
  const [menu] = useState<string[]>(['Apps', 'Invitation', 'Bill', 'Friends']);
  const {invitation, invitationCount, friendRequest, friendRequestCount} =
    useAppSelector(state => state.notification);
  const {user} = useAppSelector(state => state.user);
  const [initialPage, setInitialPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedInvitation, setSelectedInvitation] =
    useState<InviteNotificationInterface | null>(null);
  const [selectedBill, setSelectedBill] =
    useState<BillNotificationInterface | null>(null);
  const [sheetAction, setSheetAction] = useState<
    '' | 'bill' | 'approveInvitation'
  >('');
  const ref = createRef<PagerView>();
  const theme = useTheme();
  const dispatch = useDispatch();

  const {
    isShowToast,
    setIsShowToast,
    toastMessage,
    setToastMessage,
    type,
    setType,
  } = React.useContext(ModalToastContext);

  const openToast = (toastType: 'success' | 'error', message: string) => {
    setIsShowToast(true);
    setType(toastType);
    setToastMessage(message);
  };

  // React.useEffect(() => {
  //   if (route.params?.activeTab) {
  //     setTimeout(() => {
  //       setInitialPage(Number(route.params.activeTab));
  //     }, 500);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [route.params]);

  const onOpenInvitation = async (data: InviteNotificationInterface) => {
    try {
      setIsLoading(true);
      const readNotification = await NotificationService.putReadNotification({
        id: data.id,
        new_status: 1,
      });
      if (!readNotification.error) {
        setIsLoading(false);
        setSheetAction('approveInvitation');
        setSelectedInvitation(data ?? null);
        openBottomSheet();
      }
    } catch (error: any) {}
  };

  const [sheetIndex, setSheetIndex] = React.useState<number>(-1);
  const notificationSheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(
    () => (sheetAction === 'bill' ? ['65'] : ['80']),
    [sheetAction],
  );
  const handleSheetChanges = React.useCallback((index: number) => {
    setSheetIndex(index);
  }, []);

  const onSelectBill = (billId: string) => {
    setSelectedBill(BILL_NOTIFICATION.find(item => item.id === billId) ?? null);
    setSheetAction('bill');
    setTimeout(() => {
      openBottomSheet();
    }, 100);
  };

  const openBottomSheet = () => {
    setTimeout(() => {
      notificationSheetRef.current?.expand();
    }, 100);
  };

  const handleActionInvitation = async (action: string) => {
    try {
      setIsLoading(true);
      const response = await NotificationService.putActionInvitation(
        {
          id: selectedInvitation?.id as string,
          new_status: action,
        },
        dispatch,
      );
      setIsLoading(false);
      if (!response.error) {
        notificationSheetRef.current?.close();
        setTimeout(() => {
          openToast('success', `You ${action} this invitation`);
        }, 100);
      } else {
        notificationSheetRef.current?.close();
        setTimeout(() => {
          openToast('error', response.message);
        }, 100);
      }
    } catch (error: any) {
      setIsLoading(false);
      openToast('error', error.response.data.message);
    }
  };

  const fetchNotification = async () => {
    try {
      await NotificationService.getInvitationNotification(user.id, dispatch);
      await NotificationService.getRequestFriendNotification(user.id, dispatch);
    } catch (error: any) {}
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
        setIsLoading(false);
        openToast('success', 'You accepted the friend request');
      }
    } catch (error: any) {
      setIsLoading(false);
      openToast('error', error.response.data.message);
    }
  };

  return (
    <Layout contentContainerStyle={styles.container}>
      <Header transparent hasBackBtn title="Notification" />
      {isLoading && <Loading />}
      <Gap height={24} />
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
              // count={item === 'Invitation' ? invitation.length : 0}
              count={
                item === 'Invitation'
                  ? invitationCount
                  : item === 'Friends'
                  ? friendRequestCount
                  : 0
              }
            />
          );
        })}
      </Section>
      <Gap height={30} />
      <Section style={{flex: 1}}>
        <PagerView
          style={styles.container}
          initialPage={initialPage}
          ref={ref}
          onPageSelected={e => setInitialPage(e.nativeEvent.position)}>
          <View key="1">
            <NotificationApps />
          </View>
          <View key="2">
            <NotificationInvitation
              data={invitation}
              onOpenInvitation={onOpenInvitation}
            />
          </View>
          <View key="3">
            <NotificationBill
              data={BILL_NOTIFICATION}
              onSelect={onSelectBill}
            />
          </View>
          <View key="4">
            <NotificationFriends
              data={friendRequest}
              onApprove={handleApproveFriendRequest}
            />
          </View>
        </PagerView>
      </Section>

      <BottomSheet
        ref={notificationSheetRef}
        index={-1}
        enablePanDownToClose
        snapPoints={snapPoints}
        backdropComponent={({style}) =>
          sheetIndex >= 0 ? (
            <Pressable
              onPress={() => notificationSheetRef.current?.close()}
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
        {sheetAction === 'bill' && (
          <NotificationPaymentSheet data={selectedBill} />
        )}
        {sheetAction === 'approveInvitation' && (
          <FriendInviteConfirmationSheet
            data={selectedInvitation}
            user={user}
            type="approve"
            onConfirm={handleActionInvitation}
          />
        )}
      </BottomSheet>
      <ModalToast
        isVisible={isShowToast}
        onCloseModal={() => {
          setIsShowToast(false);
        }}
        message={toastMessage}
        type={type}
      />
    </Layout>
  );
}

export default NotificationScreen;

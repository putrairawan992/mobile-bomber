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

// type Props = NativeStackScreenProps<MainStackParams, 'Saved', 'MyStack'>;

function NotificationScreen() {
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
    () => (sheetAction === 'bill' ? ['50'] : ['80']),
    [sheetAction],
  );
  const handleSheetChanges = React.useCallback((index: number) => {
    setSheetIndex(index);
  }, []);

  const onSelectBill = (billId: string) => {
    setSelectedBill(BILL_NOTIFICATION.find(item => item.id === billId) ?? null);
    setSheetAction('bill');
    openBottomSheet();
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
              data={invitation.map(item => {
                return {
                  ...item,
                  message: `Hi ${user.username}, who meet you at the ${item.clubName}. Would you come to my table at ruff ? we will arrived around 11am ❤️'`,
                };
              })}
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
            <NotificationFriends data={friendRequest} />
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

/* eslint-disable react-native/no-inline-styles */
import {Platform, Pressable, ScrollView, UIManager} from 'react-native';
import {Header, ModalToast} from '../../../../components/molecules';
import {
  Gap,
  ItemShimmer,
  Layout,
  Loading,
  Section,
  Text,
} from '../../../../components/atoms';
import React, {useContext, useEffect, useState} from 'react';
import styles from '../../Styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParams} from '../../../../navigation/MainScreenStack';
import {CardTicket} from '../../../../components/molecules/Card/CardTicket';
import {
  CardPaymentInterface,
  TicketInterface,
} from '../../../../interfaces/BookingInterface';
import BottomSheet from '@gorhom/bottom-sheet';
import {TableOrderDetail} from '../../BookingTable/OrderDetail';
import {Colors} from '../../../../theme';
import {GroupOrderDetail} from '../GroupOrderDetail';
import {FriendInterface} from '../../../../interfaces/UserInterface';
import {NightlifeService} from '../../../../service/NightlifeService';
import {FriendshipService} from '../../../../service/FriendshipService';
import {InviteFriendsOnboardingSheet} from '../../../../components/organism';
import {useAppSelector} from '../../../../hooks/hooks';
import {dateFormatter} from '../../../../utils/dateFormatter';
import {ModalToastContext} from '../../../../context/AppModalToastContext';
import {ProfileService} from '../../../../service/ProfileService';
import ModalAddNewCard from '../../../../components/molecules/Modal/ModalAddNewCard';
import {CouponInterface} from '../../../../interfaces/PlaceInterface';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

type Props = NativeStackScreenProps<MainStackParams, 'WalkInTicket', 'MyStack'>;

export const WalkInTicketScreen = ({route, navigation}: Props) => {
  const [selectedTicket, setSelectedTicket] = useState<TicketInterface | null>(
    null,
  );
  const {user} = useAppSelector(state => state.user);
  const isGroupPackage = /Group/.test(selectedTicket?.title ?? '');
  const [sheetIndex, setSheetIndex] = React.useState<number>(-1);
  const bookingSheetRef = React.useRef<BottomSheet>(null);
  const [isFirstStep, setIsFirstStep] = useState<boolean>(true);
  const [isSecondStep, setIsSecondStep] = useState<boolean>(false);
  const [isGroupOrderDetail, setIsGroupOrderDetail] = useState<boolean>(false);
  const [isInviteFriends, setIsInviteFriends] = useState<boolean>(false);
  const [inviteFriendsStep, setInviteFriendsStep] = useState<number>(1);
  const [selectedInvitation, setSelectedInvitation] = useState<
    FriendInterface[]
  >([]);
  const [friendshipData, setFriendshipData] = useState<FriendInterface[]>([]);
  const [ticket, setTicket] = useState<TicketInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingPayment, setIsLoadingPayment] = useState<boolean>(false);
  const [paymentList, setPaymentList] = useState<CardPaymentInterface[]>([]);
  const [selectedPayment, setSelectedPayment] =
    useState<CardPaymentInterface | null>(null);
  const [isAddPayment, setIsAddPayment] = useState<boolean>(false);
  const [coupons, setCoupons] = useState<CouponInterface[]>([]);

  const {
    isShowToast,
    setIsShowToast,
    toastMessage,
    setToastMessage,
    type,
    setType,
  } = useContext(ModalToastContext);

  const onSelectTicket = (id: string) => {
    setSelectedTicket(ticket.find(item => item.walkInTicketId === id) ?? null);
    setInviteFriendsStep(1);
    setIsInviteFriends(false);
    setIsFirstStep(true);
    setIsSecondStep(false);
    setTimeout(() => {
      bookingSheetRef.current?.collapse();
    }, 100);
  };

  const fetchPaymentList = async () => {
    try {
      setIsLoading(true);
      const response = await ProfileService.getCustomerPaymentList({
        id: user?.id as string,
      });
      if (response?.data?.length) {
        setPaymentList(response?.data);
        setSelectedPayment(response?.data.find(item => item.isDefault === 1));
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      await Promise.all([
        NightlifeService.getWalkInTicket({
          club_id: route.params.placeData?.clubId as string,
          date: route.params.date,
        }),
        FriendshipService.getFriendship({
          userId: user.id,
        }),
      ])
        .then(response => {
          setTicket(response[0].data);
          setFriendshipData(response[1].data);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    } catch (error: any) {}
  };

  useEffect(() => {
    fetchData();
    fetchPaymentList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const snapPoints = React.useMemo(
    () =>
      isGroupPackage && isFirstStep
        ? ['62']
        : isGroupPackage && !isFirstStep && !isInviteFriends
        ? ['80']
        : isInviteFriends && inviteFriendsStep === 1
        ? ['37']
        : isInviteFriends && inviteFriendsStep === 2
        ? ['42']
        : isInviteFriends && inviteFriendsStep === 3
        ? ['35']
        : ['70', '90'],
    [inviteFriendsStep, isFirstStep, isGroupPackage, isInviteFriends],
  );
  const [isPayFull, setIsPayFull] = useState(false);
  const [isSplitBill, setIsSplitBill] = useState(false);
  const toggleSwitchPayFull = () =>
    setIsPayFull(previousState => !previousState);
  const toggleSwitchSplitBill = () =>
    setIsSplitBill(previousState => !previousState);
  const handleSheetChanges = React.useCallback((index: number) => {
    setSheetIndex(index);
  }, []);

  const handleInvite = (data: FriendInterface) => {
    let findItem: any = Boolean(
      selectedInvitation.find(
        (el: FriendInterface) => el.customerId === data.customerId,
      ),
    );
    if (!findItem) {
      setSelectedInvitation([...selectedInvitation, data]);
    } else {
      setSelectedInvitation(
        selectedInvitation.filter(
          (el: FriendInterface) => el.customerId !== data.customerId,
        ),
      );
    }
  };

  const handleOnOnboardingInviteFriends = () => {
    setIsFirstStep(false);
    setIsGroupOrderDetail(false);
    setInviteFriendsStep(1);
    setIsInviteFriends(true);
    setTimeout(() => {
      bookingSheetRef.current?.collapse();
    }, 100);
  };

  const openToast = (toastType: 'success' | 'error', message: string) => {
    setIsShowToast(true);
    setType(toastType);
    setToastMessage(message);
  };

  const handleOnPay = async () => {
    try {
      setIsLoadingPayment(true);
      const response = await NightlifeService.postWalkInBoking({
        payload: {
          customer_id: user.id,
          club_id: route.params.placeData?.clubId as string,
          visit_date: route.params.date,
          total_price:
            Number(selectedTicket?.price) +
            Number(selectedTicket?.price) * 0.05,
          disc: isPayFull ? Number(selectedTicket?.price) * 0.05 : 0,
          total_guest: isGroupPackage ? selectedInvitation.length : 1,
          payment_method: 'Credit Card',
          member_invited: selectedInvitation.map(item => item.customerId),
          bought_date: dateFormatter(new Date(), 'yyyy-MM-dd'),
          ticket_id: selectedTicket?.walkInTicketId as string,
          card_number: selectedPayment?.cardNumber,
          source: 'walkin booking apps',
        },
      });

      setIsLoadingPayment(false);
      setTimeout(() => {
        bookingSheetRef.current?.close();
        openToast('success', response.message);
        setTimeout(() => {
          navigation.navigate('Nightlife');
        }, 2000);
      }, 200);
    } catch (error: any) {
      setIsLoadingPayment(false);
      openToast('error', JSON.stringify(error.response.data.detail));
    }
  };

  return (
    <Layout contentContainerStyle={styles.container} isScrollable={true}>
      <Header transparent hasBackBtn title="Walk In" />
      {isLoadingPayment && <Loading />}
      <Section padding="0px 16px">
        <Gap height={24} />
        <Text variant="base" fontWeight="bold" label="Select Ticket" />
        <Gap height={24} />
        {isLoading ? (
          <ItemShimmer
            row={3}
            height={200}
            width="100%"
            style={{
              borderRadius: 8,
              marginBottom: 32,
            }}
          />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{marginBottom: 100}}>
            {Array.isArray(ticket) &&
              ticket.map((item, idx) => (
                <CardTicket
                  key={idx}
                  data={item}
                  index={idx}
                  onSelect={onSelectTicket}
                />
              ))}
          </ScrollView>
        )}
      </Section>
      <BottomSheet
        ref={bookingSheetRef}
        index={-1}
        enablePanDownToClose
        snapPoints={snapPoints}
        backdropComponent={({style}) =>
          sheetIndex >= 0 ? (
            <Pressable
              onPress={() => bookingSheetRef.current?.close()}
              style={[style, {backgroundColor: 'rgba(0, 0, 0, 0.60)'}]}
            />
          ) : (
            <></>
          )
        }
        handleStyle={styles.bottomSheetHandleStyle}
        handleIndicatorStyle={{backgroundColor: Colors['black-70'], width: 50}}
        onChange={handleSheetChanges}>
        {isGroupPackage && !isGroupOrderDetail && !isInviteFriends ? (
          <GroupOrderDetail
            selectedTicket={selectedTicket}
            isFirstStep={isFirstStep}
            isSecondStep={isSecondStep}
            onChangeStep={(step: number) => {
              if (step === 1) {
                setIsFirstStep(true);
                setIsSecondStep(false);
              } else if (step === 2) {
                setIsFirstStep(false);
                setIsSecondStep(true);
              }
            }}
            selectedInvitation={selectedInvitation}
            handleInvite={handleInvite}
            onOrderDetail={() => setIsGroupOrderDetail(true)}
            friendshipData={friendshipData}
            onOnboardingInviteFriends={handleOnOnboardingInviteFriends}
          />
        ) : isInviteFriends ? (
          <InviteFriendsOnboardingSheet
            hasBackNavigation
            onBackNavigation={() => {
              if (inviteFriendsStep === 1) {
                setIsInviteFriends(false);
                setIsFirstStep(true);
              } else if (inviteFriendsStep === 2) {
                setInviteFriendsStep(1);
              } else {
                setInviteFriendsStep(2);
              }
            }}
            step={inviteFriendsStep}
            onNextStep={step => setInviteFriendsStep(step)}
            onFinish={() => {
              setIsInviteFriends(false);
              setIsFirstStep(true);
            }}
          />
        ) : (
          <TableOrderDetail
            isWalkIn
            placeData={route.params.placeData}
            selectedTable={{
              tableId: selectedTicket?.walkInTicketId as string,
              price: Number(selectedTicket?.price),
              text: selectedTicket?.title ?? '',
              minOrder: Number(
                isGroupPackage
                  ? Number(selectedTicket?.price) * selectedInvitation.length
                  : selectedTicket?.price,
              ),
              table_status: '',
            }}
            isFullPayment={isPayFull}
            isSplitBill={isSplitBill}
            toggleSwitchPayFull={toggleSwitchPayFull}
            toggleSwitchSplitBill={toggleSwitchSplitBill}
            selectedDate={route.params.date}
            hasBackNavigation={isGroupPackage}
            onBackNavigation={() => {
              setIsFirstStep(false);
              setIsSecondStep(true);
              setIsGroupOrderDetail(false);
            }}
            isLoading={isLoadingPayment}
            onPay={handleOnPay}
            coupons={coupons}
            onCouponApplied={coupon => setCoupons([...coupons, ...[coupon]])}
            onRemoveCoupon={coupon => {
              setCoupons(coupons.filter(el => el.couponId !== coupon.couponId));
              openToast('success', 'Coupon has been removed');
            }}
            paymentList={paymentList}
            selectedPayment={selectedPayment}
            setSelectedPayment={value => setSelectedPayment(value)}
            onAddPayment={() => {
              bookingSheetRef.current?.close();
              setTimeout(() => {
                setIsAddPayment(true);
              }, 100);
            }}
          />
        )}
      </BottomSheet>
      <ModalAddNewCard
        show={isAddPayment}
        hide={() => {
          setIsAddPayment(false);
          bookingSheetRef.current?.collapse();
        }}
        onAddNew={async () => {
          setIsAddPayment(false);
          await fetchPaymentList();
          bookingSheetRef.current?.collapse();
        }}
        hasBackNavigation
      />
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
};

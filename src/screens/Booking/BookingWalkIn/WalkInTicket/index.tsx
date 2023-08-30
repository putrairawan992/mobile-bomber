/* eslint-disable react-native/no-inline-styles */
import {Platform, Pressable, ScrollView, UIManager} from 'react-native';
import {Header} from '../../../../components/molecules';
import {
  Gap,
  ItemShimmer,
  Layout,
  Section,
  Text,
} from '../../../../components/atoms';
import React, {useEffect, useState} from 'react';
import styles from '../../Styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParams} from '../../../../navigation/MainScreenStack';
import {CardTicket} from '../../../../components/molecules/Card/CardTicket';
import {TicketInterface} from '../../../../interfaces/BookingInterface';
import BottomSheet from '@gorhom/bottom-sheet';
import {TableOrderDetail} from '../../BookingTable/OrderDetail';
import {Colors} from '../../../../theme';
import {GroupOrderDetail} from '../GroupOrderDetail';
import {FriendInterface} from '../../../../interfaces/UserInterface';
import {NightlifeService} from '../../../../service/NightlifeService';
import {FriendshipService} from '../../../../service/FriendshipService';
import {InviteFriendsOnboardingSheet} from '../../../../components/organism';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

type Props = NativeStackScreenProps<MainStackParams, 'WalkInTicket', 'MyStack'>;

export const WalkInTicketScreen = ({route}: Props) => {
  const [selectedTicket, setSelectedTicket] = useState<TicketInterface | null>(
    null,
  );
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

  const fetchData = async () => {
    try {
      setIsLoading(true);
      await Promise.all([
        NightlifeService.getWalkInTicket({
          club_id: Number(route.params.placeData?.clubId),
          date: route.params.date,
        }),
        FriendshipService.getFriendship({
          userId: 'FQ5OvkolZtSBZEMlG1R3gtowbQv1',
        }),
      ])
        .then(response => {
          setTicket(response[0].data);
          setFriendshipData(response[1].result);
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

  return (
    <Layout contentContainerStyle={styles.container} isScrollable={true}>
      <Header transparent hasBackBtn title="Walk In" />
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
        handleIndicatorStyle={{backgroundColor: Colors['black-70']}}
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
          />
        )}
      </BottomSheet>
    </Layout>
  );
};

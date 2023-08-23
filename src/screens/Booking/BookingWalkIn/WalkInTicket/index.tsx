/* eslint-disable react-native/no-inline-styles */
import {Platform, Pressable, ScrollView, UIManager} from 'react-native';
import {Header} from '../../../../components/molecules';
import {Gap, Layout, Section, Text} from '../../../../components/atoms';
import React, {useState} from 'react';
import styles from '../../Styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParams} from '../../../../navigation/MainScreenStack';
import {PLACES_DATA, TICKETS_DATA} from '../../../../utils/data';
import {CardTicket} from '../../../../components/molecules/Card/CardTicket';
import {TicketInterface} from '../../../../interfaces/BookingInterface';
import BottomSheet from '@gorhom/bottom-sheet';
import {TableOrderDetail} from '../../BookingTable/OrderDetail';
import {Colors} from '../../../../theme';
import {GroupOrderDetail} from '../GroupOrderDetail';
import {UserInterface} from '../../../../interfaces/UserInterface';

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
  const onSelectTicket = (id: string) => {
    setSelectedTicket(TICKETS_DATA.find(item => item.id === id) ?? null);
    setTimeout(() => {
      bookingSheetRef.current?.collapse();
    }, 100);
  };
  const isGroupPackage = /Group/.test(selectedTicket?.title ?? '');
  const [sheetIndex, setSheetIndex] = React.useState<number>(-1);
  const bookingSheetRef = React.useRef<BottomSheet>(null);
  const [isFirstStep, setIsFirstStep] = useState<boolean>(true);
  const [isSecondStep, setIsSecondStep] = useState<boolean>(false);
  const [isGroupOrderDetail, setIsGroupOrderDetail] = useState<boolean>(false);
  const [selectedInvitation, setSelectedInvitation] = useState<UserInterface[]>(
    [],
  );
  const snapPoints = React.useMemo(
    () =>
      isGroupPackage && isFirstStep
        ? ['50']
        : isGroupPackage && !isFirstStep
        ? ['80']
        : ['70', '90'],
    [isFirstStep, isGroupPackage],
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

  const handleInvite = (data: UserInterface) => {
    let findItem: any = Boolean(
      selectedInvitation.find((el: UserInterface) => el.id === data.id),
    );
    if (!findItem) {
      setSelectedInvitation([...selectedInvitation, data]);
    } else {
      setSelectedInvitation(
        selectedInvitation.filter((el: UserInterface) => el.id !== data.id),
      );
    }
  };

  return (
    <Layout contentContainerStyle={styles.container} isScrollable={true}>
      <Header transparent hasBackBtn title="Walk In" />
      <Section padding="0px 16px">
        <Gap height={24} />
        <Text variant="base" fontWeight="bold" label="Select Ticket" />
        <Gap height={24} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginBottom: 100}}>
          {Array.isArray(TICKETS_DATA) &&
            TICKETS_DATA.map((item, idx) => (
              <CardTicket
                key={idx}
                data={item}
                index={idx}
                onSelect={onSelectTicket}
              />
            ))}
        </ScrollView>
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
        {isGroupPackage && !isGroupOrderDetail ? (
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
          />
        ) : (
          <TableOrderDetail
            isWalkIn
            placeData={
              PLACES_DATA.find(item => item.id === route.params.placeId) ?? null
            }
            selectedTable={{
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
              setIsSecondStep(true);
              setIsGroupOrderDetail(false);
            }}
          />
        )}
      </BottomSheet>
    </Layout>
  );
};

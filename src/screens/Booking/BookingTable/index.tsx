/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  Button,
  Gap,
  Layout,
  Loading,
  Section,
  Text,
  TouchableSection,
} from '../../../components/atoms';
import {CardTable, Header, ModalToast} from '../../../components/molecules';
import {
  CouponInterface,
  EventInterface,
  PlaceEventsInterface,
} from '../../../interfaces/PlaceInterface';
import {
  LayoutAnimation,
  Platform,
  ScrollView,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';

import {useCallback, useContext, useEffect, useState} from 'react';

import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {
  CardPaymentInterface,
  TableInterface,
} from '../../../interfaces/BookingInterface';
import {dateFormatter} from '../../../utils/dateFormatter';
import {
  generateCalendarEvents,
  generateCalendarOtherDay,
  getDaysInMonth,
} from '../../../utils/function';
import styles from '../../Styles';
import useTheme from '../../../theme/useTheme';
import {FriendInterface} from '../../../interfaces/UserInterface';
import {MainStackParams} from '../../../navigation/MainScreenStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BookingCalendar} from '../BookingCalendar';
import {TableOrderDetail} from './OrderDetail';
import {Colors} from '../../../theme';
import {
  FriendsInvitation,
  TableLayoutSheet,
  WaitingListSheet,
} from '../../../components/organism';
import {MonthYearInterface} from '../../../interfaces/Interface';
import {NightlifeService} from '../../../service/NightlifeService';
import {FriendshipService} from '../../../service/FriendshipService';
import {useAppSelector} from '../../../hooks/hooks';
import {ModalToastContext} from '../../../context/AppModalToastContext';
import {Map1} from 'iconsax-react-native';
import {ProfileService} from '../../../service/ProfileService';
import ModalAddNewCard from '../../../components/molecules/Modal/ModalAddNewCard';

type Props = NativeStackScreenProps<MainStackParams, 'BookingTable', 'MyStack'>;

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

function BookingTableScreen({route, navigation}: Props) {
  const {user} = useAppSelector(state => state.user);
  const placeData = route.params.placeData;
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [step, setStep] = useState<number>(0);
  const [selectedEvent, setSelectedEvent] = useState<EventInterface[]>([]);
  const [tableData, setTableData] = useState<TableInterface[]>([]);
  const [selectedTable, setSelectedTable] = useState<TableInterface | null>(
    null,
  );
  const [tableExpand, setTableExpand] = useState<TableInterface | null>(null);
  const [isShowCalendar, setIsShowCalendar] = useState<boolean>(false);
  const [isErrorCalendar, setIsErrorCalendar] = useState<boolean>(false);
  const [isShowEvents, setIsShowEvents] = useState<boolean>(false);
  const [isShowTable, setIsShowTable] = useState<boolean>(false);
  const [isShowInvitation, setIsShowInvitation] = useState<boolean>(false);
  const [isErrorTable, setIsErrorTable] = useState<boolean>(false);
  const [isWaitingList, setIsWaitingList] = useState<boolean>(false);
  const [isTableLayout, setIsTableLayout] = useState<boolean>(false);
  const [waitingListStep, setWaitingListStep] = useState<number>(1);
  const [selectedInvitation, setSelectedInvitation] = useState<
    FriendInterface[]
  >([]);
  const [clubEvent, setClubEvent] = useState<PlaceEventsInterface[]>([]);
  const [allDay, setAllDay] = useState<string[]>([]);
  const [monthYear, setMonthYear] = useState<MonthYearInterface>({
    month: Number(dateFormatter(new Date(), 'M')),
    year: Number(dateFormatter(new Date(), 'yyyy')),
  });
  const [coupons, setCoupons] = useState<CouponInterface[]>([]);
  const [paymentList, setPaymentList] = useState<CardPaymentInterface[]>([]);
  const [selectedPayment, setSelectedPayment] =
    useState<CardPaymentInterface | null>(null);
  const [isAddPayment, setIsAddPayment] = useState<boolean>(false);
  const [sheetIndex, setSheetIndex] = React.useState<number>(-1);
  const bookingSheetRef = React.useRef<BottomSheetModal>(null);
  const snapPoints = React.useMemo(
    () =>
      isAddPayment
        ? ['50']
        : isWaitingList && waitingListStep === 1
        ? ['75']
        : isWaitingList && waitingListStep === 2
        ? ['30']
        : !isWaitingList && !isTableLayout
        ? ['70', '90']
        : isTableLayout
        ? ['60']
        : ['70'],
    [isWaitingList, waitingListStep, isTableLayout, isAddPayment],
  );

  const [isPayFull, setIsPayFull] = useState(false);
  const [isSplitBill, setIsSplitBill] = useState(false);
  const [friendshipData, setFriendshipData] = useState<FriendInterface[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const {
    isShowToast,
    setIsShowToast,
    toastMessage,
    setToastMessage,
    type,
    setType,
  } = useContext(ModalToastContext);

  const toggleSwitchPayFull = () =>
    setIsPayFull(previousState => !previousState);
  const toggleSwitchSplitBill = () =>
    setIsSplitBill(previousState => !previousState);
  const handleSheetChanges = React.useCallback((index: number) => {
    setSheetIndex(index);
  }, []);

  const today = dateFormatter(new Date(), 'yyyy-MM-dd');

  const MarkedDate = {
    [selectedDate]: {
      selected: true,
      disableTouchEvent: true,
      selectedColor: '#1F5EFF',
      selectedTextColor: 'white',
      customStyles: {
        container: {
          borderRadius: 8,
        },
        text: {
          color: 'white',
          fontWeight: '400',
        },
      },
    },
    [today]: {
      selected: true,
      disableTouchEvent: false,
      customStyles: {
        container: {
          borderWidth: 2,
          borderRadius: 8,
          backgroundColor: '#2C437B',
          borderColor: '#1F5EFF',
        },
        text: {
          color: 'white',
          fontWeight: '400',
          bottom: 2,
        },
      },
    },
  };

  const fetchTableList = async () => {
    try {
      setIsLoading(true);
      const response = await NightlifeService.getTableList({
        club_id: placeData?.clubId as string,
        date: selectedDate,
      });
      if (response.data.table_list.length) {
        setTableData(response.data.table_list);
      }
      setIsLoading(false);
    } catch (error: any) {}
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      await Promise.all([
        FriendshipService.getFriendship({
          userId: user.id,
        }),
        NightlifeService.getClubEventSchedule({
          params: {
            club_id: placeData?.clubId as string,
            year_month: `${monthYear.year}-${monthYear.month}`,
          },
        }),
      ])
        .then(response => {
          setFriendshipData(response[0].data);
          setClubEvent(response[1].data);
          updateAllDayState(response[1].data);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    } catch (error: any) {}
  };

  const updateAllDayState = (eventList: PlaceEventsInterface[]) => {
    setAllDay(
      getDaysInMonth(monthYear.month, monthYear.year).filter(
        i =>
          ![
            ...eventList.filter(el => el.events.length).map(item => item.date),
            ...[selectedDate],
            ...[today],
          ].includes(i),
      ),
    );
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

  useEffect(() => {
    fetchPaymentList();
    setTimeout(() => {
      step === 0 && onShowCalendar(true);
    }, 200);
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetchTableList();
      updateAllDayState(clubEvent);
    }
  }, [selectedDate]);

  useEffect(() => {
    fetchData();
  }, [monthYear]);

  const onShowCalendar = useCallback((isShow: boolean) => {
    LayoutAnimation.configureNext({
      duration: 500,
      update: {
        type: 'easeInEaseOut',
      },
    });
    setIsShowCalendar(isShow);
  }, []);

  const onShowEvents = useCallback((isShow: boolean) => {
    LayoutAnimation.configureNext({
      duration: 300,
      update: {
        type: 'easeInEaseOut',
      },
    });
    setIsShowEvents(isShow);
  }, []);

  const onShowTable = useCallback((isShow: boolean) => {
    LayoutAnimation.configureNext({
      duration: 500,
      update: {
        type: 'easeInEaseOut',
      },
    });
    setIsShowTable(isShow);
  }, []);

  const onShowInvitation = useCallback((isShow: boolean) => {
    LayoutAnimation.configureNext({
      duration: 500,
      update: {
        type: 'easeInEaseOut',
      },
    });
    setIsShowInvitation(isShow);
  }, []);

  const onSelectDate = (day: string) => {
    setIsErrorCalendar(false);
    setSelectedDate(day);
    const events =
      clubEvent.find((item: PlaceEventsInterface) => item.date === day)
        ?.events ?? [];
    setSelectedEvent(events);
    if (events.length) {
      onShowEvents(false);
      setTimeout(() => {
        onShowEvents(true);
      }, 200);
    } else {
      onShowEvents(false);
    }
    onConfirmDate();
  };

  const onConfirmDate = () => {
    setStep(1);
  };

  const onTableSelect = () => {
    if (!tableExpand?.table_status) {
      setIsWaitingList(false);
      setIsTableLayout(false);
      setSelectedTable(tableExpand);
      onConfirmTable();
    } else {
      setSelectedTable(tableExpand);
      setIsWaitingList(true);
      setIsTableLayout(false);
      setTimeout(() => {
        bookingSheetRef.current?.present();
      }, 100);
    }
  };

  const onConfirmTable = () => {
    setStep(2);
    onShowTable(false);
    setTimeout(() => {
      onShowInvitation(true);
    }, 500);
  };

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

  const handleOnPay = async () => {
    try {
      setIsLoading(true);
      const response = await NightlifeService.postTableBoking({
        payload: {
          customer_id: user.id,
          club_id: placeData?.clubId as string,
          booking_date: selectedDate,
          total_price:
            Number(selectedTable?.minOrder) +
            Number(selectedTable?.minOrder) * 0.05 -
            (isPayFull ? Number(selectedTable?.minOrder) * 0.05 : 0) -
            (coupons?.length ? coupons[0].disc : 0),
          disc:
            (isPayFull ? Number(selectedTable?.minOrder) * 0.05 : 0) +
            (coupons?.length ? coupons[0].disc : 0),
          total_guest: selectedInvitation.length,
          table_id: selectedTable?.tableId as string,
          min_order: Number(selectedTable?.minOrder),
          payment_method: 'Credit Card',
          member_invited: selectedInvitation.map(item => item.customerId),
          is_full_payment: isPayFull ? 1 : 0,
          coupon_used: coupons?.length,
          source: 'table booking apps',
        },
      });
      if (coupons?.length) {
        await NightlifeService.putConfirmUseCoupon({id: coupons[0].id});
      }
      setIsLoading(false);
      setTimeout(() => {
        bookingSheetRef.current?.close();
        openToast('success', response.message);
        setTimeout(() => {
          navigation.navigate('Nightlife');
        }, 2000);
      }, 200);
    } catch (error: any) {
      setIsLoading(false);
      openToast('error', error.response.data.message);
    }
  };

  const openToast = (toastType: 'success' | 'error', message: string) => {
    setIsShowToast(true);
    setType(toastType);
    setToastMessage(message);
  };

  return (
    // <SafeAreaView style={{flex: 1}}>
    <Layout contentContainerStyle={styles.container} isScrollable={false}>
      <Header transparent hasBackBtn title="Booking Table" />
      {isLoading && <Loading />}
      <Section padding="0px 16px" style={{flex: 1}}>
        <Gap height={12} />
        <TouchableSection
          onPress={() => {
            onShowCalendar(!isShowCalendar);
            onShowTable(false);
            onShowInvitation(false);
          }}
          padding="12px 16px"
          rounded={4}
          backgroundColor={theme?.colors.SECTION}
          style={{
            ...(isErrorCalendar && {
              borderWidth: 1,
              borderColor: Colors['danger-400'],
            }),
          }}>
          <Text
            fontWeight="semi-bold"
            label={
              selectedDate && step > 0 && !isShowCalendar
                ? dateFormatter(new Date(selectedDate), 'EEEE, dd MMMM yyy')
                : 'Select Date'
            }
          />
        </TouchableSection>
        {isShowCalendar && (
          <BookingCalendar
            onSelectDate={onSelectDate}
            data={Object.assign(
              MarkedDate,
              generateCalendarEvents(clubEvent, selectedDate, today),
              generateCalendarOtherDay(
                allDay.map(item => {
                  const isFullyBooked = Boolean(
                    clubEvent.find(el => el.date === item)
                      ?.club_table_full_book,
                  );
                  const isOpen = Boolean(
                    clubEvent.find(el => el.date === item)
                      ?.club_operational_day,
                  );
                  return {
                    date: item,
                    isFullyBooked: isFullyBooked,
                    isOpen: isOpen,
                  };
                }),
              ),
            )}
            isShowEvents={isShowEvents}
            selectedEvent={selectedEvent}
            selectedDate={selectedDate}
            onConfirmDate={onConfirmDate}
            onMonthChange={date =>
              setMonthYear({
                month: date.month,
                year: date.year,
              })
            }
          />
        )}
        <Gap height={12} />
        <TouchableSection
          padding="12px 16px"
          rounded={4}
          backgroundColor={theme?.colors.SECTION}
          onPress={() => {
            if (!selectedDate) {
              setIsErrorCalendar(true);
              openToast('error', 'Please select date first');
            } else {
              setIsErrorTable(false);
              onShowTable(!isShowTable);
              onShowCalendar(false);
              onShowInvitation(false);
            }
          }}
          style={{
            ...(isErrorTable && {
              borderWidth: 1,
              borderColor: Colors['danger-400'],
            }),
          }}>
          <Section isRow isBetween>
            <Text
              fontWeight="regular"
              variant="base"
              label={
                step > 1 && !!selectedTable && !isShowTable
                  ? selectedTable.text
                  : 'Table'
              }
            />
            <Text variant="small" label="choose your table" color="#9F9E9F" />
          </Section>
        </TouchableSection>
        {isShowTable && (
          <Section padding="20px 8px">
            <TouchableSection
              isRow
              onPress={() => {
                setIsTableLayout(true);
                setTimeout(() => {
                  bookingSheetRef.current?.present();
                }, 500);
              }}>
              <>
                <Map1 size={16} color={Colors['white-100']} />
                <Gap width={8} />
                <Text fontWeight="semi-bold" label="Check Layout" />
              </>
            </TouchableSection>
            <Gap height={8} />
            <ScrollView showsVerticalScrollIndicator={false}>
              {tableData.length &&
                tableData.map((item, index) => (
                  <CardTable
                    key={`table_${index}`}
                    data={item}
                    index={index}
                    handleExpand={data => {
                      setIsErrorTable(false);
                      if (tableExpand?.tableId === data.tableId) {
                        setTableExpand(null);
                      } else {
                        setTableExpand(data);
                      }
                    }}
                    isExpand={tableExpand?.tableId === item.tableId}
                    onSelect={onTableSelect}
                  />
                ))}
              {tableExpand && <Gap height={100} />}
            </ScrollView>
          </Section>
        )}
        <Gap height={12} />
        <TouchableSection
          padding="12px 16px"
          rounded={4}
          backgroundColor={theme?.colors.SECTION}
          onPress={() => {
            if (!selectedDate) {
              setIsErrorCalendar(true);
              openToast('error', 'Please select date');
            } else if (!selectedTable) {
              setIsErrorTable(true);
              openToast('error', 'Please select table');
            } else {
              onShowInvitation(!isShowInvitation);
              onShowCalendar(false);
              onShowTable(false);
            }
          }}>
          <Section isRow isBetween>
            <Text fontWeight="regular" variant="base" label="Friends" />
            <Text
              variant="small"
              label="Invite and party together"
              color="#9F9E9F"
            />
          </Section>
        </TouchableSection>
        {isShowInvitation && (
          <Section style={{flex: 1}}>
            <FriendsInvitation
              data={friendshipData}
              onInvite={handleInvite}
              selectedInvitation={selectedInvitation}
            />
            <Gap height={12} />
          </Section>
        )}
      </Section>
      <Gap height={60} />
      {step === 2 &&
      !!selectedDate &&
      !!selectedTable &&
      tableExpand?.isAvailable ? (
        <Button
          type="primary"
          onPress={() => bookingSheetRef.current?.present()}
          title="Book Now"
          noRound
          style={{
            paddingVertical: 16,
          }}
        />
      ) : (
        <TouchableOpacity style={styles.bookingButton}>
          <Text fontWeight="bold" label="Book Now" />
        </TouchableOpacity>
      )}

      <BottomSheetModal
        ref={bookingSheetRef}
        index={0}
        enablePanDownToClose={isWaitingList ? false : true}
        snapPoints={snapPoints}
        backdropComponent={({style}) =>
          sheetIndex >= 0 ? (
            <View style={[style, {backgroundColor: 'rgba(0, 0, 0, 0.60)'}]} />
          ) : (
            <></>
          )
        }
        handleStyle={{
          backgroundColor: theme?.colors.SECTION,
          borderTopRightRadius: 14,
          borderTopLeftRadius: 14,
        }}
        handleIndicatorStyle={{
          backgroundColor: Colors['black-70'],
          width: 50,
        }}
        onChange={handleSheetChanges}>
        {isWaitingList ? (
          <WaitingListSheet
            hasBackNavigation
            onBackNavigation={() => {
              setSelectedTable(null);
              setIsWaitingList(false);
              bookingSheetRef.current?.close();
            }}
            step={waitingListStep}
            onChangeStep={value => setWaitingListStep(value)}
            onFinish={() => {
              setSelectedTable(null);
              setIsWaitingList(false);
              setWaitingListStep(1);
              bookingSheetRef.current?.close();
              setTimeout(() => {
                navigation.navigate('Nightlife');
              }, 200);
            }}
            data={{
              customer_id: user.id,
              club_id: placeData?.clubId as string,
              table_id: selectedTable?.tableId as string,
              booking_date: selectedDate,
              email_address: '',
              status: '',
            }}
          />
        ) : isTableLayout ? (
          <TableLayoutSheet
            hasBackNavigation
            onBackNavigation={() => {
              setIsTableLayout(false);
              bookingSheetRef.current?.close();
            }}
            title={`${placeData?.name} Table Layout`}
          />
        ) : (
          <TableOrderDetail
            placeData={placeData}
            selectedTable={selectedTable}
            isFullPayment={isPayFull}
            isSplitBill={isSplitBill}
            toggleSwitchPayFull={toggleSwitchPayFull}
            toggleSwitchSplitBill={toggleSwitchSplitBill}
            selectedDate={selectedDate}
            onPay={handleOnPay}
            isLoading={isLoading}
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
      </BottomSheetModal>
      <ModalAddNewCard
        show={isAddPayment}
        hide={() => {
          setIsAddPayment(false);
          bookingSheetRef.current?.present();
        }}
        onAddNew={async () => {
          setIsAddPayment(false);
          await fetchPaymentList();
          bookingSheetRef.current?.present();
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
}

export default BookingTableScreen;

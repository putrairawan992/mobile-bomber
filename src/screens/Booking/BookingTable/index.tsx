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
import {Header} from '../../../components/molecules';
import {
  EventInterface,
  PlaceEventsInterface,
} from '../../../interfaces/PlaceInterface';
import {
  LayoutAnimation,
  Platform,
  Pressable,
  TouchableOpacity,
  UIManager,
} from 'react-native';
import {PLACE_EVENTS} from '../../../utils/data';
import {useCallback, useEffect, useState} from 'react';

import BottomSheet from '@gorhom/bottom-sheet';
import {TableInterface} from '../../../interfaces/BookingInterface';
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
import TableListContainer from './TableList/TableListContainer';
import {BookingCalendar} from '../BookingCalendar';
import {TableOrderDetail} from './OrderDetail';
import {TablePriviliege} from './TableList/TablePriviliege';
import {Colors} from '../../../theme';
import {FriendsInvitation} from '../../../components/organism';
import {MonthYearInterface} from '../../../interfaces/Interface';
import {NightlifeService} from '../../../service/NightlifeService';
import {FriendshipService} from '../../../service/FriendshipService';

type Props = NativeStackScreenProps<MainStackParams, 'BookingTable', 'MyStack'>;

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

function BookingTableScreen({route}: Props) {
  const placeData = route.params.placeData;
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [step, setStep] = useState<number>(0);
  const [selectedEvent, setSelectedEvent] = useState<EventInterface[]>([]);
  const [tableData, setTableData] = useState<TableInterface[]>([]);
  const [selectedTable, setSelectedTable] = useState<TableInterface | null>(
    null,
  );
  const [isShowCalendar, setIsShowCalendar] = useState<boolean>(false);
  const [isShowEvents, setIsShowEvents] = useState<boolean>(false);
  const [isShowTable, setIsShowTable] = useState<boolean>(false);
  const [isShowInvitation, setIsShowInvitation] = useState<boolean>(false);
  const [selectedInvitation, setSelectedInvitation] = useState<
    FriendInterface[]
  >([]);
  const [monthYear, setMonthYear] = useState<MonthYearInterface>({
    month: Number(dateFormatter(new Date(), 'M')),
    year: Number(dateFormatter(new Date(), 'yyyy')),
  });
  const [sheetIndex, setSheetIndex] = React.useState<number>(-1);
  const bookingSheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(() => ['70', '90'], []);
  const [isPayFull, setIsPayFull] = useState(false);
  const [isSplitBill, setIsSplitBill] = useState(false);
  const [friendshipData, setFriendshipData] = useState<FriendInterface[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const toggleSwitchPayFull = () =>
    setIsPayFull(previousState => !previousState);
  const toggleSwitchSplitBill = () =>
    setIsSplitBill(previousState => !previousState);
  const handleSheetChanges = React.useCallback((index: number) => {
    setSheetIndex(index);
  }, []);

  const today = dateFormatter(new Date(), 'yyyy-MM-dd');

  const allDay = getDaysInMonth(monthYear.month, monthYear.year).filter(
    i =>
      ![
        ...PLACE_EVENTS.map(item => item.date),
        ...[selectedDate],
        ...[today],
      ].includes(i),
  );

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
      const response = await NightlifeService.getTableList({
        club_id: placeData?.clubId as string,
        date: selectedDate,
      });
      if (response.table_list.length) {
        setTableData(response.table_list);
      }
    } catch (error: any) {}
  };

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
    setTimeout(() => {
      step === 0 && onShowCalendar(true);
    }, 200);
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetchTableList();
    }
  }, [selectedDate]);

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
    setSelectedDate(day);
    const events =
      PLACE_EVENTS.find((item: PlaceEventsInterface) => item.date === day)
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

  const onTableSelect = (data: TableInterface) => setSelectedTable(data);

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

  return (
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
          backgroundColor={theme?.colors.SECTION}>
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
              generateCalendarEvents(PLACE_EVENTS, selectedDate),
              generateCalendarOtherDay(allDay),
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
            onShowTable(!isShowTable);
            onShowCalendar(false);
            onShowInvitation(false);
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
          <Section padding="0px 12px" backgroundColor="#171717">
            <TableListContainer
              values={tableData}
              onPress={onTableSelect}
              selected={selectedTable}
            />
            {!!selectedTable && (
              <>
                <Gap height={12} />
                <TablePriviliege tableData={selectedTable} />
              </>
            )}
            <Button type="primary" title="Select" onPress={onConfirmTable} />
            <Gap height={12} />
          </Section>
        )}
        <Gap height={12} />
        <TouchableSection
          padding="12px 16px"
          rounded={4}
          backgroundColor={theme?.colors.SECTION}
          onPress={() => {
            onShowInvitation(!isShowInvitation);
            onShowCalendar(false);
            onShowTable(false);
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
      selectedInvitation.length ? (
        <Button
          type="primary"
          onPress={() => bookingSheetRef.current?.collapse()}
          title="Book Now"
          noRound
          style={{
            paddingVertical: 16,
          }}
        />
      ) : (
        <TouchableOpacity style={styles.bookingButton}>
          <Text variant="base" fontWeight="bold" label="Book Now" />
        </TouchableOpacity>
      )}

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
        handleStyle={{
          backgroundColor: theme?.colors.BACKGROUND1,
          borderTopRightRadius: 14,
          borderTopLeftRadius: 14,
        }}
        handleIndicatorStyle={{backgroundColor: Colors['black-70']}}
        onChange={handleSheetChanges}>
        <TableOrderDetail
          placeData={placeData}
          selectedTable={selectedTable}
          isFullPayment={isPayFull}
          isSplitBill={isSplitBill}
          toggleSwitchPayFull={toggleSwitchPayFull}
          toggleSwitchSplitBill={toggleSwitchSplitBill}
          selectedDate={selectedDate}
        />
      </BottomSheet>
    </Layout>
  );
}

export default BookingTableScreen;

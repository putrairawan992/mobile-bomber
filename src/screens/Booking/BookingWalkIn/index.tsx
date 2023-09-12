/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  LayoutAnimation,
  Platform,
  TouchableOpacity,
  UIManager,
} from 'react-native';
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
import useTheme from '../../../theme/useTheme';
import {dateFormatter} from '../../../utils/dateFormatter';
import {
  generateCalendarEvents,
  generateCalendarOtherDay,
  getDaysInMonth,
} from '../../../utils/function';
import {BookingCalendar} from '../BookingCalendar';
import styles from '../../Styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParams} from '../../../navigation/MainScreenStack';
import {MonthYearInterface} from '../../../interfaces/Interface';
import {NightlifeService} from '../../../service/NightlifeService';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

type Props = NativeStackScreenProps<
  MainStackParams,
  'BookingWalkIn',
  'MyStack'
>;

export const BookingWalkInScreen = ({route, navigation}: Props) => {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedEvent, setSelectedEvent] = useState<EventInterface[]>([]);
  const [isShowCalendar, setIsShowCalendar] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [isShowEvents, setIsShowEvents] = useState<boolean>(false);
  const [monthYear, setMonthYear] = useState<MonthYearInterface>({
    month: Number(dateFormatter(new Date(), 'M')),
    year: Number(dateFormatter(new Date(), 'yyyy')),
  });
  const [clubEvent, setClubEvent] = useState<PlaceEventsInterface[]>([]);
  const [allDay, setAllDay] = useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      await Promise.all([
        NightlifeService.getClubEventSchedule({
          params: {
            club_id: route.params.placeData?.clubId as string,
            year_month: `${monthYear.year}-${monthYear.month}`,
          },
        }),
      ])
        .then(response => {
          setClubEvent(response[0].data);
          setAllDay(
            getDaysInMonth(monthYear.month, monthYear.year).filter(
              i =>
                ![
                  ...response[0].data.map(item => item.date),
                  ...[selectedDate],
                  ...[today],
                ].includes(i),
            ),
          );
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthYear]);

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

  const onSelectDate = (day: string) => {
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
    // onShowCalendar(false);
    // setTimeout(() => {
    //   onShowTable(true);
    // }, 500);
  };

  return (
    <Layout contentContainerStyle={styles.container} isScrollable={false}>
      <Header transparent hasBackBtn title="Walk In" />
      {isLoading && <Loading />}
      <Section padding="0px 16px" style={{flex: 1}}>
        <Gap height={12} />
        <TouchableSection
          onPress={() => {
            onShowCalendar(!isShowCalendar);
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
              generateCalendarEvents(clubEvent, selectedDate),
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
      </Section>
      {step === 1 && !!selectedDate ? (
        <Button
          type="primary"
          onPress={() =>
            navigation.navigate('WalkInTicket', {
              placeData: route.params.placeData,
              date: selectedDate,
            })
          }
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
    </Layout>
  );
};

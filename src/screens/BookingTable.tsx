/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  Gap,
  Layout,
  Section,
  Text,
  TouchableSection,
} from '../components/atoms';
import styles from './Styles';
import {CalendarEventCard, Header} from '../components/molecules';
import useTheme from '../theme/useTheme';
import {Calendar} from 'react-native-calendars';
import {useCallback, useState} from 'react';
import {Direction} from 'react-native-calendars/src/types';
import {ArrowLeft2, ArrowRight2} from 'iconsax-react-native';
import {dateFormatter} from '../utils/dateFormatter';
import {PLACE_EVENTS} from '../utils/data';
import {generateCalendarEvents} from '../utils/function';
import {
  EventInterface,
  PlaceEventsInterface,
} from '../interfaces/PlaceInterface';
import {
  LayoutAnimation,
  Platform,
  TouchableOpacity,
  UIManager,
} from 'react-native';

// type Props = NativeStackScreenProps<MainStackParams, 'Profile', 'MyStack'>;

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

function BookingTableScreen() {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedEvent, setSelectedEvent] = useState<EventInterface[]>([]);
  const [isShowEvents, setIsShowEvents] = useState<boolean>(false);

  const onShowEvents = useCallback((isShow: boolean) => {
    LayoutAnimation.configureNext({
      duration: 300,
      update: {
        type: 'easeInEaseOut',
      },
    });
    setIsShowEvents(isShow);
  }, []);

  const MarkedDate = {
    [selectedDate]: {
      selected: true,
      disableTouchEvent: true,
      selectedColor: '#2C437B',
      selectedTextColor: 'white',
      customStyles: {
        container: {
          borderWidth: 1,
          borderColor: 'red',
        },
      },
    },
  };

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
  };

  return (
    <Layout contentContainerStyle={styles.container} isScrollable>
      <Header transparent hasBackBtn title="Booking Table" />
      <Section padding="0px 16px">
        <Gap height={12} />
        <Section
          padding="12px 16px"
          rounded={4}
          backgroundColor={theme?.colors.SECTION}>
          <Text fontWeight="semi-bold" label="Select Date" />
        </Section>
        <Section
          key={'dark'}
          backgroundColor="#171717"
          padding="0px 12px"
          style={{
            borderBottomEndRadius: 4,
            borderBottomStartRadius: 4,
          }}>
          <Calendar
            onDayPress={day => onSelectDate(day.dateString)}
            headerStyle={{
              backgroundColor: '#171717',
            }}
            renderHeader={(date: Date) => {
              return (
                <Text
                  fontWeight="regular"
                  label={dateFormatter(date, 'MMMM yyy')}
                />
              );
            }}
            renderArrow={(direction: Direction) => {
              if (direction === 'left') {
                return <ArrowLeft2 color={theme?.colors.ICON} size={16} />;
              } else {
                return <ArrowRight2 color={theme?.colors.ICON} size={16} />;
              }
            }}
            markedDates={Object.assign(
              MarkedDate,
              generateCalendarEvents(PLACE_EVENTS, selectedDate),
            )}
            style={{backgroundColor: '#171717'}}
            theme={{
              backgroundColor: '#171717',
              calendarBackground: '#171717',
              textSectionTitleColor: 'white',
              textSectionTitleDisabledColor: 'gray',
              dayTextColor: theme?.colors.TEXT_PRIMARY,
              todayTextColor: 'white',
              selectedDayTextColor: 'white',
              monthTextColor: 'white',
              indicatorColor: 'white',
              selectedDayBackgroundColor: '#333248',
              arrowColor: 'white',
            }}
          />
          <Gap height={12} />
          {isShowEvents &&
            selectedEvent.map((item: EventInterface, idx: number) => (
              <CalendarEventCard
                data={item}
                key={`event_${idx}`}
                isShowBorder={selectedEvent.length === idx + 1 ? false : true}
                index={idx}
              />
            ))}
        </Section>
        <Gap height={12} />
        <TouchableSection
          padding="12px 16px"
          rounded={4}
          backgroundColor={theme?.colors.SECTION}
          onPress={() => undefined}>
          <Section isRow isBetween>
            <Text fontWeight="regular" variant="base" label="Table" />
            <Text variant="small" label="choose your table" color="#9F9E9F" />
          </Section>
        </TouchableSection>
        <Gap height={12} />
        <TouchableSection
          padding="12px 16px"
          rounded={4}
          backgroundColor={theme?.colors.SECTION}
          onPress={() => undefined}>
          <Section isRow isBetween>
            <Text fontWeight="regular" variant="base" label="Friends" />
            <Text
              variant="small"
              label="Invite and party together"
              color="#9F9E9F"
            />
          </Section>
        </TouchableSection>
      </Section>
      <Gap height={60} />
      <TouchableOpacity style={styles.bookingButton}>
        <Text variant="base" fontWeight="bold" label="Book Now" />
      </TouchableOpacity>
    </Layout>
  );
}

export default BookingTableScreen;

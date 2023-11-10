/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {ArrowLeft2, ArrowRight2} from 'iconsax-react-native';
import React from 'react';
import {Calendar} from 'react-native-calendars';
import {DateData, Direction} from 'react-native-calendars/src/types';
import {Button, Gap, Section, Text} from '../../../components/atoms';
import {CalendarEventCard} from '../../../components/molecules';
import {EventInterface} from '../../../interfaces/PlaceInterface';
import useTheme from '../../../theme/useTheme';
import {dateFormatter} from '../../../utils/dateFormatter';
import {View} from 'react-native';

interface BookingCalendarProps {
  onSelectDate: (date: string) => void;
  data: any;
  isShowEvents: boolean;
  selectedEvent: EventInterface[];
  selectedDate: string;
  onConfirmDate: () => void;
  onMonthChange: (date: DateData) => void;
}

export const BookingCalendar = ({
  onSelectDate,
  data,
  isShowEvents,
  selectedEvent,
  selectedDate,
  onConfirmDate,
  onMonthChange,
}: BookingCalendarProps) => {
  const theme = useTheme();
  const today = dateFormatter(new Date(), 'yyyy-MM-dd');
  return (
    <Section
      key={'dark'}
      backgroundColor="#171717"
      padding="0px 12px"
      style={{
        borderBottomEndRadius: 4,
        borderBottomStartRadius: 4,
      }}>
      <Calendar
        markingType={'custom'}
        onDayPress={day => onSelectDate(day.dateString)}
        onMonthChange={onMonthChange}
        minDate={today}
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
        markedDates={data}
        style={{backgroundColor: '#171717'}}
        theme={{
          backgroundColor: '#171717',
          calendarBackground: '#171717',
          dayTextColor: theme?.colors.TEXT_PRIMARY,
          dotStyle: {
            position: 'absolute',
            top: -4,
          },
        }}
      />
      <Gap height={8} />
      <Section isRow padding="0px 16px">
        <View
          style={{
            height: 12,
            width: 12,
            borderRadius: 2,
            backgroundColor: '#2C437B',
            borderWidth: 1,
            borderColor: '#1F5EFF',
          }}
        />
        <Gap width={8} />
        <Text fontWeight="regular" label="Today" />
        <Gap width={8} />
        <View
          style={{
            height: 12,
            width: 12,
            borderRadius: 2,
            backgroundColor: '#F04835',
          }}
        />
        <Gap width={8} />
        <Text fontWeight="regular" label="Fully booked" />
      </Section>
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
  );
};

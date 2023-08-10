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
      {!!selectedDate && (
        <>
          <Button type="primary" title="Select" onPress={onConfirmDate} />
          <Gap height={12} />
        </>
      )}
    </Section>
  );
};

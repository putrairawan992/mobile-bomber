import React from 'react';
import {EventInterface} from '../../../interfaces/PlaceInterface';
import {Avatar, EntryAnimation, Gap, Section, Text} from '../../atoms';

interface CalendarEventCard {
  data: EventInterface;
  isShowBorder: boolean;
  index: number;
}

const CalendarEventCard = ({data, isShowBorder, index}: CalendarEventCard) => {
  return (
    <EntryAnimation index={index}>
      <Section
        padding="12px 12px"
        isRow
        style={{
          ...(isShowBorder && {
            borderBottomWidth: 1,
            borderBottomColor: '#393939',
          }),
        }}>
        <Avatar url={data.photo_url} alt={data.name} />
        <Gap width={8} />
        <Section>
          <Text label={data.name} fontWeight="semi-bold" color="#EFF4FB" />
          <Text label={data.time} fontWeight="regular" color="#9F9E9F" />
        </Section>
      </Section>
    </EntryAnimation>
  );
};

export default CalendarEventCard;

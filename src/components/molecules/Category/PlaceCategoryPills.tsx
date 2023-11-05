/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {PlaceCategoryInterface} from '../../../interfaces/PlaceInterface';
import useTheme from '../../../theme/useTheme';
import {WIDTH} from '../../../utils/config';
import {Spacer, Text, TouchableSection} from '../../atoms';

interface PlaceCategoryPillsProps {
  data: PlaceCategoryInterface;
  length: any;
  onSelect: (data: PlaceCategoryInterface) => void;
}

export const PlaceCategoryPills = ({
  data,
  onSelect,
  length,
}: PlaceCategoryPillsProps) => {
  const theme = useTheme();
  let widthCard = WIDTH as any;

  if (length < 3) {
    widthCard = '48%';
  }

  if (length >= 3) {
    widthCard = '32%';
  }

  if (length >= 4) {
    widthCard = WIDTH / 4.7;
  }

  return (
    <TouchableSection
      onPress={() => onSelect(data)}
      padding="10px 8px"
      style={{
        backgroundColor: theme?.colors.SECTION,
        borderRadius: 8,
        width: widthCard,
      }}
      isCenter>
      {data.icon}
      <Spacer sm />
      <Text
        label={data.title}
        variant="small"
        color={theme?.colors.TEXT_PRIMARY}
      />
    </TouchableSection>
  );
};

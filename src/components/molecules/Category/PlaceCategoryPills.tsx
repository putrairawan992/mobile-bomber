/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {PlaceCategoryInterface} from '../../../interfaces/PlaceInterface';
import useTheme from '../../../theme/useTheme';
import {WIDTH} from '../../../utils/config';
import {Spacer, Text, TouchableSection} from '../../atoms';

interface PlaceCategoryPillsProps {
  data: PlaceCategoryInterface;
  onSelect: (data: PlaceCategoryInterface) => void;
}

export const PlaceCategoryPills = ({
  data,
  onSelect,
}: PlaceCategoryPillsProps) => {
  const theme = useTheme();
  return (
    <TouchableSection
      onPress={() => onSelect(data)}
      padding="10px 8px"
      style={{
        backgroundColor: theme?.colors.SECTION,
        borderRadius: 8,
        width: WIDTH / 5,
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

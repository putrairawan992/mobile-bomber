import React from 'react';
import {PlaceCategoryInterface} from '../../../interfaces/PlaceInterface';
import useTheme from '../../../theme/useTheme';
import {Section, Spacer, Text} from '../../atoms';
import {PlaceCategoryPills} from '../../molecules/Category/PlaceCategoryPills';

interface PlaceCategoryProps {
  title: string;
  data: PlaceCategoryInterface[];
}

export const PlaceCategory = ({title, data}: PlaceCategoryProps) => {
  const theme = useTheme();
  return (
    <Section padding="0px 16px">
      <Text
        color={theme?.colors.PRIMARY}
        label={title}
        fontWeight="raleway-bold"
      />
      <Spacer sm />
      <Section isRow isBetween>
        {Array.isArray(data) &&
          data.map((item: PlaceCategoryInterface, idx: number) => {
            return <PlaceCategoryPills key={`category_${idx}`} data={item} />;
          })}
      </Section>
    </Section>
  );
};

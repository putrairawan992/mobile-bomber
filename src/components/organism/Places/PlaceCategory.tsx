import React from 'react';
import {PlaceCategoryInterface} from '../../../interfaces/PlaceInterface';
import useTheme from '../../../theme/useTheme';
import {Section, Spacer, Text} from '../../atoms';
import {PlaceCategoryPills} from '../../molecules/Category/PlaceCategoryPills';
import {Beer, DiscoLight, Karaoke, WineBottle} from '../../../assets/icons';

interface PlaceCategoryProps {
  title: string;
  data: PlaceCategoryInterface[];
  onSelect: (data: PlaceCategoryInterface) => void;
}

//update dummy onl
const dataDemoOnly = [
  {title: 'title 1', icon: <DiscoLight color="#FCFCFC" size={24} />},
  {title: 'title 2', icon: <Karaoke color="#FCFCFC" size={24} />},
  {title: 'title 3', icon: <Beer color="#FCFCFC" size={24} />},
  {title: 'title 4', icon: <WineBottle color="#FCFCFC" size={24} />},
];

console.log('dataDemoOnly', dataDemoOnly);

export const PlaceCategory = ({title, data, onSelect}: PlaceCategoryProps) => {
  const theme = useTheme();
  return (
    <Section padding="0px 16px">
      <Text color={theme?.colors.PRIMARY} label={title} fontWeight="bold" />
      <Spacer sm />
      <Section isRow isBetween>
        {Array.isArray(data) &&
          data.map((item: any, idx: number) => {
            return (
              <PlaceCategoryPills
                length={data.length}
                key={`category_${idx}`}
                data={item}
                onSelect={onSelect}
              />
            );
          })}
      </Section>
    </Section>
  );
};

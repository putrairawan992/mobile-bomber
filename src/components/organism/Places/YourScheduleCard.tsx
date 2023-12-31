/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import {PlaceInterface} from '../../../interfaces/PlaceInterface';
import useTheme from '../../../theme/useTheme';
import {WIDTH} from '../../../utils/config';
import {Section, Spacer, Text} from '../../atoms';
import {UserLocationInterface} from '../../../interfaces/UserInterface';
import {YourCardSchdule} from './YourCardSchdule';

interface PlaceCategoryProps {
  title: string;
  data: PlaceInterface[];
  itemWidthStyle: boolean;
  fullSliderWidth: boolean;
  onSelect: (id: string) => void;
  userLocation: UserLocationInterface | null;
}

export const YourScheduleCard = ({
  title,
  data,
  onSelect,
  userLocation,
}: PlaceCategoryProps) => {
  const theme = useTheme();

  let renderItem = ({item}: any) => (
    <YourCardSchdule
      item={item}
      data={data}
      onSelect={onSelect}
      userLocation={userLocation}
    />
  );
  return (
    <Section style={{backgroundColor: 'transparent'}}>
      <Text
        color={theme?.colors.PRIMARY}
        label={title}
        fontWeight="bold"
        style={{marginLeft: 16}}
      />
      <Spacer sm />
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={WIDTH}
        itemWidth={WIDTH - 30}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        sliderHeight={50}
        activeSlideAlignment={'start'}
      />
    </Section>
  );
};

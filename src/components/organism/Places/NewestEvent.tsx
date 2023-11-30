/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import {PlaceInterface} from '../../../interfaces/PlaceInterface';
import useTheme from '../../../theme/useTheme';
import {HEIGHT, WIDTH} from '../../../utils/config';
import {Gap, Section, Spacer, Text} from '../../atoms';
import {UserLocationInterface} from '../../../interfaces/UserInterface';
import {NewstEventCard} from './NewestEventCard';

interface PlaceCategoryProps {
  title: string;
  data: PlaceInterface[];
  itemWidthStyle: boolean;
  fullSliderWidth: boolean;
  onSelect: (id: string) => void;
  userLocation: UserLocationInterface | null;
}

export const NewestEvent = ({
  title,
  data,
  onSelect,
  userLocation,
}: PlaceCategoryProps) => {
  const theme = useTheme();
  let renderItem = ({item}: any) => (
    <NewstEventCard
      item={item}
      onSelect={onSelect}
      userLocation={userLocation}
    />
  );
  return (
    <Section>
      <Text
        color={theme?.colors.PRIMARY}
        label={title}
        variant="medium"
        fontWeight="bold"
        style={{marginLeft: 18}}
      />
      <Spacer sm />
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={WIDTH}
        itemWidth={180}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        sliderHeight={HEIGHT}
        activeSlideAlignment={'start'}
      />
      <Gap height={8} />
    </Section>
  );
};

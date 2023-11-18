/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import {PlaceInterface} from '../../../interfaces/PlaceInterface';
import useTheme from '../../../theme/useTheme';
import {HEIGHT, WIDTH} from '../../../utils/config';
import {Section, Spacer, Text} from '../../atoms';
import {UserLocationInterface} from '../../../interfaces/UserInterface';
import {TryBeverageCard} from './TryBeverageCard';

interface PlaceCategoryProps {
  title: string;
  data: PlaceInterface[];
  itemWidthStyle: boolean;
  fullSliderWidth: boolean;
  onSelect: (id: string) => void;
  userLocation: UserLocationInterface | null;
}

export const TryBeverage = ({
  title,
  data,
  itemWidthStyle,
  fullSliderWidth,
  onSelect,
  userLocation,
}: PlaceCategoryProps) => {
  const theme = useTheme();
  // const [index, setIndex] = React.useState<number>(0);
  let renderItem = ({item}: any) => (
    <TryBeverageCard
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
        fontWeight="bold"
        style={{marginLeft: 20}}
      />
      <Spacer sm />
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={fullSliderWidth ? WIDTH : WIDTH - 40}
        itemWidth={itemWidthStyle ? WIDTH - 90 : WIDTH - 145}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        sliderHeight={HEIGHT}
        activeSlideAlignment={'start'}
        // onSnapToItem={i => setIndex(i)}
      />
      {/* <Gap height={8} /> */}
      {/* <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        containerStyle={{
          backgroundColor: theme?.colors.BACKGROUND,
          // paddingTop: 3,
          // paddingBottom: 12,
        }}
        dotStyle={{
          width: 16,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: theme?.colors.PRIMARY,
        }}
        inactiveDotStyle={{
          // Define styles for inactive dots here
          width: 12,
          height: 12,
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        animatedDuration={250}
        animatedFriction={4}
        animatedTension={50}
        delayPressInDot={0}
      /> */}
    </Section>
  );
};

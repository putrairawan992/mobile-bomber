/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import {PlaceInterface} from '../../../interfaces/PlaceInterface';
import useTheme from '../../../theme/useTheme';
import {HEIGHT, WIDTH} from '../../../utils/config';
import {Section, Spacer, Text} from '../../atoms';
import {UserLocationInterface} from '../../../interfaces/UserInterface';
import {OurPlatformPromoPlaceCard} from './OurPlatformPromoPlaceCard';
import {View} from 'react-native';

interface OurPlatformPromoProps {
  title: string;
  data: PlaceInterface[];
  itemWidthStyle: boolean;
  fullSliderWidth: boolean;
  onSelect: (id: string) => void;
  navigation: any;
  userLocation: UserLocationInterface | null;
}

export const OurPlatformPromo = ({
  title,
  data,
  navigation,
}: OurPlatformPromoProps) => {
  const theme = useTheme();
  let renderItem = ({item}: any) => (
    <OurPlatformPromoPlaceCard navigation={navigation} item={item} />
  );
  return (
    <Section style={{backgroundColor: 'transparent'}}>
      <View className="flex-row justify-between items-center">
        <Text
          color={theme?.colors.PRIMARY}
          label={title}
          fontWeight="bold"
          style={{marginLeft: 16}}
        />
        <Text
          label={'see all'}
          onPress={() => navigation.navigate('OurPlatformPromoDetail')}
          variant="medium"
          fontWeight="medium"
          style={{marginRight: 16}}
        />
      </View>
      <Spacer sm />
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={WIDTH}
        itemWidth={WIDTH - 90}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        sliderHeight={HEIGHT}
        activeSlideAlignment={'start'}
      />
    </Section>
  );
};

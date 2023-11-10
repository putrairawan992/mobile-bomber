/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import {PlaceInterface} from '../../../interfaces/PlaceInterface';
import useTheme from '../../../theme/useTheme';
import {HEIGHT, WIDTH} from '../../../utils/config';
import {Section, Spacer, Text} from '../../atoms';
import {UserLocationInterface} from '../../../interfaces/UserInterface';
import { YourCardSchdule } from './YourCardSchdule';

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
  const [index, setIndex] = React.useState<number>(0);
  let renderItem = ({item}: any) => (
    <YourCardSchdule item={item} onSelect={onSelect} userLocation={userLocation} />
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
        data={[1,2,3,4]}
        renderItem={renderItem}
        sliderWidth={WIDTH}
        itemWidth={WIDTH - 50}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        sliderHeight={HEIGHT}
        activeSlideAlignment={'start'}
        onSnapToItem={i => setIndex(i)}
      />
    </Section>
  );
};

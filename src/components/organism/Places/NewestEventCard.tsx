/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image} from 'react-native';
import {
  PlaceInterface,
  PlaceOperationalTimeInterface,
} from '../../../interfaces/PlaceInterface';
import {ScaleAnimation} from '../../atoms';
import {UserLocationInterface} from '../../../interfaces/UserInterface';

interface PlaceCardProps {
  item: PlaceInterface;
  onSelect: (id: string) => void;
  isPlaceDetail?: boolean;
  onOpenSchedule?: () => void;
  operation?: PlaceOperationalTimeInterface | null;
  onOpenGallery?: () => void;
  isVertical?: boolean;
  userLocation: UserLocationInterface | null;
}

export const NewstEventCard = ({
  item,
  onSelect,
  isPlaceDetail = false,
}: PlaceCardProps) => {
  return (
    <ScaleAnimation
      onPress={() => onSelect(item.clubId.toString())}
      disabled={isPlaceDetail ? true : false}
      style={{marginLeft: 20, height: 240, width: 160}}
      scaleTo={0.97}>
      <Image
        source={{
          uri: item?.coverImage,
        }}
        resizeMode="cover"
        style={{height: '100%', width: '100%'}}
      />
    </ScaleAnimation>
  );
};

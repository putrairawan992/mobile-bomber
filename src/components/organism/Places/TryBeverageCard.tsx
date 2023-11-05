/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image} from 'react-native';
import {
  PlaceInterface,
  PlaceOperationalTimeInterface,
} from '../../../interfaces/PlaceInterface';
import useTheme from '../../../theme/useTheme';
import {Button, Gap, ScaleAnimation, Section, Text} from '../../atoms';
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

export const TryBeverageCard = ({
  item,
  onSelect,
  isPlaceDetail = false,
  isVertical,
}: PlaceCardProps) => {
  const theme = useTheme();
  return (
    <ScaleAnimation
      onPress={() => onSelect(item.clubId.toString())}
      disabled={isPlaceDetail ? true : false}
      scaleTo={0.97}
      style={{
        backgroundColor: '#262626',
        borderRadius: 8,
        marginLeft: isPlaceDetail || isVertical ? 0 : 20,
        ...(isVertical && {marginBottom: 20}),
      }}>
      <>
        <Section padding="13px 13px">
          <Image
            source={{
              uri: item?.coverImage,
            }}
            style={{height: 222}}
          />
        </Section>
        {!isPlaceDetail && (
          <Section
            padding="13px 16px"
            style={{
              backgroundColor: theme?.colors.SECTION,
              ...(!isPlaceDetail && {
                borderBottomLeftRadius: 12,
                borderBottomRightRadius: 12,
              }),
            }}>
            <Text
              variant="base"
              fontWeight="poppins-semi-bold"
              label={'Veuve Clicquot Brut Set'}
            />
            <Gap height={10} />
            <Text variant="small" label={item.address.slice(0, 80) + '...'} />
            <Gap height={10} />
            <Button
              onPress={() => {}}
              type="textButton"
              style={{
                backgroundColor: theme?.colors.PRIMARY,
                borderRadius: 8,
              }}
              title="visit place"
            />
          </Section>
        )}
      </>
    </ScaleAnimation>
  );
};

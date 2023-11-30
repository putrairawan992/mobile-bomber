/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ImageBackground} from 'react-native';
import {ScaleAnimation, Section, Text} from '../../atoms';
import moment from 'moment';

interface OurPlatformPromoPlaceCardProps {
  item?: any;
  isVertical?: boolean;
  horizontal?: boolean;
  navigation?: any;
}

export const OurPlatformPromoPlaceCard = ({
  horizontal,
  item,
  navigation,
}: OurPlatformPromoPlaceCardProps) => {
  return (
    <ScaleAnimation
      onPress={() =>
        navigation.navigate('OurPlatformPromoViewDetail', {
          id: item?.promotion_id,
        })
      }
      disabled={false}
      scaleTo={0.97}
      style={{
        height: 178,
        backgroundColor: 'black',
        borderRadius: 8,
        marginLeft: 20,
        width: horizontal ? 355 : 285,
        ...(horizontal && {
          marginBottom: 20,
        }),
      }}>
      <>
        <ImageBackground
          source={{uri: item?.banner}}
          style={{
            width: '100%',
            height: 178,
          }}
          imageStyle={{
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          }}
          resizeMode="cover">
          <Section
            padding="4px 6px"
            style={{
              position: 'absolute',
              top: 15,
              right: 10,
              borderRadius: 4,
              backgroundColor: '#F04835',
            }}>
            <Text
              variant="small"
              label={moment(item?.end_time).format('DD MMMM YYYY')}
            />
          </Section>
        </ImageBackground>
      </>
    </ScaleAnimation>
  );
};

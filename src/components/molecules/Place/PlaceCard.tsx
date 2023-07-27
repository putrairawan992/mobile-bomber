/* eslint-disable react-native/no-inline-styles */
import {Star1} from 'iconsax-react-native';
import React from 'react';
import {Image, ImageBackground, View} from 'react-native';
import {PlaceInterface} from '../../../interfaces/PlaceInterface';
import useTheme from '../../../theme/useTheme';
import {Gap, ScaleAnimation, Section, Text} from '../../atoms';

interface PlaceCardProps {
  item: PlaceInterface;
}

export const PlaceCard = ({item}: PlaceCardProps) => {
  const theme = useTheme();
  return (
    <ScaleAnimation
      onPress={() => undefined}
      disabled={false}
      scaleTo={0.97}
      style={{
        marginLeft: 20,
      }}>
      <>
        <ImageBackground
          source={{uri: item.coverImage}}
          style={{width: '100%', height: 231}}
          imageStyle={{
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            opacity: 0.4,
          }}
          resizeMode="cover">
          <Section padding="16px 16px">
            <Section isRow>
              {Array.isArray(item.category) &&
                item.category.map((cat: string, idx: number) => {
                  return (
                    <View
                      key={`category_${idx}`}
                      style={{
                        padding: 4,
                        backgroundColor: '#2D2D2D',
                        borderRadius: 4,
                        marginRight: 4,
                      }}>
                      <Text variant="small" label={cat} />
                    </View>
                  );
                })}
            </Section>
            <Gap height={16} />
            <Image
              source={{uri: item.logo}}
              resizeMode="contain"
              style={{width: 70, height: 50}}
            />
            <Gap height={50} />
            <Text label="Featured Today" />
            <Gap height={8} />
            <Section isRow>
              {Array.isArray(item.featuredToday) &&
                item.featuredToday.map((feat: string, idx: number) => {
                  return (
                    <View
                      key={`category_${idx}`}
                      style={{
                        padding: 8,
                        backgroundColor: theme?.colors.PRIMARY,
                        borderRadius: 4,
                        marginRight: 12,
                      }}>
                      <Text label={feat} />
                    </View>
                  );
                })}
            </Section>
          </Section>
        </ImageBackground>
        <Section
          padding="13px 16px"
          style={{
            backgroundColor: theme?.colors.SECTION,
            borderBottomEndRadius: 12,
            borderBottomStartRadius: 12,
          }}>
          <Section isRow isBetween>
            <Section isRow>
              {[1, 2, 3, 4].map((star: number) => (
                <View style={{marginRight: 6}} key={`star_${star}`}>
                  <Star1 size={16} color="#3CA6EC" variant="Bold" />
                </View>
              ))}
              <Text label={`${item.rating.toString()} / 5`} color="#A7B1C1" />
            </Section>
            <Text variant="small" fontWeight="bold" label="5km" />
          </Section>
          <Gap height={10} />
          <Text variant="small" label={item.address} />
        </Section>
      </>
    </ScaleAnimation>
  );
};

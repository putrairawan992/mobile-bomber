/* eslint-disable react-native/no-inline-styles */
import {ArrowDown2, Gallery, Star1} from 'iconsax-react-native';
import React from 'react';
import {Image, ImageBackground, View} from 'react-native';
import {useImageAspectRatio} from '../../../hooks/useImageAspectRatio';
import {PlaceInterface} from '../../../interfaces/PlaceInterface';
import useTheme from '../../../theme/useTheme';
import {Gap, ScaleAnimation, Section, Text} from '../../atoms';
import styles from './Style';

interface PlaceCardProps {
  item: PlaceInterface;
  onSelect: (id: string) => void;
  isPlaceDetail?: boolean;
}

export const PlaceCard = ({
  item,
  onSelect,
  isPlaceDetail = false,
}: PlaceCardProps) => {
  const theme = useTheme();
  const aspectRatio = useImageAspectRatio(item?.logo as string);

  const renderSchedule = () => {
    return (
      <View style={styles.scheduleContainer}>
        <Section isRow>
          <Text label="Open Now" color={theme?.colors.SUCCESS} />
          <Text label=" | 10 pm - 4am" color={theme?.colors.TEXT_PRIMARY} />
          <Gap width={4} />
          <View
            style={{
              padding: 2,
              borderRadius: 8,
              borderColor: theme?.colors.ICON,
              borderWidth: 1,
            }}>
            <ArrowDown2 size={14} color={theme?.colors.ICON} variant="Bold" />
          </View>
        </Section>
      </View>
    );
  };

  return (
    <ScaleAnimation
      onPress={() => onSelect(item.id)}
      disabled={isPlaceDetail ? true : false}
      scaleTo={0.97}
      style={{
        marginLeft: isPlaceDetail ? 0 : 20,
      }}>
      <>
        <ImageBackground
          source={{uri: item.coverImage}}
          style={{width: '100%', height: 231}}
          imageStyle={{
            ...(!isPlaceDetail && {
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
            }),
            opacity: 0.4,
          }}
          resizeMode="cover">
          {isPlaceDetail && renderSchedule()}
          <Section padding="16px 16px">
            {isPlaceDetail && (
              <Section isRow isBetween>
                <Text
                  variant="x-large"
                  label={item.name}
                  fontWeight="extra-bold"
                  textTransform="uppercase"
                />
                <Section
                  isRow
                  padding="8px 8px"
                  backgroundColor="rgba(255, 255, 255, 0.4)"
                  style={{borderRadius: 8}}>
                  <Gallery size={20} color={theme?.colors.ICON} />
                  <Gap width={8} />
                  <Text variant="small" fontWeight="bold" label="20" />
                </Section>
              </Section>
            )}
            <Section isRow>
              {Array.isArray(item.category) &&
                item.category.map((cat: string, idx: number) => {
                  return (
                    <View key={`category_${idx}`} style={styles.piils}>
                      <Text variant="small" label={cat} />
                    </View>
                  );
                })}
            </Section>
            <Gap height={16} />
            {isPlaceDetail ? (
              <>
                <Text label="Songsou, Taipei City" />
              </>
            ) : (
              <>
                <Image
                  source={{uri: item?.logo}}
                  style={{height: 56, aspectRatio, marginBottom: 50}}
                />
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
              </>
            )}
          </Section>
        </ImageBackground>
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
        )}
      </>
    </ScaleAnimation>
  );
};

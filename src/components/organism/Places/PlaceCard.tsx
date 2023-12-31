/* eslint-disable react-native/no-inline-styles */
import {ArrowDown2, Gallery} from 'iconsax-react-native';
import React from 'react';
import {ImageBackground, TouchableOpacity, View} from 'react-native';
import {
  PlaceInterface,
  PlaceOperationalTimeInterface,
} from '../../../interfaces/PlaceInterface';
import useTheme from '../../../theme/useTheme';
import {
  Gap,
  ScaleAnimation,
  Section,
  Text,
  TouchableSection,
} from '../../atoms';
import styles from './Style';
import {Colors} from '../../../theme';
import {UserLocationInterface} from '../../../interfaces/UserInterface';
import {calculateDistance} from '../../../utils/calculateDistance';
import {Star} from '../../../assets/icons';
import {ScrollView} from 'react-native';
import {WIDTH} from '../../../utils/config';

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

export const PlaceCard = ({
  item,
  onSelect,
  isPlaceDetail = false,
  onOpenSchedule,
  operation,
  onOpenGallery,
  isVertical,
  userLocation,
}: PlaceCardProps) => {
  const theme = useTheme();

  const renderSchedule = () => {
    return (
      <View style={styles.scheduleContainer}>
        <Section isRow>
          <Text
            label={operation?.isClose ? 'Closed' : 'Open Now'}
            color={
              operation?.isClose ? Colors['danger-400'] : theme?.colors.SUCCESS
            }
          />
          <Text
            label={` | ${operation?.open} - ${operation?.close}`}
            color={theme?.colors.TEXT_PRIMARY}
          />
          <Gap width={4} />
          <TouchableOpacity
            onPress={onOpenSchedule}
            style={{
              padding: 2,
              borderRadius: 8,
              borderColor: theme?.colors.ICON,
              borderWidth: 1,
            }}>
            <ArrowDown2 size={14} color={theme?.colors.ICON} variant="Bold" />
          </TouchableOpacity>
        </Section>
      </View>
    );
  };

  const itemTag: any = [
    {name: 'LGBT'},
    {name: 'EDM'},
    {name: 'Rooftop'},
    {name: 'Freeflow'},
  ];
  console.log(
    '!!userLocation?.latitude && !!item?.latitude',
    !!userLocation?.latitude && !!item?.latitude,
    userLocation?.latitude,
    item?.latitude,
  );

  return (
    <ScaleAnimation
      onPress={() => onSelect(item.clubId.toString())}
      disabled={isPlaceDetail ? true : false}
      scaleTo={0.97}
      style={{
        backgroundColor: '#262626',
        borderRadius: 8,
        marginLeft: 20,
        ...(isVertical && {
          marginBottom: 20,
          width: WIDTH / 1.105,
        }),
      }}>
      <>
        <ImageBackground
          source={{
            uri: item?.coverImage,
          }}
          style={{width: '100%', height: 231}}
          imageStyle={{
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
          resizeMode="cover">
          <View style={{position: 'absolute', top: 15, left: 10}}>
            <ScrollView horizontal>
              {itemTag.map((cat: any, idx: number) => {
                return (
                  <View key={`category_${idx}`} style={styles.piils}>
                    <Text variant="small" label={cat.name} />
                  </View>
                );
              })}
            </ScrollView>
          </View>
          {isPlaceDetail && !!operation && renderSchedule()}
          <Section padding="16px 16px">
            {isPlaceDetail && (
              <Section isRow isBetween>
                <Text
                  variant="x-large"
                  label={item.name}
                  fontWeight="extra-bold"
                  textTransform="uppercase"
                />
                <TouchableSection
                  onPress={onOpenGallery}
                  isRow
                  padding="8px 8px"
                  backgroundColor="rgba(255, 255, 255, 0.4)"
                  style={{borderRadius: 8}}>
                  <>
                    <Gallery size={20} color={theme?.colors.ICON} />
                    <Gap width={8} />
                    <Text variant="small" fontWeight="bold" label="20" />
                  </>
                </TouchableSection>
              </Section>
            )}
            <Gap height={150} />
            {isPlaceDetail ? (
              <>
                <Text label="Songsou, Taipei City" />
              </>
            ) : (
              <>
                {/* <Image
                  source={{
                    uri: item?.logo ?? 'https://bomber.app/club-logo/wave.png',
                  }}
                  style={{height: 56, aspectRatio, marginBottom: 50}}
                /> */}

                <Text variant="small" label="Featured Today" />
                <Gap height={8} />
                <Section isRow>
                  {Array.isArray(item.featuredToday) &&
                    item.featuredToday.map((feat: string, idx: number) => {
                      return (
                        <Section
                          padding="4px 8px"
                          key={`category_${idx}`}
                          style={{
                            backgroundColor: theme?.colors.PRIMARY,
                            borderRadius: 4,
                            marginRight: 12,
                          }}>
                          <Text variant="small" label={feat} />
                        </Section>
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
            <Text
              variant="base"
              fontWeight="poppins-semi-bold"
              label={item.name}
            />
            <Gap height={10} />
            <Text
              variant="small"
              style={{lineHeight: 20, height: 40}}
              label={
                item.address?.length > 50
                  ? item.address.slice(0, 80) + '...'
                  : item.address
              }
            />
            <Gap height={10} />
            <Section isRow isBetween>
              <Section isRow>
                {[1].map((star: number) => (
                  <View style={{marginRight: 6}} key={`star_${star}`}>
                    <Star size={16} color="#FB8500" />
                  </View>
                ))}
                <Text label={`${item.rating.toString()}`} color="#A7B1C1" />
              </Section>
              <Text
                variant="small"
                fontWeight="bold"
                label={
                  !!userLocation?.latitude && !!item?.latitude
                    ? calculateDistance({
                        origin: {
                          latitude: Number(userLocation.latitude),
                          longitude: Number(userLocation.longitude),
                        },
                        destination: {
                          latitude: Number(item.latitude),
                          longitude: Number(item.longitude),
                        },
                      }).toString() + ' km'
                    : 'unknown'
                }
              />
            </Section>
          </Section>
        )}
        <Gap height={5} />
      </>
    </ScaleAnimation>
  );
};

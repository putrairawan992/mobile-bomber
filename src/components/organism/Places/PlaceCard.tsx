/* eslint-disable react-native/no-inline-styles */
import {ArrowDown2, Gallery} from 'iconsax-react-native';
import React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {useImageAspectRatio} from '../../../hooks/useImageAspectRatio';
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
  const aspectRatio = useImageAspectRatio(
    item?.logo ?? 'https://bomber.app/club-logo/wave.png',
  );

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

  return (
    <ScaleAnimation
      onPress={() => onSelect(item.clubId.toString())}
      disabled={isPlaceDetail ? true : false}
      scaleTo={0.97}
      style={{
        marginLeft: isPlaceDetail || isVertical ? 0 : 20,
        ...(isVertical && {marginBottom: 20}),
      }}>
      <>
        <ImageBackground
          source={{
            uri: item?.coverImage,
          }}
          style={{width: '100%', height: 231}}
          imageStyle={{
            ...(!isPlaceDetail && {
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
            }),
            opacity: 0.4,
          }}
          resizeMode="cover">
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
            {/* <Section isRow style={{flexWrap: 'wrap', display: 'flex'}}> */}
            <ScrollView horizontal>
              {Array.isArray(item.category) &&
                item.category[0].split(', ').map((cat: string, idx: number) => {
                  return (
                    <View key={`category_${idx}`} style={styles.piils}>
                      <Text variant="small" label={cat} />
                    </View>
                  );
                })}
            </ScrollView>
            {/* </Section> */}
            <Gap height={16} />
            {isPlaceDetail ? (
              <>
                <Text label="Songsou, Taipei City" />
              </>
            ) : (
              <>
                <Image
                  source={{
                    uri: item?.logo ?? 'https://bomber.app/club-logo/wave.png',
                  }}
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
            <Text
              variant="base"
              fontWeight="poppins-semi-bold"
              label={item.name}
            />
            <Gap height={6} />
            <Section isRow isBetween>
              <Section isRow>
                {[1, 2, 3, 4].map((star: number) => (
                  <View style={{marginRight: 6}} key={`star_${star}`}>
                    <Star size={16} color="#FB8500" />
                  </View>
                ))}
                <Text label={`${item.rating.toString()} / 5`} color="#A7B1C1" />
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
            <Gap height={10} />
            <Text variant="small" label={item.address.slice(0, 80) + '...'} />
          </Section>
        )}
      </>
    </ScaleAnimation>
  );
};

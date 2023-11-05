/* eslint-disable react-native/no-inline-styles */
import { ArrowDown2, Gallery } from 'iconsax-react-native';
import React from 'react';
import { Image, ImageBackground, TouchableOpacity, View } from 'react-native';
import { useImageAspectRatio } from '../../../hooks/useImageAspectRatio';
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
import { Colors } from '../../../theme';
import { UserLocationInterface } from '../../../interfaces/UserInterface';
import { calculateDistance } from '../../../utils/calculateDistance';
import { Star } from '../../../assets/icons';
import { ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { IcBarcodeBorder, IcLegal, IcMapBorder, ImgOmniClub, OmniNight } from '../../../theme/Images';

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

export const YourCardSchdule = ({
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

  const itemTag: any = [
    { name: 'LGBT' },
    { name: 'EDM' },
    { name: 'Rooftop' },
    { name: 'Freeflow' },
  ];

  return (
    <ScaleAnimation
      onPress={() => onSelect(item.clubId.toString())}
      disabled={isPlaceDetail ? true : false}
      scaleTo={0.97}
      style={{
        backgroundColor: '#262626',
        borderRadius: 8,
        marginLeft: 20
      }}>
      <>
        <LinearGradient
          colors={['#A060FA', '#C800CC']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            paddingVertical: 16,
            borderColor: "red",
            borderRadius: 8,
            padding:10
          }}>
          <View className="flex-row">
            <Image
              source={OmniNight}
              className="w-[74] h-[74]"
              style={{
                borderColor: '#525252',
                borderWidth: 1,
                borderRadius: 4,
              }}
              resizeMode="cover"
            />
            <Gap width={10} />
            <View className="flex-1">

              <Text
                className="flex-1"
                label="2 days more"
              />
              <Gap height={1} />
              <Section isRow isBetween>
                <Text
                  variant='large'
                  className="font-inter-semibold"
                  label="OMNI TAIPEI"
                />
                <Section isRow isBetween>
                  <Image
                    source={IcBarcodeBorder}
                    resizeMode="contain"
                    className="w-[30] h-[30]"
                  />
                  <Gap width={10}/>
                  <Image
                    source={IcMapBorder}
                    resizeMode="contain"
                    className="w-[30] h-[30]"
                  />
                </Section>
              </Section>
              <Gap height={10} />
              <Section isRow>
              <Text
                className="flex-1"
                label="Sunday 14, June 2023"
              />
              </Section>
            </View>
          </View>
        </LinearGradient>
      </>
    </ScaleAnimation>
  );
};

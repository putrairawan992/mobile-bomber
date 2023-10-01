/* eslint-disable react-native/no-inline-styles */
import { ArrowDown2,  Star1 } from 'iconsax-react-native';
import React from 'react';
import {
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { useImageAspectRatio } from '../../../hooks/useImageAspectRatio';
import {
  PlaceInterface,
  PlaceOperationalTimeInterface,
} from '../../../interfaces/PlaceInterface';
import useTheme from '../../../theme/useTheme';
import {
  DefaultText,
  Gap,
  Layout,
  Section,
  Text,
} from '../../atoms';
import styles from './Style';
import { Colors, Images } from '../../../theme';
import { WIDTH } from '../../../utils/config';
import Carousel from 'react-native-reanimated-carousel';
import { IcLegal } from '../../../theme/Images';

interface PlaceCardProps {
  item: PlaceInterface;
  onSelect: (id: string) => void;
  isPlaceDetail?: boolean;
  onOpenSchedule?: () => void;
  operation?: PlaceOperationalTimeInterface | null;
  onOpenGallery?: () => void;
  isVertical?: boolean;
}

export const PlaceCardSecond = ({
  item,
  isPlaceDetail = false,
  onOpenSchedule,
  operation,
}: PlaceCardProps) => {
  const theme = useTheme();
  const aspectRatio = useImageAspectRatio(
    item?.logo ?? 'https://bomber.app/club-logo/wave.png',
  );

  const renderSchedule = () => {
    return (
      <View className='ml-2'>
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

  const dataImageSldier: any = [
    {
      urlImage: Images.bannerPlaceDetail,
      itemTag: [{ name: 'LGBT' }, { name: 'EDM' }, { name: 'Rooftop' }]
    },
    {
      urlImage: Images.bannerPlaceDetailv2,
      itemTag: [{ name: 'LGBT' }, { name: 'EDM' }, { name: 'Rooftop' }]
    }
  ]

  return (
    <Layout>
      <Carousel
        loop
        width={WIDTH}
        height={WIDTH / 1.5}
        autoPlay={true}
        data={dataImageSldier}
        scrollAnimationDuration={5000}
        // onSnapToItem={index => setPromoActive(index)}
        renderItem={({ item }: any) => (
          <TouchableOpacity activeOpacity={0.7} style={{ alignSelf: 'center' }}>
            <Image
              resizeMode="cover"
              source={item.urlImage}
              style={{
                width: WIDTH,
                height: WIDTH / 1.5,
              }}
            />
            <Section padding="16px 16px" style={{ position: 'absolute', top: 22 }}>
              <ScrollView horizontal>
                {item.itemTag.map((cat: any, idx: number) => {
                  return (
                    <View key={`category_${idx}`} style={styles.piils}>
                      <Text variant="small" label={cat.name} />
                    </View>
                  );
                })}
              </ScrollView>
            </Section>
          </TouchableOpacity>
        )}
      />
      <Gap height={10} />
      <TouchableOpacity
        activeOpacity={0.7}
        className="flex-row items-center py-2 px-1 mb-2">
        <DefaultText title='OMNI NIGHT CLUB' titleClassName="ml-1 text-xl text-secondary" />
        <Gap width={5} />
        <Image source={IcLegal} resizeMode="contain" className="w-[20] h-[20]" />
      </TouchableOpacity>
      <Gap height={10} />
      {renderSchedule()}
      <Gap height={10} />
      {isPlaceDetail ? (
        <Section padding='10px 10px' isRow isBetween>
          <View className='border-b-[1px] border-white w-36'>
            <Text className='' label="Songsou, Taipei City" />
          </View>
          <Text className='ml-2' label='5 Km' />
        </Section>
      ) : (
        <View className='ml-2'>
          <Image
            source={{
              uri: item?.logo ?? 'https://bomber.app/club-logo/wave.png',
            }}
            style={{ height: 56, aspectRatio, marginBottom: 50 }}
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
        </View>
      )}
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
                <View style={{ marginRight: 6 }} key={`star_${star}`}>
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
    </Layout>
  );
};

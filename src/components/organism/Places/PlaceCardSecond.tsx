/* eslint-disable react-native/no-inline-styles */
import {ArrowDown2, Star1} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Linking,
  Platform,
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
import {Gap, GradientText, Layout, Section, Text} from '../../atoms';
import styles from './Style';
import {Colors, Images} from '../../../theme';
import {WIDTH, gradientMapping} from '../../../utils/config';
import Carousel from 'react-native-reanimated-carousel';
import {IcLegal} from '../../../theme/Images';
import Geolocation from 'react-native-geolocation-service';
import {currency} from '../../../utils/function';

const SingsouLocation = {
  latitude: 25.0391667,
  longitude: 121.5067244,
};

interface PlaceCardProps {
  data: PlaceInterface;
  onSelect: (id: string) => void;
  isPlaceDetail?: boolean;
  onOpenSchedule?: () => void;
  operation?: PlaceOperationalTimeInterface | null;
  onOpenGallery?: () => void;
  isVertical?: boolean;
}

export const PlaceCardSecond = ({
  data,
  isPlaceDetail = false,
  onOpenSchedule,
  onOpenGallery,
  operation,
}: PlaceCardProps) => {
  const theme = useTheme();
  const aspectRatio = useImageAspectRatio(
    data?.logo ?? 'https://bomber.app/club-logo/wave.png',
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [distanceToSingsou, setDistanceToSingsou] = useState<number | null>(
    null,
  );

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({latitude, longitude});

        const distance = calculateDistance(
          position.coords.latitude,
          position.coords.longitude,
          SingsouLocation.latitude,
          SingsouLocation.longitude,
        );
        setDistanceToSingsou(distance);
      },
      error => {
        console.error(error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const deg2rad = (deg: number): number => {
    return deg * (Math.PI / 180);
  };

  const openMapDirection = () => {
    const url: any = Platform.select({
      ios: `comgooglemaps://?center=${SingsouLocation.latitude},${SingsouLocation.longitude}&q=${SingsouLocation.latitude},${SingsouLocation.longitude}&zoom=14&views=traffic"`,
      android: `geo://?q=${SingsouLocation.latitude},${SingsouLocation.longitude}`,
    });
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          const browser_url = `https://www.google.de/maps/@${SingsouLocation.latitude},${SingsouLocation.longitude}`;
          return Linking.openURL(browser_url);
        }
      })
      .catch(() => {
        if (Platform.OS === 'ios') {
          Linking.openURL(
            `maps://?q=${SingsouLocation.latitude},${SingsouLocation.longitude}`,
          );
        }
      });
  };

  const renderSchedule = () => {
    return (
      <View className="ml-2">
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
    },
    {
      urlImage: Images.bannerPlaceDetailv2,
    },
  ];

  const itemTag: any = [{name: 'LGBT'}, {name: 'EDM'}, {name: 'Rooftop'}];

  return (
    <Layout>
      <Section
        padding="16px 16px"
        style={{position: 'absolute', top: 0, zIndex: 10}}>
        <ScrollView horizontal>
          {itemTag.map((cat: any, idx: number) => {
            return (
              <View key={`category_${idx}`} style={styles.piils}>
                <Text variant="small" label={cat.name} />
              </View>
            );
          })}
        </ScrollView>
      </Section>
      <Carousel
        loop
        width={WIDTH}
        height={WIDTH / 1.5}
        // autoPlay={true}
        data={dataImageSldier}
        scrollAnimationDuration={5000}
        // onSnapToItem={index => setPromoActive(index)}
        renderItem={({item, index}: any) => (
          <TouchableOpacity
            activeOpacity={0.7}
            style={{alignSelf: 'center'}}
            onPress={onOpenGallery}>
            <Image
              resizeMode="cover"
              source={item.urlImage}
              style={{
                width: WIDTH,
                height: WIDTH / 1.5,
              }}
            />
            <Section
              padding="16px 16px"
              style={{position: 'absolute', bottom: -5, right: 0}}>
              <ScrollView horizontal>
                <View style={styles.piils}>
                  <Text
                    variant="small"
                    label={`${index + 1} / ${dataImageSldier.length}`}
                  />
                </View>
              </ScrollView>
            </Section>
          </TouchableOpacity>
        )}
      />
      <Gap height={10} />
      <TouchableOpacity
        activeOpacity={0.7}
        className="flex-row items-center py-2 px-1 mb-2">
        <GradientText
          xAxis={1.0}
          colors={
            gradientMapping['textPrimary' as keyof typeof gradientMapping].color
          }
          style={{
            fontSize: 24,
            fontFamily: 'Inter-SemiBold',
            lineHeight: 32,
          }}>
          {data.name}
        </GradientText>
        <Gap width={5} />
        <Image
          source={IcLegal}
          resizeMode="contain"
          className="w-[20] h-[20]"
        />
      </TouchableOpacity>
      <Gap height={10} />
      {renderSchedule()}
      <Gap height={10} />
      {isPlaceDetail ? (
        <Section padding="10px 10px" isRow isBetween>
          <View
            className="border-b-[1px] border-white"
            style={{width: WIDTH * 0.6}}>
            <TouchableOpacity
              onPress={() => openMapDirection()}
              activeOpacity={0.7}>
              <Text className="" label={data.address} />
            </TouchableOpacity>
          </View>
          {distanceToSingsou !== null && (
            <Text
              className="ml-2"
              label={`${currency(distanceToSingsou.toFixed(2), true)} km`}
            />
          )}
        </Section>
      ) : (
        <View className="ml-2">
          <Image
            source={{
              uri: data?.logo ?? 'https://bomber.app/club-logo/wave.png',
            }}
            style={{height: 56, aspectRatio, marginBottom: 50}}
          />

          <Text label="Featured Today" />
          <Gap height={8} />
          <Section isRow>
            {Array.isArray(data.featuredToday) &&
              data.featuredToday.map((feat: string, idx: number) => {
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
                <View style={{marginRight: 6}} key={`star_${star}`}>
                  <Star1 size={16} color="#3CA6EC" variant="Bold" />
                </View>
              ))}
              <Text label={`${data.rating.toString()} / 5`} color="#A7B1C1" />
            </Section>
            <Text variant="small" fontWeight="bold" label="5km" />
          </Section>
          <Gap height={10} />
          <Text variant="small" label={data.address} />
        </Section>
      )}
    </Layout>
  );
};

/* eslint-disable react-native/no-inline-styles */
import {ArrowDown2, ArrowLeft, Star1} from 'iconsax-react-native';
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
import {Colors} from '../../../theme';
import {WIDTH} from '../../../utils/config';
import Carousel from 'react-native-reanimated-carousel';
import {IcLegal, OmniNight} from '../../../theme/Images';
import Geolocation from 'react-native-geolocation-service';
import {currency} from '../../../utils/function';
import HeaderLeft from '../../molecules/Header/Left';
import {useNavigation} from '@react-navigation/native';

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
  const [distanceToSingsou, setDistanceToSingsou] = useState<number | null>(
    null,
  );

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
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
      <View>
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
          <TouchableOpacity onPress={onOpenSchedule}>
            <ArrowDown2 size={16} color={theme?.colors.ICON} />
          </TouchableOpacity>
        </Section>
      </View>
    );
  };

  const itemTag: any = [{name: 'LGBT'}, {name: 'EDM'}, {name: 'Rooftop'}];
  const navigation = useNavigation();
  return (
    <Layout>
      <HeaderLeft>
        <TouchableOpacity
          style={{marginTop: 15}}
          onPress={() => {
            navigation.goBack();
          }}>
          <ArrowLeft size={25} color={theme?.colors.ICON} />
        </TouchableOpacity>
      </HeaderLeft>
      <View className="flex-row items-center">
        <View style={{position: 'absolute', bottom: 10, left: 10, zIndex: 10}}>
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
        <Carousel
          loop
          width={WIDTH}
          height={WIDTH / 1.5}
          autoPlay={true}
          data={data?.photos}
          autoPlayInterval={5000}
          scrollAnimationDuration={100}
          renderItem={({item, index}: any) => (
            <TouchableOpacity
              activeOpacity={0.7}
              style={{alignSelf: 'center'}}
              onPress={onOpenGallery}>
              <Image
                resizeMode="cover"
                source={{uri: item.url}}
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
                      label={`${index + 1} / ${data?.photos?.length}`}
                    />
                  </View>
                </ScrollView>
              </Section>
            </TouchableOpacity>
          )}
        />
      </View>
      <Gap height={20} />
      <View className="flex-row">
        <Gap width={10} />
        <Image
          source={data?.logo ? {uri: data?.logo} : OmniNight}
          className="w-[100] h-[100]"
          resizeMode="cover"
        />
        <Gap width={20} />
        <View className="flex-1">
          <Section isRow isBetween>
            <TouchableOpacity
              activeOpacity={0.7}
              className="flex-row items-center mb-1">
              <GradientText
                colors={['#C800CC', '#A060FA']}
                style={{
                  fontSize: 24,
                  fontFamily: 'Inter-SemiBold',
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
            <Section style={{marginRight: 20, marginTop: -10}} isRow>
              {[1].map((star: number) => (
                <View key={`star_${star}`}>
                  <Star1 size={16} color="#EF9533" variant="Bold" />
                </View>
              ))}
              <Text label={`${data.rating.toString()}`} color="#A7B1C1" />
            </Section>
          </Section>
          {renderSchedule()}
          <Gap height={20} />
          {isPlaceDetail ? (
            <Section isRow>
              <View style={{width: 140}}>
                <TouchableOpacity
                  onPress={() => openMapDirection()}
                  activeOpacity={0.7}>
                  <Text
                    className=""
                    label={data.address.slice(0, 20) + '...'}
                  />
                </TouchableOpacity>
              </View>
              {distanceToSingsou !== null && (
                <Text
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
        </View>
      </View>
      <Gap height={15} />
    </Layout>
  );
};

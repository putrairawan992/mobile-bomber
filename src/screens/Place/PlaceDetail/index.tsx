/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  Call,
  Location,
  Share,
  Speaker,
  Video,
  WristClock,
} from 'iconsax-react-native';
import {Button, Gap, Layout, Section, Text} from '../../../components/atoms';
import {Header, HorizontalMenu} from '../../../components/molecules';
import {Image, ScrollView, View} from 'react-native';
import {PLACES_DATA, PLACE_MENU, PLACE_OVERVIEW} from '../../../utils/data';
import {
  PlaceInterface,
  PlaceOverviewFeaturesInterface,
  PlacePhotoInterface,
} from '../../../interfaces/PlaceInterface';
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParams} from '../../../navigation/MainScreenStack';
import {Star} from '../../../assets/icons';
import {randomNumber} from '../../../utils/function';
import styles from '../Styles';
import {useImageAspectRatio} from '../../../hooks/useImageAspectRatio';
import useTheme from '../../../theme/useTheme';
import {PlaceCard} from '../../../components/organism';

type Props = NativeStackScreenProps<MainStackParams, 'PlaceDetail', 'MyStack'>;
export const PlaceDetail = ({route, navigation}: Props) => {
  const placeId = route.params.placeId;
  const theme = useTheme();
  const [data, setData] = useState<PlaceInterface | undefined>(undefined);
  const [selectedMenu, setSelectedMenu] = useState<number>(1);
  const [dataSourceCords, setDataSourceCords] = useState([] as number[]);
  const [scrollToIndex, setScrollToIndex] = useState<number>(0);
  const [ref, setRef] = useState<ScrollView>();
  const aspectRatio = useImageAspectRatio(data?.logo as string);
  useEffect(() => {
    const getPlaceData = () => {
      if (placeId) {
        setData(
          PLACES_DATA.find((item: PlaceInterface) => item.id === placeId),
        );
      }
    };

    getPlaceData();
  }, [placeId]);

  const scrollHandler = (key: number) => {
    if (dataSourceCords.length > scrollToIndex) {
      ref?.scrollTo({
        x: 0,
        y: dataSourceCords[key], //we get the offset value from array based on key
        animated: true,
      });
    }
  };

  const PlaceOverview = () => {
    return (
      <Section
        key={1} //keys will be needed for function
        onLayout={(event: any) => {
          const layout = event.nativeEvent.layout;
          dataSourceCords[1] = layout.y; // we store this offset values in an array
        }}
        padding="12px 12px"
        backgroundColor={theme?.colors.SECTION}
        rounded={8}>
        <Text variant="base" fontWeight="bold" label={`About ${data?.name}`} />
        <Gap height={12} />
        <Text label={PLACE_OVERVIEW.about} textAlign="justify" />
        <Section padding="20px 0px">
          {PLACE_OVERVIEW.features.map(
            (item: PlaceOverviewFeaturesInterface) => {
              return (
                <Section key={item.title} isRow style={{marginBottom: 12}}>
                  {item.icon === 'rated' && (
                    <Speaker size={30} color={theme?.colors.ICON} />
                  )}
                  {item.icon === 'clothing' && (
                    <WristClock size={30} color={theme?.colors.ICON} />
                  )}
                  {item.icon === 'live' && (
                    <Video size={30} color={theme?.colors.ICON} />
                  )}
                  <Gap width={12} />
                  <Section>
                    <Text label={item.title} />
                    <Text
                      label={item.subtitle}
                      variant="extra-small"
                      color={theme?.colors.TEXT_SECONDARY}
                    />
                  </Section>
                </Section>
              );
            },
          )}
        </Section>
        <Text label={data?.address} />
        <Gap height={24} />
        <Section isRow>
          <Section isRow>
            <Location size={16} color={theme?.colors.ICON} />
            <Gap width={4} />
            <Text label="Get Direction" />
            <Gap width={12} />
            <Text label="|" color={theme?.colors.INACTIVE_TABS} />
            <Gap width={12} />
          </Section>
          <Section isRow>
            <Call size={16} color={theme?.colors.ICON} />
            <Gap width={4} />
            <Text label="Call" />
            <Gap width={12} />
            <Text label="|" color={theme?.colors.INACTIVE_TABS} />
            <Gap width={12} />
          </Section>
          <Section isRow>
            <Share size={16} color={theme?.colors.ICON} />
            <Gap width={4} />
            <Text label="Share" />
          </Section>
        </Section>
      </Section>
    );
  };

  const PlaceOffers = () => {
    return (
      <Section
        key={2}
        onLayout={(event: any) => {
          const layout = event.nativeEvent.layout;
          dataSourceCords[2] = layout.y;
        }}
        padding="12px 12px"
        backgroundColor={theme?.colors.SECTION}
        rounded={8}>
        <Section isRow isBetween>
          <Text variant="base" fontWeight="bold" label="Available Offers" />
          <Text label="See all offers" />
        </Section>
        <Gap height={12} />
        <Section isRow isBetween>
          <Image
            source={{
              uri: 'https://coconuts.co/wp-content/uploads/2018/09/Proof-free-flow.jpg',
            }}
            style={{width: 160, height: 160, borderRadius: 4}}
            resizeMode="contain"
          />
          <Image
            source={{
              uri: 'https://d1629ugb7moz2f.cloudfront.net/events/5103/NVYxTQZhhux64ZJHNCoaNVEswy0fUQ2b51ZxZUn6.jpg',
            }}
            style={{width: 160, height: 160, borderRadius: 4}}
            resizeMode="contain"
          />
        </Section>
      </Section>
    );
  };

  const PlacePhotos = () => {
    return (
      <Section
        key={3}
        onLayout={(event: any) => {
          const layout = event.nativeEvent.layout;
          dataSourceCords[3] = layout.y;
        }}
        padding="12px 12px"
        backgroundColor={theme?.colors.SECTION}
        rounded={8}>
        <Text variant="base" fontWeight="bold" label={`Inside ${data?.name}`} />
        <Gap height={12} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data?.photos.map((item: PlacePhotoInterface, idx: number) => {
            return (
              <Section key={`photo_${idx}`} style={{marginRight: 18}}>
                <View
                  style={{position: 'absolute', zIndex: 999, left: 6, top: 6}}>
                  <Image
                    source={{uri: item.url}}
                    style={{height: 120, width: 120}}
                  />
                </View>
                <Image
                  source={{
                    uri: `https://source.unsplash.com/random/600x600?sig=${randomNumber(
                      2,
                    )}`,
                  }}
                  style={{height: 120, width: 120}}
                />
                <Gap height={6} />
                <Text label={item.title} textAlign="center" />
              </Section>
            );
          })}
        </ScrollView>
      </Section>
    );
  };

  const PlaceReview = () => {
    return (
      <Section
        key={4}
        onLayout={(event: any) => {
          const layout = event.nativeEvent.layout;
          dataSourceCords[4] = layout.y;
        }}
        padding="12px 12px"
        backgroundColor={theme?.colors.SECTION}
        rounded={8}>
        <Section isRow isCenter>
          {[1, 2, 3, 4].map((item: number) => (
            <Star
              size={16}
              key={`star_${item}`}
              style={{marginHorizontal: 3}}
            />
          ))}
        </Section>
        <Gap height={4} />
        <Text
          label="I think its the best night club when visiting on Taipei, their stage is very awesome, food and beverages also good"
          textAlign="center"
        />
        <Gap height={24} />
        <Section isRow isCenter>
          <View style={styles.avatar} />
          <Gap width={4} />
          <Text label="Jin Wong" color={theme?.colors.WARNING} />
        </Section>
        <Gap height={12} />
        <Text label="See more" color="#666" textAlign="center" />
      </Section>
    );
  };
  const handleScroll = (event: any) => {
    const positionX = event.nativeEvent.contentOffset.x;
    const positionY = event.nativeEvent.contentOffset.y;
    const selectedIndex = dataSourceCords.findIndex(item => positionY < item);
    if (selectedIndex !== selectedMenu) {
      setSelectedMenu(selectedIndex - 1);
    }
  };
  return (
    <Layout contentContainerStyle={styles.container} isScrollable={false}>
      <Header transparent hasBackBtn style={{height: 70}} />
      <View style={styles.headerLogo}>
        <Image source={{uri: data?.logo}} style={{height: 56, aspectRatio}} />
      </View>
      {data && (
        <PlaceCard item={data} onSelect={() => undefined} isPlaceDetail />
      )}
      <Gap height={12} />
      <HorizontalMenu
        menu={PLACE_MENU}
        selectedMenu={selectedMenu}
        handleSelect={(id: number) => {
          scrollHandler(id);
          setTimeout(() => {
            setSelectedMenu(id);
          }, 500);
        }}
      />
      <Gap height={16} />
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={32}
        style={styles.section}
        // eslint-disable-next-line @typescript-eslint/no-shadow
        ref={ref => {
          setRef(ref as any);
        }}>
        {PlaceOverview()}
        <Gap height={32} />
        {PlaceOffers()}
        <Gap height={32} />
        {PlacePhotos()}
        <Gap height={32} />
        {PlaceReview()}
        <Gap height={16} />
        <Button
          type="primary"
          onPress={() => navigation.navigate('BookingTable', {placeId})}
          title="Booking Table"
        />
        <Gap height={8} />
        <Button
          type="outlined"
          onPress={() => navigation.navigate('BookingWalkIn', {placeId})}
          title="Walk In"
        />
        <Gap height={24} />
      </ScrollView>
    </Layout>
  );
};

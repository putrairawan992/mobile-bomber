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
import {
  Button,
  CustomShimmer,
  EntryAnimation,
  Gap,
  ItemShimmer,
  Layout,
  Section,
  Text,
} from '../../../components/atoms';
import {Header, HorizontalMenu} from '../../../components/molecules';
import {
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  OPERATIONAL_TIME_DATA,
  PLACES_DATA,
  PLACE_MENU,
  PLACE_OVERVIEW,
} from '../../../utils/data';
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
import {OperationalHoursSheet, PlaceCard} from '../../../components/organism';
import {navigationRef} from '../../../navigation/RootNavigation';
import BottomSheet, {BottomSheetModal} from '@gorhom/bottom-sheet';
import {Colors} from '../../../theme';
import CardPromo from '../../../components/molecules/Card/CardPromo';
import {ImgProductPromo, ImgProductPromo2} from '../../../theme/Images';
import {NightlifeService} from '../../../service/NightlifeService';
import reactotron from 'reactotron-react-native';
import {WIDTH} from '../../../utils/config';
import {dateFormatter} from '../../../utils/dateFormatter';

type Props = NativeStackScreenProps<MainStackParams, 'PlaceDetail', 'MyStack'>;
export const PlaceDetail = ({route, navigation}: Props) => {
  const placeData = route.params.placeData;
  const theme = useTheme();
  const [data, setData] = useState<PlaceInterface | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<number>(1);
  const [dataSourceCords, setDataSourceCords] = useState([] as number[]);
  const [scrollToIndex, setScrollToIndex] = useState<number>(0);
  const [ref, setRef] = useState<ScrollView>();
  const aspectRatio = useImageAspectRatio(data?.logo as string);
  const [sheetIndex, setSheetIndex] = React.useState<number>(-1);
  const placeDetailSheetRef = React.useRef<BottomSheetModal>(null);
  const snapPoints = React.useMemo(() => ['50'], []);

  const getPlaceData = async () => {
    try {
      setIsLoading(true);
      const response = await NightlifeService.getPlaceDetail({
        club_id: placeData?.clubId as string,
      });
      !!placeData && setData({...placeData, ...response.data});
      setIsLoading(false);
    } catch (error: any) {}
  };

  useEffect(() => {
    getPlaceData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollHandler = (key: number) => {
    if (dataSourceCords.length > scrollToIndex) {
      ref?.scrollTo({
        x: 0,
        y: dataSourceCords[key], //we get the offset value from array based on key
        animated: true,
      });
    }
  };

  const handleSheetChanges = React.useCallback((index: number) => {
    setSheetIndex(index);
  }, []);

  const PlaceOverview = () => {
    return (
      <>
        {isLoading ? (
          <Section
            padding="12px 12px"
            backgroundColor={theme?.colors.SECTION}
            rounded={8}>
            <ItemShimmer
              row={20}
              width="100%"
              height={24}
              style={{marginBottom: 16, borderRadius: 8}}
            />
          </Section>
        ) : (
          <EntryAnimation index={1}>
            <Section
              key={1} //keys will be needed for function
              onLayout={(event: any) => {
                const layout = event.nativeEvent.layout;
                dataSourceCords[1] = layout.y; // we store this offset values in an array
              }}
              padding="12px 12px"
              backgroundColor={theme?.colors.SECTION}
              rounded={8}>
              <Text
                variant="base"
                fontWeight="bold"
                label={`About ${data?.name}`}
              />
              <Gap height={12} />
              <Text label={data?.about} textAlign="justify" />
              <Section padding="20px 0px">
                {data?.features.map((item: PlaceOverviewFeaturesInterface) => {
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
                })}
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
          </EntryAnimation>
        )}
      </>
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
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigationRef.navigate('Offers' as never)}>
            <Text label="See all offers" />
          </TouchableOpacity>
        </Section>
        <Gap height={12} />
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <CardPromo
            image={ImgProductPromo}
            title="FREE FLOW"
            subtitle="SPENT WITH MINIMUM PURCHASE
            NT 40,000"
            headerClassName="self-end"
          />
          <CardPromo
            image={ImgProductPromo2}
            title="Disc up to 50%"
            subtitle="SPENT WITH MINIMUM PURCHASE
            NT 40,000"
            showLogo={false}
            contentClassName="flex-row-reverse px-3 py-3"
            imageClassName="w-[140] h-[116] absolute -bottom-10 -left-5"
            backgroundColors={['#071322', '#16102E', '#4D045B']}
          />
          <CardPromo isOther={true} />
        </ScrollView>
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
      {isLoading || !data ? (
        <CustomShimmer width={WIDTH} height={230} />
      ) : (
        <EntryAnimation index={0}>
          <PlaceCard
            item={data}
            onSelect={() => undefined}
            isPlaceDetail
            onOpenSchedule={() => placeDetailSheetRef.current?.present()}
            operation={data.operation.find(
              item => item.day === dateFormatter(new Date(), 'eeee'),
            )}
            onOpenGallery={() =>
              navigation.navigate('Gallery', {
                placeId: data.id,
                title: data.name,
              })
            }
          />
        </EntryAnimation>
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
          onPress={() =>
            navigation.navigate('BookingTable', {
              placeData: data ?? null,
            })
          }
          title="Booking Table"
        />
        <Gap height={8} />
        <Button
          type="outlined"
          onPress={() =>
            navigation.navigate('BookingWalkIn', {
              placeId: placeData?.id as string,
            })
          }
          title="Walk In"
        />
        <Gap height={24} />
      </ScrollView>
      <BottomSheetModal
        ref={placeDetailSheetRef}
        index={0}
        enablePanDownToClose
        snapPoints={snapPoints}
        backdropComponent={({style}) =>
          sheetIndex === 0 ? (
            <Pressable
              onPress={() => placeDetailSheetRef.current?.close()}
              style={[style, {backgroundColor: 'rgba(0, 0, 0, 0.60)'}]}
            />
          ) : (
            <></>
          )
        }
        handleStyle={{
          backgroundColor: theme?.colors.BACKGROUND1,
          borderTopRightRadius: 14,
          borderTopLeftRadius: 14,
        }}
        handleIndicatorStyle={{backgroundColor: Colors['black-70']}}
        onChange={handleSheetChanges}>
        {!!data && <OperationalHoursSheet data={data.operation} />}
      </BottomSheetModal>
    </Layout>
  );
};

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {Speaker, Video, WristClock} from 'iconsax-react-native';
import {
  Button,
  CustomShimmer,
  DefaultText,
  EntryAnimation,
  Gap,
  ItemShimmer,
  Layout,
  Section,
  Text,
} from '../../../components/atoms';
import {FlatList, Image, Pressable, ScrollView, View} from 'react-native';
import {
  PlaceInterface,
  PlaceOverviewFeaturesInterface,
} from '../../../interfaces/PlaceInterface';
import React, {createRef, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParams} from '../../../navigation/MainScreenStack';
import styles from '../Styles';
import {useImageAspectRatio} from '../../../hooks/useImageAspectRatio';
import useTheme from '../../../theme/useTheme';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {NightlifeService} from '../../../service/NightlifeService';
import {HEIGHT, WIDTH} from '../../../utils/config';
import {dateFormatter} from '../../../utils/dateFormatter';

import {PlaceCardSecond} from '../../../components/organism/Places/PlaceCardSecond';
import PagerView from 'react-native-pager-view';
import {placeDetailDummy} from '../../../theme/Images';
import {TabMenuSecond} from '../../../components/molecules/Menu/HorizontalMenuSecond';
import {Colors} from '../../../theme';
import {OperationalHoursSheet} from '../../../components/organism';
import Carousel from 'react-native-snap-carousel';

type Props = NativeStackScreenProps<
  MainStackParams,
  'PlaceDetailSecond',
  'MyStack'
>;
export const PlaceDetailSecond = ({route, navigation}: Props) => {
  const placeData = route?.params?.placeData;
  const ref = createRef<PagerView>();
  const snapPoints = React.useMemo(() => ['50'], []);
  const theme = useTheme();
  const [data, setData] = useState<PlaceInterface | undefined>(
    undefined,
  ) as any;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const aspectRatio = useImageAspectRatio(data?.logo as string);
  const placeDetailSheetRef = React.useRef<BottomSheetModal>(null);
  const [menu] = useState<string[]>(['Walk in Ticket', 'Booking Table']);
  const [initialPage, setInitialPage] = useState<number>(1);
  const [sheetIndex, setSheetIndex] = React.useState<number>(-1);

  const getPlaceData = async () => {
    try {
      setIsLoading(true);
      const response = await NightlifeService.getPlaceDetail({
        club_id: placeData?.clubId as string,
      });
      setData({...placeData, ...response.data});
      setIsLoading(false);
    } catch (error: any) {}
  };

  console.log('placeData?.clubId', data);

  useEffect(() => {
    getPlaceData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeData?.clubId]);

  const PlaceOverview = () => {
    return (
      <>
        {isLoading ? (
          <Section padding="12px 12px" rounded={8}>
            <ItemShimmer
              row={20}
              width="100%"
              height={24}
              style={{marginBottom: 16, borderRadius: 8}}
            />
          </Section>
        ) : (
          <EntryAnimation index={1}>
            <Section key={1} backgroundColor="#171717">
              <View
                style={{
                  padding: 16,
                  backgroundColor: '#262626',
                  borderBottomLeftRadius: 12,
                  borderBottomRightRadius: 12,
                }}>
                <Text label="Our Facilities" variant="medium" />
                {!data?.features?.length && (
                  <Text
                    color={Colors['gray-400']}
                    label="There are no facilities"
                  />
                )}
                <Gap height={12} />
                {data?.features.map(
                  (item: PlaceOverviewFeaturesInterface, idx: number) => {
                    return (
                      <Section
                        style={{marginLeft: 20}}
                        key={`facilities_${idx}`}
                        isRow
                        isCenter>
                        {item.icon === 'rated' && (
                          <Speaker size={26} color={theme?.colors.ICON} />
                        )}
                        {item.icon === 'clothing' && (
                          <WristClock size={26} color={theme?.colors.ICON} />
                        )}
                        {item.icon === 'live' && (
                          <Video size={26} color={theme?.colors.ICON} />
                        )}
                        <Section padding="12px 16px">
                          <Text
                            variant="medium"
                            style={{lineHeight: 28}}
                            label={item.title}
                          />
                          <Text
                            label={item.subtitle}
                            style={{width: 333}}
                            variant="small"
                            color={theme?.colors.TEXT_SECONDARY}
                          />
                        </Section>
                      </Section>
                    );
                  },
                )}
              </View>
              <Gap height={10} />
              <View style={{padding: 16, backgroundColor: '#171717'}}>
                <View className="flex-row items-center">
                  <DefaultText
                    title="Available offers"
                    titleClassName="font-inter-medium text-sm text-white-400 flex-1"
                  />
                  <DefaultText
                    title="See all offers"
                    titleClassName="font-inter-medium text-xs text-whie-400"
                  />
                </View>
                <Gap height={15} />
                <FlatList
                  data={[1, 2, 3, 4]}
                  windowSize={WIDTH}
                  keyExtractor={(_, key) => key.toString()}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({}) => (
                    <Image
                      resizeMode="contain"
                      source={placeDetailDummy}
                      style={{
                        width: WIDTH / 1.1,
                        height: 150,
                        marginLeft: -7,
                      }}
                    />
                  )}
                  contentContainerStyle={styles.orderContainer}
                />
                <Gap height={24} />
                <DefaultText
                  title="This month DJ"
                  titleClassName="font-inter-medium text-sm text-white-400"
                />
                <Gap height={12} />
                <Carousel
                  data={[1, 2, 3, 4, 5, 6, 7]}
                  renderItem={({}) => (
                    <View className="flex">
                      <Image
                        source={{
                          uri: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
                        }}
                        resizeMode="cover"
                        className="w-[56] h-[56] self-center rounded-full mb-1"
                      />
                      <DefaultText
                        title="DJ Wahyu"
                        titleClassName="self-center text-xs text-white-400"
                      />
                    </View>
                  )}
                  sliderWidth={WIDTH}
                  itemWidth={WIDTH / 5.6}
                  inactiveSlideOpacity={1}
                  inactiveSlideScale={1}
                  sliderHeight={HEIGHT}
                  activeSlideAlignment={'start'}
                  // onSnapToItem={i => setIndex(i)}
                />
                {/* <FlatList
                  data={[1, 2, 3, 4, 5, 6, 7]}
                  keyExtractor={(_, key) => key.toString()}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ }) => (
                    <View className="p-2 flex">
                      <Image
                        source={{
                          uri: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
                        }}
                        resizeMode="cover"
                        className="w-[56] h-[56] self-center rounded-full mb-1"
                      />
                      <DefaultText
                        title="DJ Wahyu"
                        titleClassName="font-inter-medium self-center text-xs text-white-400"
                      />
                    </View>
                  )}
                  contentContainerStyle={styles.orderContainer}
                /> */}
              </View>
            </Section>
          </EntryAnimation>
        )}
      </>
    );
  };

  const handleSheetChanges = React.useCallback((index: number) => {
    setSheetIndex(index);
  }, []);
  console.log(
    'data.operation===>',
    data?.operation,
    'data.formatter===>',
    dateFormatter(new Date(), 'eeee'),
  );

  return (
    <Layout contentContainerStyle={styles.container} isScrollable={false}>
      <ScrollView>
        {isLoading || !data ? (
          <CustomShimmer width={WIDTH} height={230} />
        ) : (
          <EntryAnimation index={0}>
            <PlaceCardSecond
              data={data}
              onSelect={() => undefined}
              isPlaceDetail
              onOpenSchedule={() => placeDetailSheetRef.current?.present()}
              operation={data.operation?.find(
                (item: {day: string}) =>
                  item.day === dateFormatter(new Date(), 'eeee'),
              )}
              onOpenGallery={() =>
                navigation.navigate('Gallery', {
                  placeId: data.clubId,
                  title: data.name,
                })
              }
            />
          </EntryAnimation>
        )}
        {PlaceOverview()}
      </ScrollView>

      <Section>
        <View className="flex-row">
          {menu.map((item, index) => {
            const isSelected = index === initialPage;
            return (
              <TabMenuSecond
                key={`menu_${index}`}
                onPress={idx =>
                  navigation.navigate(
                    isSelected ? 'BookingTable' : 'BookingWalkIn',
                    {placeData: data ? data : null},
                  )
                }
                isSelected={isSelected}
                width={WIDTH / menu.length}
                item={item}
                index={index}
              />
            );
          })}
        </View>
      </Section>

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

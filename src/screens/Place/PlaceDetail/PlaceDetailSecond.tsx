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
import {Header} from '../../../components/molecules';
import {Image, Pressable, ScrollView, View} from 'react-native';
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
import {WIDTH} from '../../../utils/config';
import {dateFormatter} from '../../../utils/dateFormatter';

import {PlaceCardSecond} from '../../../components/organism/Places/PlaceCardSecond';
import PagerView from 'react-native-pager-view';
import {placeDetailDummy} from '../../../theme/Images';
import {TabMenuSecond} from '../../../components/molecules/Menu/HorizontalMenuSecond';
import {Colors} from '../../../theme';
import {OperationalHoursSheet} from '../../../components/organism';

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
  const [data, setData] = useState<PlaceInterface | undefined>(undefined);
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
      !!placeData && setData({...placeData, ...response.data});
      setIsLoading(false);
    } catch (error: any) {}
  };

  useEffect(() => {
    getPlaceData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <Section
              style={{borderTopColor: '#2E2E2E', borderTopWidth: 1}}
              key={1}
              rounded={8}>
              <Section padding="12px 12px">
                <DefaultText title="Our Facilities" />
                <Gap height={12} />
                {!data?.features?.length && (
                  <Text
                    color={Colors['gray-400']}
                    label="There are no facilities"
                  />
                )}
                {data?.features.map(
                  (item: PlaceOverviewFeaturesInterface, idx: number) => {
                    return (
                      <Section
                        key={`facilities_${idx}`}
                        isRow
                        style={{marginBottom: 12}}>
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
                        <Section padding="12px 12px">
                          <Text label={item.title} />
                          <Text
                            label={item.subtitle}
                            style={{width: 333}}
                            variant="extra-small"
                            color={theme?.colors.TEXT_SECONDARY}
                          />
                        </Section>
                      </Section>
                    );
                  },
                )}
              </Section>
            </Section>
          </EntryAnimation>
        )}
      </>
    );
  };

  const handleSheetChanges = React.useCallback((index: number) => {
    setSheetIndex(index);
  }, []);
  return (
    <Layout contentContainerStyle={styles.container} isScrollable={false}>
      <ScrollView>
        <Header transparent hasBackBtn style={{height: 70}} />
        <View style={styles.headerLogo}>
          <Image source={{uri: data?.logo}} style={{height: 56, aspectRatio}} />
        </View>
        {isLoading || !data ? (
          <CustomShimmer width={WIDTH} height={230} />
        ) : (
          <EntryAnimation index={0}>
            <PlaceCardSecond
              data={data}
              onSelect={() => undefined}
              isPlaceDetail
              onOpenSchedule={() => placeDetailSheetRef.current?.present()}
              operation={data.operation.find(
                item => item.day === dateFormatter(new Date(), 'eeee'),
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

        <Gap height={16} />
        {PlaceOverview()}

        <Gap height={16} />
        <Section style={{flex: 1}}>
          <View>
            <Image
              source={placeDetailDummy}
              style={{width: '100%', height: 150}}
            />
          </View>
        </Section>
      </ScrollView>

      <Gap height={12} />
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

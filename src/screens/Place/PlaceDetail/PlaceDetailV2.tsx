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
import React, {useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  GestureResponderEvent,
  Image,
  PanResponder,
  PanResponderGestureState,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Star} from '../../../assets/icons';
import {Gap, Layout, Section, Text} from '../../../components/atoms';
import {HorizontalMenu} from '../../../components/molecules';
import {PlaceCard} from '../../../components/organism';
import {
  PlaceInterface,
  PlaceOverviewFeaturesInterface,
  PlacePhotoInterface,
} from '../../../interfaces/PlaceInterface';
import useTheme from '../../../theme/useTheme';
import {WIDTH} from '../../../utils/config';
import {PLACE_MENU, PLACE_OVERVIEW} from '../../../utils/data';
import {randomNumber} from '../../../utils/function';

const {width} = Dimensions.get('window');
const headerHeight = 300;
const headerFinalHeight = 70;
const imageSize = (headerHeight / 3) * 2;

export default function PlaceDetailV2() {
  const placeId = '2';
  const [data, setData] = useState<PlaceInterface | undefined>(undefined);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [textWidth, setTextWidth] = useState(0);
  const [selectedMenu, setSelectedMenu] = useState<number>(1);
  const [scrollToIndex, setScrollToIndex] = useState<number>(0);
  const [dataSourceCords, setDataSourceCords] = useState([] as number[]);
  const [ref, setRef] = useState<ScrollView>();
  const offset = headerHeight - headerFinalHeight;
  const theme = useTheme();

  // useEffect(() => {
  //   const getPlaceData = () => {
  //     if (placeId) {
  //       setData(
  //         PLACES_DATA.find((item: PlaceInterface) => item.id === placeId),
  //       );
  //     }
  //   };

  //   getPlaceData();
  // }, [placeId]);

  const scrollHandler = (key: number) => {
    if (dataSourceCords.length > scrollToIndex) {
      ref?.scrollTo({
        x: 0,
        y: dataSourceCords[key], //we get the offset value from array based on key
        animated: true,
      });
    }
  };

  const translateHeader = scrollY.interpolate({
    inputRange: [0, offset],
    outputRange: [0, -offset],
    extrapolate: 'clamp',
  });
  const translateImageY = scrollY.interpolate({
    inputRange: [0, offset],
    outputRange: [0, -(headerFinalHeight - headerHeight) / 8],
    extrapolate: 'clamp',
  });
  const translateCardY = scrollY.interpolate({
    inputRange: [0, offset],
    outputRange: [0, -20],
    extrapolate: 'clamp',
  });

  const translateImageX = scrollY.interpolate({
    inputRange: [0, offset],
    outputRange: [
      0,
      -(width / 2) + (imageSize * headerFinalHeight) / headerHeight,
    ],
    extrapolate: 'clamp',
  });
  const scaleImage = scrollY.interpolate({
    inputRange: [0, offset],
    outputRange: [1, headerFinalHeight / headerHeight],
    extrapolate: 'clamp',
  });
  const translateName = scrollY.interpolate({
    inputRange: [0, offset / 2, offset],
    outputRange: [0, 10, -width / 2 + textWidth / 2 + headerFinalHeight],
    extrapolate: 'clamp',
  });
  const scaleName = scrollY.interpolate({
    inputRange: [0, offset],
    outputRange: [1, 0.8],
    extrapolate: 'clamp',
  });

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

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

  PanResponder.create({
    onMoveShouldSetPanResponder: Platform.select({
      default: () => true,
      android: (e: GestureResponderEvent, state: PanResponderGestureState) =>
        Math.abs(state.dx) > 10 || Math.abs(state.dy) > 10,
    }),
  });
  return (
    <Layout contentContainerStyle={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}>
        {PlaceOverview()}
        <Gap height={32} />
        {PlaceOffers()}
        <Gap height={32} />
        {PlacePhotos()}
        <Gap height={32} />
        {PlaceReview()}
        <Gap height={16} />
      </ScrollView>
      <Animated.View
        pointerEvents="none"
        style={[styles.header, {transform: [{translateY: translateHeader}]}]}
        {...PanResponder}>
        <Animated.View
          style={[
            styles.image,
            {
              transform: [
                {translateY: translateCardY},
                // {translateX: translateImageX},
                // {scale: scaleImage},
              ],
            },
          ]}
          // {...PanResponder}
        >
          {/* {data && (
            <PlaceCard item={data} onSelect={() => undefined} isPlaceDetail />
          )} */}
        </Animated.View>
        <Animated.View
          style={[
            styles.horizontalMenu,
            {
              transform: [
                {translateY: translateImageY},
                // {translateX: translateImageX},
                // {scale: scaleImage},
              ],
            },
          ]}
          {...PanResponder}>
          {/* <TouchableOpacity
              onPress={() => console.log('jossss')}
              style={{zIndex: 1,height: 50, width: '100%', backgroundColor: 'red'}}
            >
              <View>
                <Text label="Submit" />
              </View>
            </TouchableOpacity> */}
          {/* <Section isRow padding="16px 16px" style={{flex: 1}}>
              {PLACE_MENU.map((item: HorizontalMenuInterface, i: number) => {
                let isSelected: boolean = Boolean(selectedMenu === item.id);
                return (
                  <TouchableOpacity
                    onPress={() => console.log('jpss :', item.id)}
                    key={i}>
                    <View
                      style={{
                        marginRight: 20,
                        width: 'auto',
                        borderBottomWidth: 2,
                        borderBottomColor: isSelected
                          ? theme?.colors.PRIMARY
                          : 'transparent',
                      }}>
                      <Text
                        label={item.title}
                        color={
                          isSelected
                            ? theme?.colors.PRIMARY
                            : theme?.colors.TEXT_PRIMARY
                        }
                      />
                      <Gap height={4} />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </Section> */}
          <HorizontalMenu
            menu={PLACE_MENU}
            selectedMenu={selectedMenu}
            handleSelect={(id: number) => {
              setSelectedMenu(id);
              scrollHandler(id);
            }}
          />
        </Animated.View>
      </Animated.View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    height: 100,
    marginBottom: 5,
    backgroundColor: 'grey',
    marginHorizontal: 10,
  },
  header: {
    height: headerHeight,
    backgroundColor: '#171717',
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    paddingTop: headerHeight + 5,
  },
  image: {
    height: 'auto',
    width: WIDTH,
    backgroundColor: '#171717',
    overflow: 'hidden',
  },
  horizontalMenu: {
    height: 'auto',
    width: WIDTH,
    backgroundColor: '#171717',
    // overflow: 'hidden',
  },
  img: {
    height: '100%',
    width: '100%',
  },
  name: {
    fontSize: 30,
    color: '#000',
    position: 'absolute',
    bottom: 0,
    height: headerFinalHeight,
    textAlignVertical: 'center',
    letterSpacing: 2,
  },
  avatar: {
    width: 32,
    height: 32,
    backgroundColor: '#D9D9D9',
    borderRadius: 50,
  },
});

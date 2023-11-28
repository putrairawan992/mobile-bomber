/* eslint-disable react-native/no-inline-styles */
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as React from 'react';
import {useEffect} from 'react';
import {Circle, Path, Svg} from 'react-native-svg';
import {
  Image,
  Pressable,
  StyleSheet,
  View,
  // Button,
  SafeAreaView,
  TouchableHighlight,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {Beer, Clock, DiscoLight, Karaoke, WineBottle} from '../assets/icons';
import {
  CustomShimmer,
  Gap,
  Layout,
  Section,
  TextInput,
  Loading,
  Text,
  TouchableSection,
  EntryAnimation,
  Button,
  DefaultText,
} from '../components/atoms';

import {Header, ModalToast, PillsGradient} from '../components/molecules';
import {PlaceCategory} from '../components/organism';
import {TopPlaces} from '../components/organism/Places/TopPlaces';
import {useCheckLocation} from '../hooks/useCheckLocation';
import {usePermission} from '../hooks/usePermission';
import {
  PlaceCategoryInterface,
  PlaceInterface,
} from '../interfaces/PlaceInterface';
import {
  LocationInterface,
  PlaceDetailInterface,
  UserLocationInterface,
} from '../interfaces/UserInterface';
import {MainStackParams} from '../navigation/MainScreenStack';
import {LocationService} from '../service/LocationService';
import {NightlifeService} from '../service/NightlifeService';
import {updateUserLocation} from '../store/user/userActions';
import useTheme from '../theme/useTheme';
import {WIDTH} from '../utils/config';
import styles from './Styles';
import {getUserProfile} from '../service/AuthService';
import {NotificationService} from '../service/NotificationService';
import {useAppSelector} from '../hooks/hooks';
import {useFocusEffect} from '@react-navigation/native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {Colors} from '../theme';
import {SelectLocationSheet} from '../components/organism/Location/SelectLocationSheet';
import {getStorage, setStorage} from '../service/mmkvStorage';
import {ModalToastContext} from '../context/AppModalToastContext';
import {COORDINATE_DATA} from '../utils/data';
import {ScrollView} from 'react-native-gesture-handler';

import SwiperFlatList from 'react-native-swiper-flatlist';
import OrderHomeTable from './OrderHomeTable';
import usePushNotification from '../hooks/usePostNotification';
import {TryBeverage} from '../components/organism/Places/TryBeverage';
import {NewestEvent} from '../components/organism/Places/NewestEvent';
import MapView from 'react-native-maps';
import {YourScheduleCard} from '../components/organism/Places/YourScheduleCard';
import {gradientMapping} from '../utils/config';
import {Text as Text2} from '../components/atoms/';
import {useKeyboardVisible} from '../hooks/useKeyboardVisible';
type Props = NativeStackScreenProps<MainStackParams, 'Nightlife', 'MyStack'>;

function NightlifeScreen({route, navigation}: Props) {
  const isKeyboardOpen = useKeyboardVisible();
  const mapRef = React.useRef<MapView>(null);
  const isOrder = route.params?.isOrder;

  const theme = useTheme();
  const [region, setRegion] = React.useState({
    latitudeDelta: 0.025,
    longitudeDelta: 0.025,
    latitude: 0.0,
    longitude: 0.0,
  });
  const {user, userLocation, fcmToken} = useAppSelector(state => state.user);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [banner, setBanner] = React.useState<any>([]);
  const [topFiveNightClub, setTopFiveNightClub] = React.useState<
    PlaceInterface[]
  >([]);
  const [bookingReminder, setBookingReminder] = React.useState<any>([]);
  const {isFineLocationGranted} = usePermission();
  const {currentLocation, getOneTimeLocation} = useCheckLocation();
  const [historySearchPlace, setHistorySearchPlace] = React.useState<
    PlaceDetailInterface[]
  >([]);
  const [historySelectPlace, setHistorySelectPlace] = React.useState<any[]>([]);
  const dispatch = useDispatch();
  const [sheetOrderIndex, setSheetOrderIndex] = React.useState<number>(-1);
  const [sheetIndex, setSheetIndex] = React.useState<number>(-1);
  const homeSheetOrderRef = React.useRef<BottomSheetModal>(null);
  const homeSheetRef = React.useRef<BottomSheetModal>(null);
  // const snapPoints = React.useMemo(() => ['60', '80', '90'], []);
  const [showMap, setShowMap] = React.useState<boolean>(false);
  const [currentLocationNow, setCurrentLocationNow] =
    React.useState<LocationInterface | null>(null);
  const [currentLocationTemp, setCurrentLocationTemp] =
    React.useState<LocationInterface | null>(null);
  const [currentLocationAwal, setCurrentLocationAwal] =
    React.useState<LocationInterface | null>(null);
  const [awal, setAwal] = React.useState<boolean>(false);
  // const srcIcon = "..\\assets\\images\\icon-location.png"
  const handleSheetOrderChanges = React.useCallback((index: number) => {
    setSheetOrderIndex(index);
  }, []);

  const handleSheetChanges = React.useCallback((index: number) => {
    setSheetIndex(index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const {
    isShowToast,
    setIsShowToast,
    toastMessage,
    setToastMessage,
    type,
    setType,
  } = React.useContext(ModalToastContext);
  const {
    requestUserPermission,
    getFCMToken,
    listenToBackgroundNotifications,
    listenToForegroundNotifications,
    onNotificationOpenedAppFromBackground,
    onNotificationOpenedAppFromQuit,
  } = usePushNotification();

  useEffect(() => {
    const listenToNotifications = () => {
      try {
        getFCMToken({userId: user.id, dispatch});
        requestUserPermission();
        onNotificationOpenedAppFromQuit();
        listenToBackgroundNotifications();
        listenToForegroundNotifications();
        onNotificationOpenedAppFromBackground();
      } catch (error) {
        console.log(error);
      }
    };

    listenToNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    requestUserPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLocation]);

  const openToast = (toastType: 'success' | 'error', message: string) => {
    setIsShowToast(true);
    setType(toastType);
    setToastMessage(message);
  };

  useFocusEffect(
    React.useCallback(() => {
      if (isOrder) {
        homeSheetOrderRef.current?.present();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOrder]),
  );

  useEffect(() => {
    if (isFineLocationGranted) {
      getOneTimeLocation();
    }
    fetchHistorySearchLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const actionShowPopUpOrders = () => {
    homeSheetOrderRef.current?.close();
    navigation.navigate('Nightlife', {isOrder: false});
  };

  const fetchNotification = async () => {
    try {
      await NotificationService.getInvitationNotification(user.id, dispatch);
      await NotificationService.getRequestFriendNotification(user.id, dispatch);
    } catch (error: any) {}
  };

  useEffect(() => {
    fetchData();
    dispatch(getUserProfile()); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function sendWelcomeNotification() {
      await NotificationService.pushNotification({
        target: fcmToken as string,
        title: 'Welcome to Bomber',
        body: 'Nightlife is coming !! 🥳🙌🏻🥂',
      });
    }

    if (fcmToken) {
      sendWelcomeNotification();
    }
  }, [fcmToken]);

  useFocusEffect(
    React.useCallback(() => {
      !!user && fetchNotification();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigation, user]),
  );

  const fetchData = async () => {
    try {
      setIsLoading(true);
      await Promise.all([
        NightlifeService.getTopFiveNightClub(),
        NightlifeService.getBanner({city_id: 1}),
        NightlifeService.getBookingReminder({
          customer_id: user.id,
        }),
        NightlifeService.getInvitedOrder({id: user.id}),
      ])
        .then(response => {
          setBookingReminder(response[2]?.data);
          console.log('response[2]', response[2]?.data?.booking, user.token);
          console.log('response[3]', response[3]);
          setTopFiveNightClub(
            response[0].data.map((item, idx) => {
              const latitude = COORDINATE_DATA[idx].latitude;
              const longitude = COORDINATE_DATA[idx].longitude;
              return {
                ...item,
                latitude,
                longitude,
              };
            }),
          );
          setBanner(response[1].data);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUserLocation = async () => {
      if (!currentLocationNow) {
        const location: UserLocationInterface =
          await LocationService.geocodeReverse({
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          });
        setRegion({
          latitudeDelta: 0.025,
          longitudeDelta: 0.025,
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
        });
        await setStorage(
          'historySelectLocation',
          JSON.stringify([...historySelectPlace, location]),
        );
        setUserLocation(location);
        if (!awal) {
          setCurrentLocationAwal({
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          });
        }
      } else {
        const location: UserLocationInterface =
          await LocationService.geocodeReverse({
            latitude: currentLocationNow.latitude,
            longitude: currentLocationNow.longitude,
          });
        await setStorage(
          'historySelectLocation',
          JSON.stringify([...historySelectPlace, location]),
        );
        setRegion({
          latitudeDelta: 0.025,
          longitudeDelta: 0.025,
          latitude: currentLocationNow.latitude,
          longitude: currentLocationNow.longitude,
        });
        setUserLocation(location);
        // console.log(location);
        if (!awal) {
          setCurrentLocationAwal({
            latitude: currentLocationNow.latitude,
            longitude: currentLocationNow.longitude,
          });
        }
      }
    };
    fetchUserLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocation, currentLocationNow]);

  const PLACE_CATEGORY: PlaceCategoryInterface[] = [
    {
      id: 'f34e130a-20df-465b-a119-f03889600cff',
      title: 'Nightclub',
      icon: <DiscoLight size={24} color={theme?.colors.ICON} />,
    },
    {
      id: 'ef8bd91f-9a39-41f3-8f7b-4324beceb02d',
      title: 'KTV',
      icon: <Karaoke size={24} color={theme?.colors.ICON} />,
    },
    {
      id: 'd9140fe7-7f99-439d-bf72-968351977a7b',
      title: 'Pregames',
      icon: <Beer size={24} color={theme?.colors.ICON} />,
    },
    {
      id: '79e0b4d2-c052-46b5-b8ea-4f80a761616d',
      title: 'Bar',
      icon: <WineBottle size={24} color={theme?.colors.ICON} />,
    },
  ];

  const onPlaceSelect = (id: string) =>
    navigation.navigate('PlaceDetailSecond', {
      placeData: topFiveNightClub.find(item => item.clubId === id) ?? null,
    });

  const fetchHistorySearchLocation = async () => {
    const historyData = await getStorage('historySearchLocation');
    const parseHistoryData = JSON.parse(historyData as string);
    if (parseHistoryData.length) {
      setHistorySearchPlace(parseHistoryData);
    }
  };

  const fetchHistorySelectLocation = async () => {
    const historyData = await getStorage('historySelectLocation');
    const parseHistoryData = JSON.parse(historyData as string);
    if (parseHistoryData.length) {
      setHistorySelectPlace(parseHistoryData);
    }
  };

  const handleSelectLocation = async (data: PlaceDetailInterface) => {
    const isExisting = Boolean(
      historySearchPlace.find(item => item.place_id === data.place_id),
    );
    if (isExisting) {
      const delDuplicate: any = historySearchPlace.filter(
        (el: any) => el.place_id !== data.place_id,
      );
      await setStorage(
        'historySearchLocation',
        JSON.stringify([...delDuplicate, data]),
      );
    } else {
      await setStorage(
        'historySearchLocation',
        JSON.stringify([...historySearchPlace, data]),
      );
    }
    homeSheetRef.current?.close();
    setUserLocation(data.location);
    setCurrentLocationNow({
      latitude: data.location.latitude,
      longitude: data.location.longitude,
    });
    setShowMap(false);
    setAwal(false);
    fetchHistorySearchLocation();
    openToast('success', 'Update location successfully');
  };

  const handleSelectMapLocation = async (data: any) => {
    const isExisting = Boolean(
      historySelectPlace.find(
        item =>
          item?.latitude === data.latitude &&
          item?.longitude === data.longitude,
      ),
    );
    if (isExisting) {
      const delDuplicate: any = historySelectPlace.filter(
        (el: any) =>
          el?.latitude !== data?.latitude && el?.longitude !== data.longitude,
      );
      await setStorage(
        'historySelectLocation',
        JSON.stringify([...delDuplicate, data]),
      );
    } else {
      await setStorage(
        'historySelectLocation',
        JSON.stringify([...historySearchPlace, data]),
      );
    }
    homeSheetRef.current?.close();
    setUserLocation(data.location);
    setCurrentLocationNow({
      latitude: data.location.latitude,
      longitude: data.location.longitude,
    });
    setShowMap(false);
    setAwal(false);
    fetchHistorySelectLocation();
    openToast('success', 'Update location successfully');
  };

  useEffect(() => {
    console.log('AWAL : ' + awal);
    console.log(
      'Location Awal :' +
        currentLocationAwal?.latitude +
        ' ' +
        currentLocationAwal?.longitude,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [awal]);

  useEffect(() => {
    console.log(
      'Location Awal :' +
        currentLocationAwal?.latitude +
        ' ' +
        currentLocationAwal?.longitude,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocationAwal]);

  useEffect(() => {
    console.log(region);
  }, [region]);

  const setUserLocation = async (location: UserLocationInterface) => {
    try {
      dispatch(updateUserLocation(location));
    } catch (error) {
      console.log('gagal');
    }
  };

  useEffect(() => {
    if (showMap) {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.setOptions({
        tabBarStyle: {
          height: 80,
          backgroundColor: theme?.colors.BACKGROUND2,
          borderTopColor: 'transparent',
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route, showMap]);

  return (
    <Layout contentContainerStyle={styles.container} isDisableKeyboardAware>
      {showMap ? (
        <View style={styless.map}>
          <MapView
            ref={mapRef}
            style={styless.map}
            initialRegion={region}
            onRegionChangeComplete={x => {
              setCurrentLocationTemp({
                latitude: x.latitude,
                longitude: x.longitude,
              });
              console.log(
                'onRegionChangeComplete',
                {
                  latitude: x.latitude,
                  longitude: x.longitude,
                },
                x,
              );
              setCurrentLocationNow(currentLocationTemp);
            }}
          />
          <View style={styless.markerFixed}>
            <Svg width={'33'} height={'33'} viewBox="0 0 33 33" fill="none">
              <Circle cx={'16.5'} cy={'16.5'} r={'16.5'} fill={'#AB5CFA'} />
              <Circle cx={'17'} cy={'16'} r={'3'} fill={'white'} />
            </Svg>
          </View>
          <View style={styless.markerFixed2}>
            <Svg width={'14'} height={'12'} viewBox="0 0 14 12" fill="none">
              <Path
                d="M6.16137 10.7088C6.55567 11.3159 7.44433 11.3159 7.83863 10.7088L13.7909 1.5447C14.223 0.879434 13.7456 0 12.9523 0H1.04771C0.254427 0 -0.22302 0.879434 0.209087 1.5447L6.16137 10.7088Z"
                fill={'#AB5CFA'}
              />
            </Svg>
          </View>
          <TouchableHighlight
            onPress={() => {
              mapRef.current?.animateToRegion({
                latitudeDelta: 0.025,
                longitudeDelta: 0.025,
                latitude: currentLocationAwal.latitude,
                longitude: currentLocationAwal.longitude,
              });
            }}>
            <View
              style={{
                position: 'absolute',
                backgroundColor: 'black',
                right: 10,
                bottom: 250,
              }}>
              <Svg width={'30'} height={'30'} viewBox="0 0 20 20" fill="none">
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.99935 4.79102C7.12287 4.79102 4.79102 7.12287 4.79102 9.99935C4.79102 12.8758 7.12287 15.2077 9.99935 15.2077C12.8758 15.2077 15.2077 12.8758 15.2077 9.99935C15.2077 7.12287 12.8758 4.79102 9.99935 4.79102ZM3.54102 9.99935C3.54102 6.43251 6.43251 3.54102 9.99935 3.54102C13.5662 3.54102 16.4577 6.43251 16.4577 9.99935C16.4577 13.5662 13.5662 16.4577 9.99935 16.4577C6.43251 16.4577 3.54102 13.5662 3.54102 9.99935Z"
                  fill={'#FCFCFC'}
                />
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10 15.209C10.3452 15.209 10.625 15.4888 10.625 15.834V17.5007C10.625 17.8458 10.3452 18.1257 10 18.1257C9.65482 18.1257 9.375 17.8458 9.375 17.5007V15.834C9.375 15.4888 9.65482 15.209 10 15.209Z"
                  fill={'#FCFCFC'}
                />
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.875 10C1.875 9.65482 2.15482 9.375 2.5 9.375H4.16667C4.51184 9.375 4.79167 9.65482 4.79167 10C4.79167 10.3452 4.51184 10.625 4.16667 10.625H2.5C2.15482 10.625 1.875 10.3452 1.875 10Z"
                  fill={'#FCFCFC'}
                />
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10 1.875C10.3452 1.875 10.625 2.15482 10.625 2.5V4.16667C10.625 4.51184 10.3452 4.79167 10 4.79167C9.65482 4.79167 9.375 4.51184 9.375 4.16667V2.5C9.375 2.15482 9.65482 1.875 10 1.875Z"
                  fill={'#FCFCFC'}
                />
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.209 10C15.209 9.65482 15.4888 9.375 15.834 9.375H17.5007C17.8458 9.375 18.1257 9.65482 18.1257 10C18.1257 10.3452 17.8458 10.625 17.5007 10.625H15.834C15.4888 10.625 15.209 10.3452 15.209 10Z"
                  fill={'#FCFCFC'}
                />
              </Svg>
            </View>
          </TouchableHighlight>

          <SafeAreaView style={styless.footer}>
            <Section
              padding="15px 16px"
              backgroundColor={theme?.colors.SHEET}
              style={{
                borderTopWidth: 1,
                borderTopColor: theme?.colors.SHEET,
              }}>
              {isLoading && <Loading />}
              <Gap height={15} />
              <Section isRow isBetween>
                <Text2
                  variant="base"
                  fontWeight="bold"
                  label={'Select delivery location'}
                  color={theme?.colors.WARNING}
                />
                <PillsGradient
                  colors={
                    gradientMapping[
                      'textPrimary' as keyof typeof gradientMapping
                    ].color
                  }
                  title="Edit Selection"
                  // icon={<MapsGradient size={20} />}
                  onSelectOnMap={() => {
                    setShowMap(false);
                    homeSheetRef.current?.present();
                  }}
                />
              </Section>
              <Gap height={30} />
              <Text
                label={'You current location'}
                color={Colors['warning-500']}
              />
              <Gap height={16} />
              <Section
                backgroundColor={theme?.colors.SHEET_CONTAINER}
                isRow
                padding="8px 12px"
                rounded={8}
                style={{marginBottom: 12}}>
                <>
                  <Svg width="33" height="33" viewBox="0 0 33 33" fill="none">
                    <Circle cx="16.5" cy="16.5" r="16.5" fill="#AB5CFA" />
                    <View
                      style={{
                        backgroundColor: '#FFF',
                        height: 6,
                        width: 6,
                        position: 'absolute',
                        left: 13,
                        top: 13,
                        borderRadius: 6,
                      }}
                    />
                  </Svg>
                  <Gap width={12} />
                  <Section style={{flex: 1}}>
                    <Text2
                      label={userLocation?.address}
                      fontWeight="bold"
                      color={Colors['white-100']}
                    />
                    <Gap height={4} />
                    <Text2
                      label={`${userLocation?.city}, ${userLocation?.country}`}
                      fontWeight="bold"
                      color={'#D8D8D8'}
                      variant="small"
                    />
                  </Section>
                </>
              </Section>
              <Gap height={12} />
              <Text label={'Recent location'} color={Colors['warning-500']} />
              <Gap height={16} />
              <ScrollView style={{maxHeight: 240, marginLeft: -12}} horizontal>
                {historySelectPlace?.map((item, idx) => (
                  <EntryAnimation index={idx}>
                    <TouchableSection
                      onPress={() => handleSelectMapLocation(item)}
                      backgroundColor={theme?.colors.SHEET_CONTAINER}
                      isRow
                      padding="8px 12px"
                      rounded={8}
                      style={{marginLeft: 12}}>
                      <>
                        <Clock color={Colors['white-100']} size={20} />
                        <Gap width={12} />
                        <Section style={{flex: 1}}>
                          <Text
                            label={item.city}
                            fontWeight="bold"
                            color={Colors['white-100']}
                          />
                          <Gap height={4} />
                          <Text
                            label={item.address}
                            fontWeight="bold"
                            color={'#D8D8D8'}
                            variant="small"
                          />
                        </Section>
                      </>
                    </TouchableSection>
                  </EntryAnimation>
                ))}
              </ScrollView>
              <Gap height={12} />
              <Button
                onPress={() => {
                  setCurrentLocationNow(currentLocationTemp);
                  fetchHistorySelectLocation();
                  setShowMap(false);
                  setAwal(false);
                  // openToast('success', 'Update location successfully');
                  homeSheetRef.current?.present();
                }}
                TextComponent={
                  <DefaultText title="Select" titleClassName="text-base" />
                }
                type="primary"
              />
            </Section>
          </SafeAreaView>
        </View>
      ) : (
        <ScrollView>
          {/* <EntryAnimation index={0}> */}
          <Header
            transparent
            hasLocation
            hasNotification
            hasLogo
            onLocationPress={() => {
              homeSheetRef.current?.present();

              setAwal(true);
            }}
            onNotificationPress={() => navigation.navigate('Notification')}
          />
          {/* </EntryAnimation> */}
          {/* <EntryAnimation index={1}> */}
          <Section padding="0px 16px" style={{marginBottom: 12}}>
            <TextInput
              textInputBackgroundColor="#323232"
              value={searchValue}
              onChangeText={(value: string) => setSearchValue(value)}
              placeholder="Search party"
              type="search"
              onFocus={() => navigation.navigate('Search')}
            />
          </Section>
          {/* </EntryAnimation> */}

          {/* <EntryAnimation index={2}> */}
          {isLoading ? (
            <CustomShimmer width={WIDTH} height={300} />
          ) : (
            <SwiperFlatList
              autoplay
              autoplayDelay={5}
              style={{width: WIDTH, height: 300}}
              autoplayLoop
              data={banner}
              renderItem={({item}) => (
                <Image
                  resizeMode="contain"
                  source={{
                    uri: item.imageUrl,
                  }}
                  style={{
                    width: WIDTH,
                    height: '100%',
                  }}
                />
              )}
            />
          )}
          {/* </EntryAnimation> */}
          {bookingReminder?.booking?.length > 0 && <Gap height={22} />}
          {bookingReminder?.booking?.length > 0 && (
            <YourScheduleCard
              userLocation={userLocation}
              title="Your schedule"
              data={bookingReminder?.booking}
              itemWidthStyle
              fullSliderWidth
              onSelect={onPlaceSelect}
            />
          )}
          <Gap height={22} />
          {/* <EntryAnimation index={3}> */}
          <PlaceCategory
            title="Explore nightclub in Taiwan"
            data={PLACE_CATEGORY}
            onSelect={data =>
              navigation.navigate('PlaceByCategory', {category: data})
            }
          />
          {/* </EntryAnimation> */}

          {/* <Spacer llxx />
        <EntryAnimation index={4}>
          <UserAchievement data={USER_ACHIEVEMENT} />
        </EntryAnimation> */}
          <Gap height={22} />
          {topFiveNightClub?.length ? (
            <TopPlaces
              userLocation={userLocation}
              title="Top 5 Night Club this Week"
              data={topFiveNightClub}
              itemWidthStyle
              fullSliderWidth
              onSelect={onPlaceSelect}
            />
          ) : (
            <></>
          )}
          <Gap height={22} />
          <TryBeverage
            userLocation={userLocation}
            title="Must try beverage"
            data={topFiveNightClub}
            itemWidthStyle
            fullSliderWidth
            onSelect={onPlaceSelect}
          />
          <Gap height={22} />
          <NewestEvent
            userLocation={userLocation}
            title="Newst event"
            data={topFiveNightClub}
            itemWidthStyle
            fullSliderWidth
            onSelect={onPlaceSelect}
          />
          <Gap height={22} />
        </ScrollView>
      )}

      <BottomSheetModal
        ref={homeSheetRef}
        index={0}
        enablePanDownToClose
        snapPoints={isKeyboardOpen ? ['90%'] : ['50', '70', '90']}
        backdropComponent={({style}) =>
          sheetIndex >= 0 ? (
            <Pressable
              onPress={() => homeSheetRef.current?.close()}
              style={[style, {backgroundColor: 'rgba(0, 0, 0, 0.60)'}]}
            />
          ) : (
            <></>
          )
        }
        handleStyle={{
          backgroundColor: theme?.colors.SHEET,
          borderTopRightRadius: 14,
          borderTopLeftRadius: 14,
        }}
        handleIndicatorStyle={{backgroundColor: Colors['black-70']}}
        onChange={handleSheetChanges}>
        <SelectLocationSheet
          history={historySearchPlace}
          onSelectLocation={handleSelectLocation}
          onSelectMap={() => {
            setShowMap(true);
            // SetLagiBukaMap(true)

            homeSheetRef.current?.close();
          }}
        />
      </BottomSheetModal>
      <BottomSheetModal
        ref={homeSheetOrderRef}
        index={0}
        enablePanDownToClose
        snapPoints={['30%']}
        backdropComponent={({style}) =>
          sheetOrderIndex >= 0 ? (
            <Pressable
              onPress={() => homeSheetOrderRef.current?.close()}
              style={[style, {backgroundColor: 'rgba(0, 0, 0, 0.60)'}]}
            />
          ) : (
            <></>
          )
        }
        handleStyle={{
          backgroundColor: theme?.colors.SHEET,
          borderTopRightRadius: 14,
          borderTopLeftRadius: 14,
        }}
        handleIndicatorStyle={{backgroundColor: Colors['black-70']}}
        onChange={handleSheetOrderChanges}>
        <OrderHomeTable
          navigation={navigation}
          actionShowPopUpOrders={actionShowPopUpOrders}
        />
      </BottomSheetModal>
      <ModalToast
        isVisible={isShowToast}
        onCloseModal={() => setIsShowToast(false)}
        message={toastMessage}
        type={type}
      />
    </Layout>
  );
}
const styless = StyleSheet.create({
  map: {
    flex: 1,
  },
  markerFixed: {
    left: '50%',
    marginLeft: -20,
    marginTop: -70,
    position: 'absolute',
    top: '50%',
  },
  markerFixed2: {
    left: '50%',
    marginLeft: -10,
    marginTop: -190,
    position: 'absolute',
    top: '70%',
  },
  marker: {
    height: 48,
    width: 48,
  },
  footer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
  region: {
    color: '#fff',
    lineHeight: 20,
    margin: 20,
  },
  currentLocation: {
    right: '10',
    marginLeft: -10,
    marginTop: -173,
    position: 'absolute',
  },
});
export default NightlifeScreen;

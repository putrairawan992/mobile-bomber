/* eslint-disable react-native/no-inline-styles */
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { useEffect } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View, useWindowDimensions, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { Beer, DiscoLight, Karaoke, WineBottle } from '../assets/icons';
import {
  CustomShimmer,
  Gap,
  Layout,
  Section,
  Spacer,
  TextInput,
} from '../components/atoms';

import { Header, ModalToast } from '../components/molecules';
import { PlaceCategory } from '../components/organism';
import { TopPlaces } from '../components/organism/Places/TopPlaces';
import { useCheckLocation } from '../hooks/useCheckLocation';
import { usePermission } from '../hooks/usePermission';
import {
  PlaceCategoryInterface,
  PlaceInterface,
} from '../interfaces/PlaceInterface';
import {
  LocationInterface,
  PlaceDetailInterface,
  UserLocationInterface,
} from '../interfaces/UserInterface';
import{ MainStackParams } from '../navigation/MainScreenStack';
import { LocationService } from '../service/LocationService';
import { NightlifeService } from '../service/NightlifeService';
import { updateUserLocation } from '../store/user/userActions';
import useTheme from '../theme/useTheme';
import { WIDTH } from '../utils/config';
import styles from './Styles';
import { getUserProfile } from '../service/AuthService';
import { NotificationService } from '../service/NotificationService';
import { useAppSelector } from '../hooks/hooks';
import { useFocusEffect } from '@react-navigation/native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Colors } from '../theme';
import { SelectLocationSheet } from '../components/organism/Location/SelectLocationSheet';
import { getStorage, setStorage } from '../service/mmkvStorage';
import { ModalToastContext } from '../context/AppModalToastContext';
import { COORDINATE_DATA } from '../utils/data';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Carousel from 'react-native-reanimated-carousel';
import OrderHomeTable from './OrderHomeTable';
import usePushNotification from '../hooks/usePostNotification';
import { TryBeverage } from '../components/organism/Places/TryBeverage';
import { NewestEvent } from '../components/organism/Places/NewestEvent';
import MapView from 'react-native-maps';
import { YourScheduleCard } from '../components/organism/Places/YourScheduleCard';
type Props = NativeStackScreenProps<MainStackParams, 'Nightlife', 'MyStack'>;

function NightlifeScreen({ route, navigation }: Props) {
  const isOrder = route.params?.isOrder;
  const theme = useTheme();
  const { user, userLocation, fcmToken } = useAppSelector(state => state.user);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [banner, setBanner] = React.useState<string>('');
  const [topFiveNightClub, setTopFiveNightClub] = React.useState<
    PlaceInterface[]
  >([]);
  const { isFineLocationGranted } = usePermission();
  const { currentLocation, getOneTimeLocation } = useCheckLocation();
  const [historySearchPlace, setHistorySearchPlace] = React.useState<
    PlaceDetailInterface[]
  >([]);
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const [sheetOrderIndex, setSheetOrderIndex] = React.useState<number>(-1);
  const [sheetIndex, setSheetIndex] = React.useState<number>(-1);
  const homeSheetOrderRef = React.useRef<BottomSheetModal>(null);
  const homeSheetRef = React.useRef<BottomSheetModal>(null);
  const snapPoints = React.useMemo(() => ['60', '80', '90'], []);
  const [showMap, setShowMap] = React.useState<boolean>(false);
  const [lagiBukaMap, SetLagiBukaMap] = React.useState<boolean>(false);
  const [currentLocationNow, setCurrentLocationNow] = React.useState<LocationInterface | null>(null);
  const [currentLocationTemp, setCurrentLocationTemp] = React.useState<LocationInterface | null>(null);
 // const srcIcon = "..\\assets\\images\\icon-location.png"
  const handleSheetOrderChanges = React.useCallback((index: number) => {
    setSheetOrderIndex(index);
  }, []);
  const handleSheetChanges = React.useCallback((index: number) => {
    // console.log('handleSheetChanges', index);
    setSheetIndex(index);
    if (lagiBukaMap==false){
      if (index == -1) {
        setShowMap(false)
      }
      
    }
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
        getFCMToken({ userId: user.id, dispatch });
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

  useEffect(() => {
    if (isOrder) {
      homeSheetOrderRef.current?.present();
    }
    if (isFineLocationGranted) {
      getOneTimeLocation();
    }
    fetchHistorySearchLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOrder]);

  const actionShowPopUpOrders = () => {
    homeSheetOrderRef.current?.forceClose();
    navigation.navigate('Nightlife');
  };

  const fetchNotification = async () => {
    try {
      await NotificationService.getInvitationNotification(user.id, dispatch);
      await NotificationService.getRequestFriendNotification(user.id, dispatch);
    } catch (error: any) { }
  };

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
  }, [fcmToken, showMap]);

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
        NightlifeService.getBanner({ city_id: 1 }),
      ])
        .then(response => {
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
          setBanner(response[1].data[0].imageUrl);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => { setIsLoading(false);});
    } catch (error: any) {
      console.log(error)
    }
  };
  useEffect(() => {
    const fetchUserLocation = async () => {
      // console.log(currentLocationNow)
      if (!currentLocationNow) {
        const location: UserLocationInterface =
          await LocationService.geocodeReverse({
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          });
        setUserLocation(location);
      }
      else {
        const location: UserLocationInterface =
          await LocationService.geocodeReverse({
            latitude: currentLocationNow.latitude,
            longitude: currentLocationNow.longitude,
          });
        // console.log(location)
        setUserLocation(location);
      }
    };
    fetchUserLocation();
    fetchData();
    dispatch(getUserProfile());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocation, showMap, currentLocationNow]);

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
      longitude: data.location.longitude
    })
    // console.log(currentLocationNow)
    // setCurrentLocation({ latitude: data.location.latitude, longitude: data.location.longitude },)
    // console.log(data.location)
    setShowMap(false)
    fetchHistorySearchLocation();
    openToast('success', 'Update location successfully');
  };

  const setUserLocation = (location: UserLocationInterface) => {
    try {
      dispatch(updateUserLocation(location));
    }
    catch (error) {
      console.log("gagal")
    }
  }

  useEffect(() => {
    console.log(lagiBukaMap)
  }, [lagiBukaMap])

  useEffect(() => {
    console.log(currentLocationTemp)
  }, [currentLocationTemp])

  return (
    <Layout contentContainerStyle={styles.container} isDisableKeyboardAware>
      {showMap ? (<View style={styless.map}>
        <MapView
          style={styless.map}
          initialRegion={
            {
              latitudeDelta: 0.025,
              longitudeDelta: 0.025,
              latitude: currentLocationNow ? currentLocationNow.latitude : currentLocation.latitude,
              longitude: currentLocationNow ? currentLocationNow.longitude : currentLocation.longitude,
            }
          }

          onRegionChangeComplete={x => {
            setCurrentLocationTemp({
              latitude: x.latitude,
              longitude: x.longitude
            })
          }}
        />
        <View style={styless.markerFixed}>
          <Image source={require('../assets/images/icon-location.png')} style={styless.marker} />
        </View>
        {lagiBukaMap ? (<Button
          onPress={() => { 
            setCurrentLocationNow(currentLocationTemp) 
            setShowMap(false)
            SetLagiBukaMap(false)
          }}
          title="Next"
          color="#841584"
        />) : <></>}
        
      </View>

      ) : (<ScrollView>
        {/* <EntryAnimation index={0}> */}
          <Header
            transparent
            hasLocation
            hasNotification
            hasLogo
            onLocationPress={() => {
              setShowMap(true)
              homeSheetRef.current?.present();
            }}
            onNotificationPress={() => navigation.navigate('Notification')
            }
          />
        {/* </EntryAnimation> */}
        {/* <EntryAnimation index={1}> */}
          <Section padding="0px 16px" style={{ marginBottom: 12 }}>
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
          {isLoading || !banner ? (
            <CustomShimmer width={WIDTH} height={WIDTH} />
          ) : (
            <Carousel
              loop={false}
              width={width}
              height={width}
              autoPlay={true}
              autoPlayInterval={5000}
              data={[1, 2, 3, 4]}
              scrollAnimationDuration={100}
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              renderItem={({ item }: any) => (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{ alignSelf: 'center' }}>
                  <Image
                    resizeMode="cover"
                    source={{
                      uri: banner,
                    }}
                    style={{
                      width: WIDTH,
                      height: WIDTH,
                    }}
                  />
                </TouchableOpacity>
              )}
            />
          )}
        {/* </EntryAnimation> */}
        <Spacer sm />
        <YourScheduleCard
            userLocation={userLocation}
            title="Your schedule"
            data={topFiveNightClub}
            itemWidthStyle
            fullSliderWidth
            onSelect={onPlaceSelect}
          />
        <Spacer sm />
        {/* <EntryAnimation index={3}> */}
          <PlaceCategory
            title="Find Best Place"
            data={PLACE_CATEGORY}
            onSelect={data =>
              navigation.navigate('PlaceByCategory', { category: data })
            }
          />
        {/* </EntryAnimation> */}


        {/* <Spacer llxx />
        <EntryAnimation index={4}>
          <UserAchievement data={USER_ACHIEVEMENT} />
        </EntryAnimation> */}
        <Gap height={32} />
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
        <Gap height={32} />
        <TryBeverage
          userLocation={userLocation}
          title="Must try beverage"
          data={topFiveNightClub}
          itemWidthStyle
          fullSliderWidth
          onSelect={onPlaceSelect}
        />
        <Gap height={32} />
        <NewestEvent
          userLocation={userLocation}
          title="Newst event"
          data={topFiveNightClub}
          itemWidthStyle
          fullSliderWidth
          onSelect={onPlaceSelect}
        />
        <Gap height={32} />
      </ScrollView>)}

      <BottomSheetModal
        ref={homeSheetRef}
        index={0}
        enablePanDownToClose
        snapPoints={isOrder ? ['40%'] : ['40%', '60%', '80%', '90%']}
        backdropComponent={({ style }) =>
          sheetIndex >= 0 ? (
            <Pressable
              onPress={() => homeSheetRef.current?.close()}
              style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.60)' }]}
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
        handleIndicatorStyle={{ backgroundColor: Colors['black-70'] }}
        onChange={handleSheetChanges}>
        <SelectLocationSheet
          history={historySearchPlace}
          onSelectLocation={handleSelectLocation}
          onSelectMap={() => {
            SetLagiBukaMap(true)
            homeSheetRef.current?.close()
          }}
        />
      </BottomSheetModal>
      <BottomSheetModal
        ref={homeSheetOrderRef}
        index={0}
        enablePanDownToClose
        snapPoints={isOrder ? ['40%'] : snapPoints}
        backdropComponent={({ style }) =>
          sheetOrderIndex >= 0 ? (
            <Pressable
              onPress={() => homeSheetOrderRef.current?.close()}
              style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.60)' }]}
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
        handleIndicatorStyle={{ backgroundColor: Colors['black-70'] }}
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
    flex: 1
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%'
  },
  marker: {
    height: 48,
    width: 48
  },
  footer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: 0,
    position: 'absolute',
    width: '100%'
  },
  region: {
    color: '#fff',
    lineHeight: 20,
    margin: 20
  }
})
export default NightlifeScreen;

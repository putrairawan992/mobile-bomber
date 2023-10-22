/* eslint-disable react-native/no-inline-styles */
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as React from 'react';
import {useContext, useEffect} from 'react';
import {Image, Pressable, ScrollView, useWindowDimensions} from 'react-native';
import {useDispatch} from 'react-redux';
import {Beer, DiscoLight, Karaoke, WineBottle} from '../assets/icons';
import {
  CustomShimmer,
  EntryAnimation,
  Gap,
  Layout,
  Section,
  Spacer,
  TextInput,
} from '../components/atoms';

import {Header, ModalToast} from '../components/molecules';
import {PlaceCategory} from '../components/organism';
import {TopPlaces} from '../components/organism/Places/TopPlaces';
import {useCheckLocation} from '../hooks/useCheckLocation';
import {usePermission} from '../hooks/usePermission';
import {
  PlaceCategoryInterface,
  PlaceInterface,
} from '../interfaces/PlaceInterface';
import {
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
import {TouchableOpacity} from 'react-native-gesture-handler';
import Carousel from 'react-native-reanimated-carousel';
import OrderHomeTable from './OrderHomeTable';
import usePushNotification from '../hooks/usePostNotification';

type Props = NativeStackScreenProps<MainStackParams, 'Nightlife', 'MyStack'>;

function NightlifeScreen({route, navigation}: Props) {
  const isOrder = route.params?.isOrder;
  const theme = useTheme();
  const {user, userLocation, fcmToken} = useAppSelector(state => state.user);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [banner, setBanner] = React.useState<string>('');
  const [topFiveNightClub, setTopFiveNightClub] = React.useState<
    PlaceInterface[]
  >([]);
  const {isFineLocationGranted} = usePermission();
  const {currentLocation, getOneTimeLocation} = useCheckLocation();
  const [historySearchPlace, setHistorySearchPlace] = React.useState<
    PlaceDetailInterface[]
  >([]);
  const dispatch = useDispatch();
  const {width} = useWindowDimensions();
  const [sheetIndex, setSheetIndex] = React.useState<number>(-1);
  const homeSheetRef = React.useRef<BottomSheetModal>(null);
  const [isOrderShow, setIsOrderShow] = React.useState<boolean>(false);
  const snapPoints = React.useMemo(() => ['60', '80', '90'], []);
  const handleSheetChanges = React.useCallback((index: number) => {
    setSheetIndex(index);
  }, []);
  const {
    isShowToast,
    setIsShowToast,
    toastMessage,
    setToastMessage,
    type,
    setType,
  } = useContext(ModalToastContext);

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

  useEffect(() => {
    if (isOrder) {
      setIsOrderShow(true);
      homeSheetRef.current?.present();
    }
    if (isFineLocationGranted) {
      getOneTimeLocation();
    }
    fetchHistorySearchLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOrder, isOrderShow]);

  const actionShowPopUpOrders = () => {
    homeSheetRef.current?.forceClose();
  };

  const fetchNotification = async () => {
    try {
      await NotificationService.getInvitationNotification(user.id, dispatch);
      await NotificationService.getRequestFriendNotification(user.id, dispatch);
    } catch (error: any) {}
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
        .finally(() => setIsLoading(false));
    } catch (error: any) {}
  };

  useEffect(() => {
    const fetchUserLocation = async () => {
      if (currentLocation) {
        const location: UserLocationInterface =
          await LocationService.geocodeReverse({
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          });
        setUserLocation(location);
      }
    };

    fetchUserLocation();
    fetchData();
    dispatch(getUserProfile());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocation]);

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
    fetchHistorySearchLocation();
    openToast('success', 'Update location successfully');
  };

  const setUserLocation = (location: UserLocationInterface) =>
    dispatch(updateUserLocation(location));

  return (
    <Layout contentContainerStyle={styles.container} isDisableKeyboardAware>
      <ScrollView>
        <EntryAnimation index={0}>
          <Header
            transparent
            hasLocation
            hasNotification
            hasLogo
            onLocationPress={() => homeSheetRef.current?.present()}
            onNotificationPress={() => navigation.navigate('Notification')}
          />
        </EntryAnimation>
        <EntryAnimation index={1}>
          <Section padding="0px 16px" style={{marginBottom: 12}}>
            <TextInput
              value={searchValue}
              onChangeText={(value: string) => setSearchValue(value)}
              placeholder="Search party"
              type="search"
              onFocus={() => navigation.navigate('Search')}
            />
          </Section>
        </EntryAnimation>

        <EntryAnimation index={2}>
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
              renderItem={({item}: any) => (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{alignSelf: 'center'}}>
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
        </EntryAnimation>
        <Spacer sm />
        <EntryAnimation index={3}>
          <PlaceCategory
            title="Find Best Place"
            data={PLACE_CATEGORY}
            onSelect={data =>
              navigation.navigate('PlaceByCategory', {category: data})
            }
          />
        </EntryAnimation>
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
      </ScrollView>
      <BottomSheetModal
        ref={homeSheetRef}
        index={0}
        enablePanDownToClose
        snapPoints={isOrder ? ['28%'] : snapPoints}
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
        {isOrder && isOrderShow ? (
          <OrderHomeTable
            navigation={navigation}
            actionShowPopUpOrders={actionShowPopUpOrders}
          />
        ) : (
          <SelectLocationSheet
            history={historySearchPlace}
            onSelectLocation={handleSelectLocation}
          />
        )}
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

export default NightlifeScreen;

/* eslint-disable react-native/no-inline-styles */
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as React from 'react';
import {useContext, useEffect} from 'react';
import {Image, Pressable, ScrollView} from 'react-native';
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
import {UserAchievement} from '../components/organism/User/UserAchievement';
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
import {USER_ACHIEVEMENT} from '../utils/data';
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

type Props = NativeStackScreenProps<MainStackParams, 'Nightlife', 'MyStack'>;

function NightlifeScreen({navigation}: Props) {
  const theme = useTheme();
  const {user} = useAppSelector(state => state.user);
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

  const [sheetIndex, setSheetIndex] = React.useState<number>(-1);
  const homeSheetRef = React.useRef<BottomSheetModal>(null);
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

  const openToast = (toastType: 'success' | 'error', message: string) => {
    setIsShowToast(true);
    setType(toastType);
    setToastMessage(message);
  };

  useEffect(() => {
    if (isFineLocationGranted) {
      getOneTimeLocation();
    }
    fetchHistorySearchLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchNotification = async () => {
    try {
      await NotificationService.getInvitationNotification(user.id, dispatch);
      await NotificationService.getRequestFriendNotification(user.id, dispatch);
    } catch (error: any) {}
  };

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
          setTopFiveNightClub(response[0].data);
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
      id: 'nightclub',
      title: 'Nightclub',
      icon: <DiscoLight size={24} color={theme?.colors.ICON} />,
    },
    {
      id: 'karaoke',
      title: 'Karaoke',
      icon: <Karaoke size={24} color={theme?.colors.ICON} />,
    },
    {
      id: 'pregames',
      title: 'Pregames',
      icon: <Beer size={24} color={theme?.colors.ICON} />,
    },
    {
      id: 'bar',
      title: 'Bar',
      icon: <WineBottle size={24} color={theme?.colors.ICON} />,
    },
  ];

  const onPlaceSelect = (id: string) =>
    navigation.navigate('PlaceDetail', {
      placeData:
        topFiveNightClub.find(item => item.id.toString() === id.toString()) ??
        null,
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
    <Layout contentContainerStyle={styles.container}>
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
          <Section padding="12px 16px">
            <TextInput
              value={searchValue}
              onChangeText={(value: string) => setSearchValue(value)}
              placeholder="Search party"
              type="search"
            />
          </Section>
        </EntryAnimation>

        <EntryAnimation index={2}>
          {isLoading || !banner ? (
            <CustomShimmer width={WIDTH} height={WIDTH} />
          ) : (
            <Image
              source={{
                uri: banner,
              }}
              style={{
                width: WIDTH,
                height: WIDTH,
              }}
            />
          )}
        </EntryAnimation>
        <Spacer sm />
        <EntryAnimation index={3}>
          <PlaceCategory title="Find Best Place" data={PLACE_CATEGORY} />
        </EntryAnimation>
        <Spacer llxx />
        <EntryAnimation index={4}>
          <UserAchievement data={USER_ACHIEVEMENT} />
        </EntryAnimation>
        <Gap height={32} />
        {topFiveNightClub?.length ? (
          <TopPlaces
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
        snapPoints={snapPoints}
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

export default NightlifeScreen;

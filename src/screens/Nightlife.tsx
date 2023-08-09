import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as React from 'react';
import {useEffect} from 'react';
import {Image, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import {Beer, DiscoLight, Karaoke, WineBottle} from '../assets/icons';
import {
  EntryAnimation,
  Gap,
  Layout,
  Section,
  Spacer,
  TextInput,
} from '../components/atoms';

import {Header} from '../components/molecules';
import {PlaceCategory} from '../components/organism';
import {TopPlaces} from '../components/organism/Places/TopPlaces';
import {UserAchievement} from '../components/organism/User/UserAchievement';
import {useCheckLocation} from '../hooks/useCheckLocation';
import {usePermission} from '../hooks/usePermission';
import {PlaceCategoryInterface} from '../interfaces/PlaceInterface';
import {UserLocationInterface} from '../interfaces/UserInterface';
import {NightlifeStackParams} from '../navigation/MainScreenStack';
import {LocationService} from '../service/LocationService';
import {updateUserLocation} from '../store/user/userActions';
import useTheme from '../theme/useTheme';
import {WIDTH} from '../utils/config';
import {PLACES_DATA, USER_ACHIEVEMENT} from '../utils/data';
import styles from './Styles';

type Props = NativeStackScreenProps<
  NightlifeStackParams,
  'NightlifeTabs',
  'MyStack'
>;

function NightlifeScreen({navigation}: Props) {
  const theme = useTheme();
  const [searchValue, setSearchValue] = React.useState<string>('');
  const {isFineLocationGranted} = usePermission();
  const {currentLocation, getOneTimeLocation} = useCheckLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isFineLocationGranted) {
      getOneTimeLocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchUserLocation = async () => {
      if (currentLocation) {
        const location: UserLocationInterface =
          await LocationService.geocodeReverse({
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          });
        dispatch(updateUserLocation(location));
      }
    };

    fetchUserLocation();
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
    navigation.navigate('PlaceDetail', {placeId: id});

  return (
    <Layout contentContainerStyle={styles.container}>
      <ScrollView>
        <EntryAnimation index={0}>
          <Header
            transparent
            hasLocation
            hasNotification
            hasLogo
            onLocationPress={() => undefined}
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
          <Image
            source={{
              uri: 'https://d1hghorvcdp4xh.cloudfront.net/290/large/1681271342.jpg',
            }}
            style={{
              width: WIDTH,
              height: WIDTH,
            }}
          />
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
        <TopPlaces
          title="Top 5 Night Club this Week"
          data={PLACES_DATA}
          itemWidthStyle
          fullSliderWidth
          onSelect={onPlaceSelect}
        />
        <Gap height={32} />
      </ScrollView>
    </Layout>
  );
}

export default NightlifeScreen;

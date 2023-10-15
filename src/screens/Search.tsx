import * as React from 'react';
import {
  Gap,
  Layout,
  Loading,
  Section,
  Text,
  TextInput,
  TouchableSection,
} from '../components/atoms';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParams} from '../navigation/MainScreenStack';
import {ArrowLeft} from 'iconsax-react-native';
import {Colors} from '../theme';
import {useEffect} from 'react';
import {PlaceInterface} from '../interfaces/PlaceInterface';
import {NightlifeService} from '../service/NightlifeService';
import {COORDINATE_DATA} from '../utils/data';
import {useAppSelector} from '../hooks/hooks';
import {PlaceCard} from '../components/organism';

type Props = NativeStackScreenProps<MainStackParams, 'Search', 'MyStack'>;

function SearchScreen({navigation}: Props) {
  const {userLocation} = useAppSelector(state => state.user);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [placeData, setPlaceData] = React.useState<PlaceInterface[]>([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await NightlifeService.getPlaceByName({
        place_name: searchValue,
      });
      setPlaceData(
        response.data.map((item, idx) => {
          const latitude = COORDINATE_DATA[idx].latitude;
          const longitude = COORDINATE_DATA[idx].longitude;
          return {
            ...item,
            latitude,
            longitude,
          };
        }),
      );
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchValue.length > 2) {
      fetchData();
    } else {
      setPlaceData([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const onPlaceSelect = (id: string) =>
    navigation.navigate('PlaceDetailSecond', {
      placeData:
        placeData.find((item: PlaceInterface) => item.clubId === id) ?? null,
    });

  return (
    <Layout>
      {isLoading && <Loading />}
      <TouchableSection
        isRow
        onPress={() => navigation.goBack()}
        padding="16px 20px">
        <ArrowLeft size={24} color={Colors['white-100']} />
        <Gap width={8} />
        <Text label="Back" />
      </TouchableSection>
      <Gap height={20} />
      <Section padding="0px 20px">
        <TextInput
          value={searchValue}
          onChangeText={(value: string) => setSearchValue(value)}
          placeholder="Search anythings"
          type="search"
        />
        <Gap height={32} />
        {placeData?.length ? (
          placeData.map(item => (
            <PlaceCard
              item={item}
              onSelect={onPlaceSelect}
              isVertical
              userLocation={userLocation}
            />
          ))
        ) : (
          <></>
        )}
      </Section>
    </Layout>
  );
}

export default SearchScreen;

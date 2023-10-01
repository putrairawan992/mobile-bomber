/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Gap,
  Layout,
  Loading,
  Section,
  Text,
  TextInput,
} from '../../../components/atoms';
import styles from '../../Styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParams} from '../../../navigation/MainScreenStack';
import useTheme from '../../../theme/useTheme';
import {WIDTH} from '../../../utils/config';
import {PlaceInterface} from '../../../interfaces/PlaceInterface';
import {NightlifeService} from '../../../service/NightlifeService';
import {TopPlaces} from '../../../components/organism/Places/TopPlaces';
import {PlaceCard} from '../../../components/organism';
import {ScrollView} from 'react-native';

type Props = NativeStackScreenProps<
  MainStackParams,
  'PlaceByCategory',
  'MyStack'
>;

const PlaceByCategory = ({route, navigation}: Props) => {
  const theme = useTheme();
  const category = route.params.category;
  const [searchValue, setSearchValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [placeData, setPlaceData] = useState<PlaceInterface[]>([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await NightlifeService.getPlaceByCategory({
        params: {
          category_id: category.id,
          limit: 0,
        },
      });
      setPlaceData(response.data);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPlaceSelect = (id: string) =>
    navigation.navigate('PlaceDetailSecond', {
      placeData:
        placeData.find((item: PlaceInterface) => item.clubId === id) ?? null,
    });

  return (
    <Layout contentContainerStyle={styles.container} isDisableKeyboardAware>
      {isLoading && <Loading />}
      <Gap height={5} />
      <Section isRow isBetween padding="8px 16px">
        <Section
          isRow
          style={{width: WIDTH * 0.25, top: 4}}
          rounded={8}
          padding="14px 6px"
          backgroundColor={theme?.colors.SECTION}>
          {category.icon}
          <Gap width={6} />
          <Text
            variant="small"
            fontWeight="raleway-medium"
            label={category.title}
          />
        </Section>
        <Gap width={12} />
        <TextInput
          value={searchValue}
          onChangeText={(value: string) => setSearchValue(value)}
          placeholder="Search party"
          type="search"
          width={WIDTH * 0.65}
          textInputBackgroundColor={theme?.colors.SECTION}
        />
      </Section>
      <Gap height={32} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {placeData?.length ? (
          <TopPlaces
            title={`Top 5 ${category.title} this Week`}
            data={placeData.slice(0, 5)}
            itemWidthStyle
            fullSliderWidth
            onSelect={onPlaceSelect}
          />
        ) : (
          <></>
        )}
        <Gap height={32} />
        <Section padding="0px 16px">
          <Text
            color={theme?.colors.PRIMARY}
            label="Discover All Place"
            fontWeight="raleway-bold"
          />
          <Gap height={32} />
          {placeData?.length ? (
            placeData.map(item => (
              <PlaceCard item={item} onSelect={onPlaceSelect} isVertical />
            ))
          ) : (
            <></>
          )}
        </Section>
      </ScrollView>
    </Layout>
  );
};

export default PlaceByCategory;

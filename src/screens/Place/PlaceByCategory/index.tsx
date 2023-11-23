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
import {PlaceInterface} from '../../../interfaces/PlaceInterface';
import {NightlifeService} from '../../../service/NightlifeService';
import {TopPlaces} from '../../../components/organism/Places/TopPlaces';
import {PlaceCard} from '../../../components/organism';
import {ScrollView, StyleSheet} from 'react-native';
import {useAppSelector} from '../../../hooks/hooks';
import {COORDINATE_DATA} from '../../../utils/data';
import {Dropdown} from 'react-native-element-dropdown';
import {Colors} from '../../../theme';
import {ArrowDown2, ArrowUp2} from 'iconsax-react-native';
import {Beer, DiscoLight, Karaoke, WineBottle} from '../../../assets/icons';

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
  const {userLocation} = useAppSelector(state => state.user);
  const [vValue, setvValue] = useState(category.title);
  const [idParams, setIdParams] = useState<string>(category.id);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    fetchData(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vValue]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await NightlifeService.getPlaceByCategory({
        params: {
          category_id: idParams,
          keyword: searchValue,
        },
      });
      console.log('response', response);

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
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const onPlaceSelect = (id: string) =>
    navigation.navigate('PlaceDetailSecond', {
      placeData:
        placeData.find((item: PlaceInterface) => item.clubId === id) ?? null,
    });

  const PLACE_CATEGORY: any[] = [
    {
      value: 'f34e130a-20df-465b-a119-f03889600cff',
      label: 'Nightclub',
      image: <DiscoLight size={24} color={theme?.colors.ICON} />,
    },
    {
      value: 'ef8bd91f-9a39-41f3-8f7b-4324beceb02d',
      label: 'KTV',
      image: <Karaoke size={24} color={theme?.colors.ICON} />,
    },
    {
      value: 'd9140fe7-7f99-439d-bf72-968351977a7b',
      label: 'Pregames',
      image: <Beer size={24} color={theme?.colors.ICON} />,
    },
    {
      value: '79e0b4d2-c052-46b5-b8ea-4f80a761616d',
      label: 'Bar',
      image: <WineBottle size={24} color={theme?.colors.ICON} />,
    },
  ];

  return (
    <Layout contentContainerStyle={styles.container} isDisableKeyboardAware>
      {isLoading && <Loading />}
      <Gap height={5} />
      <Section padding="8px 16px">
        <Dropdown
          selectedTextStyle={{
            fontSize: 14,
            marginLeft: 10,
            textAlign: 'left',
            fontFamily: 'Inter-Regular',
            color: theme?.colors.TEXT_PRIMARY,
          }}
          placeholderStyle={{color: theme?.colors.TEXT_PRIMARY, marginLeft: 10}}
          placeholder={!isFocus ? `${category.title}` : '...'}
          iconStyle={s.iconStyle}
          itemTextStyle={{
            fontSize: 14,
            color: Colors['white-100'],
            fontFamily: 'Inter-Regular',
          }}
          containerStyle={{
            marginTop: 8,
            backgroundColor: theme?.colors.BACKGROUND2,
            borderRadius: 16,
            borderWidth: 0,
            width: '100%',
          }}
          maxHeight={300}
          style={[
            s.dropdown,
            {
              backgroundColor: theme?.colors.SECTION,
            },
          ]}
          renderRightIcon={visible =>
            visible ? (
              <ArrowUp2 color={theme?.colors.PRIMARY} size={16} />
            ) : (
              <ArrowDown2 color={theme?.colors.PRIMARY} size={16} />
            )
          }
          data={PLACE_CATEGORY}
          activeColor={theme?.colors.BACKGROUND2}
          iconColor={theme?.colors.PRIMARY}
          labelField="label"
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          valueField="value"
          value={vValue}
          renderLeftIcon={() => category.icon as any}
          renderItem={(item, index) => {
            let imageGet = item.image;
            console.log(item.image);
            if (item.label === 'Nightclub' && index === true) {
              imageGet = <DiscoLight size={24} color={theme?.colors.PRIMARY} />;
            }
            if (item.label === 'KTV' && index === true) {
              imageGet = <Karaoke size={24} color={theme?.colors.PRIMARY} />;
            }
            if (item.label === 'Pregames' && index === true) {
              imageGet = <Beer size={24} color={theme?.colors.PRIMARY} />;
            }
            if (item.label === 'Bar' && index === true) {
              imageGet = <WineBottle size={24} color={theme?.colors.PRIMARY} />;
            }
            return (
              <Section
                style={{
                  borderTopColor: theme?.colors.SECTION,
                  borderTopWidth: 0.9,
                }}>
                <Section isRow rounded={8} padding="14px 6px">
                  {imageGet}
                  <Gap width={6} />
                  <Text
                    variant="small"
                    color={index && theme?.colors.PRIMARY}
                    fontWeight="medium"
                    label={item.label}
                  />
                </Section>
              </Section>
            );
          }}
          onChange={item => {
            setvValue(item.value);
            setIdParams(item.value);
            setIsFocus(false);
          }}
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
            userLocation={userLocation}
          />
        ) : (
          <></>
        )}
        <Gap height={10} />
        <Section padding="8px 16px">
          <TextInput
            value={searchValue}
            style={{height: 45}}
            onChangeText={(value: string) => setSearchValue(value)}
            placeholder="Search in night club"
            type="search"
            textInputBackgroundColor={theme?.colors.SECTION}
          />
        </Section>
        <Gap height={10} />
        <Section padding="0px 16px">
          <Text
            color={theme?.colors.PRIMARY}
            label="Discover All Place"
            fontWeight="bold"
          />
          <Gap height={10} />
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
      </ScrollView>
    </Layout>
  );
};

const s = StyleSheet.create({
  dropdown: {
    borderRadius: 8,
    padding: 6,
  },
  icon: {
    marginRight: 5,
  },
  iconStyle: {
    width: 10,
    height: 10,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#111827',
  },
});

export default PlaceByCategory;

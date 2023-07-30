/* eslint-disable react-native/no-inline-styles */
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, View} from 'react-native';
import {Karaoke} from '../../../assets/icons';
import {Gap, Layout, Section, Text} from '../../../components/atoms';
import {Header, HorizontalMenu} from '../../../components/molecules';
import {PlaceCard} from '../../../components/molecules/Place/PlaceCard';
import {useImageAspectRatio} from '../../../hooks/useImageAspectRatio';
import {
  PlaceInterface,
  PlaceOverviewFeaturesInterface,
} from '../../../interfaces/PlaceInterface';
import {NightlifeStackParams} from '../../../navigation/MainScreenStack';
import useTheme from '../../../theme/useTheme';
import {PLACES_DATA, PLACE_MENU, PLACE_OVERVIEW} from '../../../utils/data';
import styles from '../Styles';

type Props = NativeStackScreenProps<
  NightlifeStackParams,
  'PlaceDetail',
  'MyStack'
>;

export const PlaceDetail = ({route}: Props) => {
  const placeId = route.params.placeId;
  const theme = useTheme();
  const [data, setData] = useState<PlaceInterface | undefined>(undefined);
  const [selectedMenu, setSelectedMenu] = useState<number>(1);
  const aspectRatio = useImageAspectRatio(data?.logo as string);
  useEffect(() => {
    const getPlaceData = () => {
      if (placeId) {
        setData(
          PLACES_DATA.find((item: PlaceInterface) => item.id === placeId),
        );
      }
    };

    getPlaceData();
  }, [placeId]);

  const PlaceOverview = () => {
    return (
      <Section
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
                  <Karaoke size={30} color={theme?.colors.ICON} />
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
      </Section>
    );
  };

  return (
    <Layout contentContainerStyle={styles.container} isScrollable={false}>
      <Header transparent hasBackBtn style={{height: 70}} />
      <View style={styles.headerLogo}>
        <Image source={{uri: data?.logo}} style={{height: 56, aspectRatio}} />
      </View>
      {data && (
        <PlaceCard item={data} onSelect={() => undefined} isPlaceDetail />
      )}
      <Gap height={12} />
      <HorizontalMenu
        menu={PLACE_MENU}
        selectedMenu={selectedMenu}
        handleSelect={(id: number) => setSelectedMenu(id)}
      />
      <Gap height={16} />
      <ScrollView style={styles.section}>{PlaceOverview()}</ScrollView>
    </Layout>
  );
};

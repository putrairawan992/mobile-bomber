/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {ScrollView as RNScrollView, View} from 'react-native';
import useTheme from '../../../../theme/useTheme';
import {EntryAnimation, Gap, Loading, Section, Text} from '../../../atoms';
import {
  GooglePlaceData,
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';
import {Colors} from '../../../../theme';
import {Search} from '../../../../assets/icons/Search';
import Config from 'react-native-config';
import {CardSearchLocation} from '../../../molecules/Card/CardSearchLocation';
import {LocationService} from '../../../../service/LocationService';
import {PlaceDetailInterface} from '../../../../interfaces/UserInterface';
import {CardLocationHistory, PillsGradient} from '../../../molecules';
import {useAppSelector} from '../../../../hooks/hooks';
import {MapsGradient, Position} from '../../../../assets/icons';
import {CITY_SAMPLE_DATA} from '../../../../utils/data';
import {gradientMapping} from '../../../../utils/config';
import {ScrollView} from 'react-native-gesture-handler';

interface TableLayoutSheetProps {
  history: PlaceDetailInterface[];
  onSelectLocation: (values: PlaceDetailInterface) => void;
}

export const SelectLocationSheet = ({
  history,
  onSelectLocation,
}: TableLayoutSheetProps) => {
  const theme = useTheme();
  const inputRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {userLocation} = useAppSelector(state => state.user);
  const getPlaceDetail = async (data: GooglePlaceData) => {
    try {
      setIsLoading(true);
      const detailPlace = await LocationService.getPlaceDetail(data.place_id);
      const location = await LocationService.geocodeReverse({
        latitude: detailPlace.geometry.location.lat,
        longitude: detailPlace.geometry.location.lng,
      });
      const placeDetail: PlaceDetailInterface = {
        ...detailPlace,
        location: location,
      };
      onSelectLocation(placeDetail);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
    }
  };

  return (
    <Section
      padding="0px 16px"
      backgroundColor={theme?.colors.SHEET}
      style={{
        borderTopWidth: 1,
        borderTopColor: theme?.colors.SHEET,
      }}>
      {isLoading && <Loading />}
      <Gap height={15} />
      <Section isRow isBetween>
        <Text
          variant="base"
          fontWeight="bold"
          label={'Select Location'}
          color={theme?.colors.WARNING}
        />
        <PillsGradient
          colors={
            gradientMapping['textPrimary' as keyof typeof gradientMapping].color
          }
          title="Select on map"
          icon={<MapsGradient size={20} />}
        />
      </Section>
      <Gap height={12} />
      <RNScrollView keyboardShouldPersistTaps={'handled'}>
        <GooglePlacesAutocomplete
          ref={inputRef}
          enablePoweredByContainer={false}
          placeholder="Search location"
          minLength={4}
          onPress={(data: GooglePlaceData) => {
            getPlaceDetail(data);
          }}
          query={{
            key: Config.KEY_GOOGLE_API,
            language: 'en',
          }}
          renderRightButton={() => (
            <View style={{position: 'absolute', top: 10, right: 12}}>
              <Search size={24} color={theme?.colors.PRIMARY} />
            </View>
          )}
          textInputProps={{
            placeholderTextColor: '#5D5C5C',
            returnKeyType: 'search',
          }}
          styles={{
            textInputContainer: {},
            textInput: {
              color: Colors['gray-50'],
              borderRadius: 4,
              fontSize: 14,
              width: 200,
              fontFamily: 'Poppins-Regular',
              fontWeight: '400',
              lineHeight: 18,
              borderWidth: 1,
              borderColor: '#323232',
              backgroundColor: '#262626',
            },
            row: {
              backgroundColor: '#171717',
            },
          }}
          renderRow={(data: GooglePlaceData, i: number) => {
            console;
            return (
              <CardSearchLocation
                key={i}
                item={data}
                text={inputRef?.current?.getAddressText()}
              />
            );
          }}
        />
      </RNScrollView>
      <Gap height={12} />
      <Section
        backgroundColor={theme?.colors.SHEET_CONTAINER}
        isRow
        padding="8px 12px"
        rounded={8}
        style={{marginBottom: 12}}>
        <>
          <Position color={Colors['white-100']} size={20} />
          <Gap width={12} />
          <Section style={{flex: 1}}>
            <Text
              label="Your current location"
              fontWeight="bold"
              color={Colors['white-100']}
            />
            <Gap height={4} />
            <Text
              label={`${userLocation.city}, ${userLocation.country}`}
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
      <ScrollView style={{maxHeight: 240}} showsVerticalScrollIndicator={false}>
        {history?.map((item, idx) => (
          <CardLocationHistory
            item={item}
            index={idx}
            key={`history_${idx}`}
            onSelect={onSelectLocation}
          />
        ))}
      </ScrollView>
      <Gap height={12} />
      <Text
        variant="base"
        fontWeight="semi-bold"
        label={'Taipei'}
        color={theme?.colors.WARNING}
      />
      <Gap height={16} />
      <ScrollView style={{maxHeight: 200}} showsVerticalScrollIndicator={false}>
        {CITY_SAMPLE_DATA.map((item, index) => (
          <EntryAnimation index={index} key={`city_${index}`}>
            <Section
              backgroundColor={theme?.colors.SHEET_CONTAINER}
              isRow
              padding="8px 12px"
              rounded={8}
              style={{marginBottom: 12}}>
              <Text label={item} color={Colors['white-100']} />
            </Section>
          </EntryAnimation>
        ))}
      </ScrollView>
      <Gap height={400} />
    </Section>
  );
};

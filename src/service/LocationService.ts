import {Alert} from 'react-native';
import {
  LocationInterface,
  UserLocationInterface,
} from '../interfaces/UserInterface';
import Config from 'react-native-config';
import {GooglePlaceDetail} from 'react-native-google-places-autocomplete';

export const LocationService = {
  geocodeReverse(payload: LocationInterface): Promise<UserLocationInterface> {
    return new Promise((resolved, rejected) => {
      fetch(
        `https://api.geocodify.com/v2/reverse?api_key=${Config.API_GEOCODIFY}&lat=${payload.latitude}&lng=${payload.longitude}`,
        {
          method: 'get',
        },
      )
        .then(res => res.json())
        .then((data: any) => {
          if (data.meta.code === 401) {
            Alert.alert('Failed get current location');
          } else {
            setTimeout(() => {
              const location: any = data.response.features[0].properties;
              resolved({
                address: location.street,
                city: location.county,
                region: location.region,
                country: location.country,
                country_code: location.country_code,
                continent: location.continent,
                latitude: payload.latitude,
                longitude: payload.longitude,
              });
            }, Math.random() * 500);
          }
        })
        .catch((error: any) => {
          rejected(error);
          Alert.alert('No Signal');
        });
    });
  },
  getPlaceDetail(placeId: string): Promise<GooglePlaceDetail> {
    return new Promise((resolved, rejected) => {
      fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${Config.KEY_GOOGLE_API}`,
        {
          method: 'get',
        },
      )
        .then(res => res.json())
        .then((data: any) => {
          setTimeout(() => {
            resolved(data.result);
          }, Math.random() * 500);
        })
        .catch((error: any) => {
          rejected(error);
          Alert.alert('No Signal');
        });
    });
  },
};

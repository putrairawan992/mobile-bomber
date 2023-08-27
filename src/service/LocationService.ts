import {Alert} from 'react-native';
import {
  LocationInterface,
  UserLocationInterface,
} from '../interfaces/UserInterface';
import Config from 'react-native-config';

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
};

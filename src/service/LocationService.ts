import {Alert} from 'react-native';
import {
  LocationInterface,
  UserLocationInterface,
} from '../interfaces/UserInterface';

export const API_GEOCODIFY = 'bd32f0c46bda89c8c61bb841cb307cdc98f947cc';
export const LocationService = {
  geocodeReverse(payload: LocationInterface): Promise<UserLocationInterface> {
    return new Promise((resolved, rejected) => {
      fetch(
        `https://api.geocodify.com/v2/reverse?api_key=2e288c7bb87aac515604aa9493cc015b11862067&lat=${payload.latitude}&lng=${payload.longitude}`,
        {
          method: 'get',
        },
      )
        .then(res => res.json())
        .then((data: any) => {
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
        })
        .catch((error: any) => {
          rejected(error);
          Alert.alert('No Signal');
        });
    });
  },
};
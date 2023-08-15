import Config from 'react-native-config';

const {API_GEOCODIFY, API_KEY} = Config;

export interface ConfigInterface {
  apiGeocodify: string;
  apiKey: string;
}

export default <ConfigInterface>{
  apiGeocodify: API_GEOCODIFY,
  apiKey: API_KEY,
};

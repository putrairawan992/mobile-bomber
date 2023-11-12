import Config from 'react-native-config';

const {
  API_GEOCODIFY,
  API_KEY,
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
  API_ENDPOINT,
  API_SERVICE,
} = Config;

export interface ConfigInterface {
  apiGeocodify: string;
  apiKey: string;
  firebaseApiKey: string;
  firebaseAuthDomain: string;
  firebaseProjectId: string;
  firebaseStorageBucket: string;
  firebaseMessagingSenderId: string;
  firebaseAppId: string;
  firebaseMeasurementId: string;
  apiEndpoint: string;
  apiService: string;
}

export default <ConfigInterface>{
  apiGeocodify: API_GEOCODIFY,
  apiKey: API_KEY,
  firebaseApiKey: FIREBASE_API_KEY,
  firebaseAuthDomain: FIREBASE_AUTH_DOMAIN,
  firebaseProjectId: FIREBASE_PROJECT_ID,
  firebaseStorageBucket: FIREBASE_STORAGE_BUCKET,
  firebaseMessagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  firebaseAppId: FIREBASE_APP_ID,
  firebaseMeasurementId: FIREBASE_MEASUREMENT_ID,
  apiEndpoint: API_ENDPOINT,
  apiService: API_SERVICE,
};

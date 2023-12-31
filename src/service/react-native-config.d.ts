declare module 'react-native-config' {
  export interface NativeConfig {
    API_GEOCODIFY: string;
    API_KEY: string;
    FIREBASE_API_KEY: string;
    FIREBASE_AUTH_DOMAIN: string;
    FIREBASE_PROJECT_ID: string;
    FIREBASE_STORAGE_BUCKET: string;
    FIREBASE_MESSAGING_SENDER_ID: string;
    FIREBASE_APP_ID: string;
    FIREBASE_MEASUREMENT_ID: string;
    API_ENDPOINT: string;
    API_SERVICE: string;
    KEY_GOOGLE_API: string;
    FCM_KEY: string;
    WEB_CLIENT_ID: string;
  }

  export const Config: NativeConfig;
  export default Config;
}

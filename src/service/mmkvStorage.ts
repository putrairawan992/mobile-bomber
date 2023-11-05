import {MMKVLoader} from 'react-native-mmkv-storage';
const MMKV = new MMKVLoader().initialize(); // Returns an MMKV Instance
// this service created for controlling AsyncStorage key names list
// please update storageName type if there is new AsyncStorage key

export type storageName =
  | 'accessToken'
  | 'refreshToken'
  | 'tokenExpiry'
  | 'userAuth'
  | 'userType'
  | 'historySearchLocation';

export const getStorage = async (name: storageName) => {
  return await MMKV.getStringAsync(name);
};

export const setStorage = async (name: storageName, value: string) => {
  return await MMKV.setStringAsync(name, value);
};

export const removeStorage = async (name: storageName) => {
  return MMKV.removeItem(name);
};

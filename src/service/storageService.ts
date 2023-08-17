import AsyncStorage from '@react-native-async-storage/async-storage';

// this service created for controlling AsyncStorage key names list
// please update storageName type if there is new AsyncStorage key

export type storageName =
  | 'accessToken'
  | 'refreshToken'
  | 'tokenExpiry'
  | 'userAuth';

export const getStorage = async (name: storageName): Promise<string | null> => {
  return await AsyncStorage.getItem(name);
};

export const setStorage = async (
  name: storageName,
  value: string,
): Promise<void> => {
  return await AsyncStorage.setItem(name, value);
};

export const removeStorage = async (name: storageName): Promise<void> => {
  return await AsyncStorage.removeItem(name);
};

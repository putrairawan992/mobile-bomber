import {Dimensions, Platform} from 'react-native';

const {height, width} = Dimensions.get('window');

/**
 * Check device
 */
export const isIphoneX = () => {
  return (
    // This has to be iOS duh
    Platform.OS === 'ios' &&
    // Accounting for the height in either orientation
    (height >= 812 || width >= 812)
  );
};

/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Platform } from 'react-native';
import _ from 'lodash';
// use post script names for font families
const PlusJakarta = {
  100: {
    fontFamily:
      Platform.OS === 'android'
        ? 'PlusJakartaDisplay-Light'
        : 'PlusJakartaText-Light',
  },
  200: {
    fontFamily:
      Platform.OS === 'android'
        ? 'PlusJakartaDisplay-Light'
        : 'PlusJakartaText-Light',
  },
  300: {
    fontFamily:
      Platform.OS === 'android'
        ? 'PlusJakartaDisplay-Light'
        : 'PlusJakartaText-Light',
  },
  400: {
    fontFamily:
      Platform.OS === 'android'
        ? 'PlusJakartaDisplay-Regular'
        : 'PlusJakartaText-Regular',
  },
  500: {
    fontFamily: 'PlusJakartaDisplay-Medium',
  },
  600: {
    fontFamily:
      Platform.OS === 'android'
        ? 'PlusJakartaDisplay-Bold'
        : 'PlusJakartaText-Bold',
  },
  700: {
    fontFamily:
      Platform.OS === 'android'
        ? 'PlusJakartaDisplay-Bold'
        : 'PlusJakartaText-Bold',
  },
  800: {
    fontFamily:
      Platform.OS === 'android'
        ? 'PlusJakartaDisplay-Bold'
        : 'PlusJakartaText-Bold',
  },
};

const FONTS = {
  PlusJakarta,
};

/**
 * Helper class for cross-platform font styles
 */
class FontHelper {
  static font(fontParams) {
    const fontFamily = fontParams.fontFamily || 'PlusJakarta';
    const fontWeight = fontParams.fontWeight || '400';
    const fontStyle = fontParams.fontStyle || '';

    return {
      ..._.omit(fontParams, [fontFamily, fontFamily, fontStyle]),
      ...FONTS[fontFamily][fontWeight + fontStyle],
    };
  }
}

export default FontHelper;

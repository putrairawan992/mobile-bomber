import {Dimensions} from 'react-native';
import {randomNumber} from './function';

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;
export const EVENT_CARD_WIDTH = 329;
export const EVENT_CARD_HEIGHT = 160;
export const PADDING = 20;

export const SHADOWS = {
  light: {
    shadowOffset: {width: 0, height: 0.9},
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOpacity: 1,
    elevation: 3,
    shadowRadius: 1.22,
  },
  medium: {
    shadowOffset: {width: 0, height: 7},
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOpacity: 1,
    shadowRadius: 2.22,
  },
  dark: {
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
  default: {
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    elevation: 4,
  },
};

export const DUMMY_IMAGE = `https://source.unsplash.com/random/600x600?sig=${randomNumber(
  2,
)}`;

export const gradientMapping = {
  'Couples Package': {
    color: ['#F6D056', '#ED984E', '#FC3F31'],
  },
  'VIP Ticket': {
    color: ['#4E6AFF', '#77BAAD'],
  },
  'Group Package': {
    color: ['#4E6AFF', '#B778D4'],
  },
  'Dance Floor Access': {
    color: ['#A060FA', '#C800CC'],
  },
  textPrimary: {
    color: ['#A060FA', '#C800CC'],
  },
};

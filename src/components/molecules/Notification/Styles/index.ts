import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors} from '../../../../theme';

const styles = EStyleSheet.create({
  bold: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter',
    color: Colors.white,
  },
  regular: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Inter',
    color: Colors['black-40'],
  },
});

export default styles;

import EStyleSheet from 'react-native-extended-stylesheet';
import {isIphoneX} from '../../../../libs/Utils';
import {Colors} from '../../../../theme';

export default EStyleSheet.create({
  content: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: Colors.lighterGray,
  },
  contentContainerStyle: {
    '@media ios': {
      minHeight: isIphoneX() ? '100% - 125rem' : '100%',
    },
    '@media android': {
      minHeight: '100%',
    },
  },
});

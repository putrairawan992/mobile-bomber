import EStyleSheet from 'react-native-extended-stylesheet';
import {StatusBar} from 'react-native';
import {Colors} from '../../../../theme';

const styles = EStyleSheet.create({
  safeViewcontainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.lighterGray,
    '@media android': {
      // marginTop: StatusBar.currentHeight
    },
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  statusBarMarginTop: {
    marginTop: StatusBar.currentHeight,
  },
});

export default styles;

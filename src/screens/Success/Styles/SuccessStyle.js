/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors} from '../../../theme';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 15,
    paddingHorizontal: 40,
  },
  successContent: {
    flex: 1,
    marginVertical: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successImage: {
    width: 82,
    height: 82,
    marginBottom: 20,
  },
  successHeading: {
    lineHeight: 45,
    marginBottom: 38,
    color: Colors.black,
  },
  successPeregraph: {
    lineHeight: 21,
    color: Colors.darkGray,
    width: 233,
    textAlign: 'center',
  },
  successBtn: {
    width: '100%',
  },
});

export default styles;

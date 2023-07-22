/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import EStyleSheet from 'react-native-extended-stylesheet';
import { Colors, Fonts } from '../../../theme';

const styles = EStyleSheet.create({
  welcomeScreenImages: {
    height: '263.95rem',
    width: '100%'
  },
  welcomeScreenHeading: {
    marginTop: '77rem',
    marginBottom: '10rem',
    textAlign: 'center',
    width: '100%',
    color: Colors.black,
    lineHeight: '38rem',
    ...Fonts.style.boldText,
    fontSize: Fonts.size.larg
  },
  welcomeScreenPeregraph: {
    color: Colors.darkGray,
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '67rem',
    ...Fonts.style.normalText,
    fontSize: Fonts.size.medium
  }
});

export default styles;

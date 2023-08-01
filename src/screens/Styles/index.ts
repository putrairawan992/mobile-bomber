import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  eventHeaderTitle: {
    color: colors.white,
  },
  eventThemeContainer: {
    paddingHorizontal: 10,
  },
  bookingButton: {
    position: 'absolute',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    bottom: 0,
    width: '100%',
    backgroundColor: '#9F9E9F',
    alignItems: 'center',
  },
});

export default styles;

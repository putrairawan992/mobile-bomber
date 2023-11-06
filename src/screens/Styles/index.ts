import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171717',
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
    paddingBottom: 16,
    bottom: 0,
    width: '100%',
    backgroundColor: '#9F9E9F',
    alignItems: 'center',
  },
  bottomSheetHandleStyle: {
    backgroundColor: '#1E1E1E',
    borderTopRightRadius: 14,
    borderTopLeftRadius: 14,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
});

export default styles;

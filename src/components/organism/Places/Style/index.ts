import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  piils: {
    padding: 4,
    backgroundColor: '#2D2D2D',
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4,
  },
  scheduleContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
  },
  totalSlider: {
    position: 'absolute',
    bottom: 16,
    right: 20,
  }
});

export default styles;

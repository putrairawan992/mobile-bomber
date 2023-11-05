import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
  },
  headerLogo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    backgroundColor: '#D9D9D9',
    borderRadius: 50,
  },
});

export default styles;

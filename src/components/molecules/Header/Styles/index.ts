import {Platform} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import Colors from '../../../../theme/Color';
import {WIDTH} from '../../../../utils/config';

export default EStyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: Colors.lighterGray,
    alignItems: 'center',
    zIndex: 99999,
    ...Platform.select({
      ios: {
        shadowColor: Colors.black,
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.1,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  transparent: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
      },
      android: {
        elevation: null,
      },
    }),
  },
  title: {
    paddingHorizontal: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  titleTxt: {
    color: Colors.darkBlack,
  },
  left: {
    position: 'absolute',
    top: 10,
    left: 16,
  },
  textSubChild: {
    marginLeft: 5,
  },
  leftArrow: {height: 20, width: 9.78},
  userRightImageBtn: {
    marginLeft: 'auto',
  },
  userRightImage: {
    width: 42,
    height: 42,
  },
  leftLocationContent: {
    flexDirection: 'row',
  },
  locationImage: {
    width: 14,
    height: 16.9,
  },
  leftLocationText: {
    marginLeft: 6,
    width: WIDTH - 120,
  },
  clearText: {
    lineHeight: 21,
    color: Colors.pink,
  },
  filterBtn: {
    width: 40,
    height: 40,
    backgroundColor: Colors.white,
    borderRadius: 10,
    shadowOffset: {
      width: 1,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 20,
    shadowColor: Colors.shadowLighterBlack,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
  },
  filterBtnIcon: {
    width: 15,
    height: 15,
  },
  clearTextBtn: {
    position: 'absolute',
    right: 20,
  },
  backBtn: {
    // backgroundColor: '#f00',
    width: 20,
    alignItems: 'center',
  },
});

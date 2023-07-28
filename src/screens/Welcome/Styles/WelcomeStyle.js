/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors} from '../../../theme';

const styles = EStyleSheet.create({
  container: {
    // paddingHorizontal: '15rem',
    flex: 1,
    width: '100%',
  },
  nextStartBtn: {
    paddingHorizontal: '12rem',
    paddingVertical: '14rem',
    overflow: 'hidden',
    textAlign: 'center',
    color: Colors.white,
    width: '165rem',
    height: '50rem',
  },
  nextFirstStartBtnView: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  nextStartBtnView: {
    backgroundColor: Colors.pink,
    borderRadius: '12rem',
    marginLeft: 'auto',
    width: '165rem',
    height: '50rem',
    shadowOffset: {
      width: '1rem',
      height: '10rem',
    },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 20,
    shadowColor: Colors.blurPink,
  },
  backBtnImgView: {
    width: '50rem',
    height: '50rem',
    borderRadius: '12rem',
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: '1rem',
      height: '10rem',
    },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 20,
    shadowColor: Colors.blurBlack,
  },
  backBtnImg: {
    width: '9.78rem',
    height: '16rem',
  },
  welcomeBottomBtn: {
    paddingHorizontal: '25rem',
    flexDirection: 'row',
    marginBottom: '20rem',
  },
  welcomeTwoSlideImg: {
    height: '307rem',
  },
});

export default styles;

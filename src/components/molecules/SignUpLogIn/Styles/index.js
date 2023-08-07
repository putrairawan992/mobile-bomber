/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors} from '../../../theme';

const styles = EStyleSheet.create({
  logo: {
    width: 70,
    height: 70,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 21,
  },
  heading: {
    marginBottom: 38,
    textAlign: 'center',
    width: '100%',
    color: Colors.black,
    lineHeight: 38,
  },
  allInputStyle: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 22,
    color: Colors.black,
    marginBottom: 20,
    height: 40,
  },
  passwordEyeImgBtn: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  passwordEyeImg: {
    width: 16,
    height: 16,
    opacity: 1,
  },
  commanText: {
    lineHeight: 18,
    color: Colors.darkGray,
    textAlign: 'center',
  },
  googleImg: {
    height: 30,
    width: 30,
  },
  facebookImg: {
    height: 30,
    width: 15,
  },
  googleFaceBookBtn: {
    width: 42,
    borderRadius: 12,
    backgroundColor: Colors.gray,
    marginHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 17,
  },
  googleFaceBookBtnText: {
    paddingLeft: 17,
    fontSize: 15,
    lineHeight: 22.5,
    color: Colors.black,
  },
  resetInputStyle: {
    paddingVertical: 15,
    paddingRight: 35,
    color: Colors.black,
    marginBottom: 20,
    borderBottomWidth: 2,
    borderColor: Colors.lightGray,
  },
  resetPasswordEyeImgBtn: {
    position: 'absolute',
    right: 12,
    top: 16,
  },
});

export default styles;

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import EStyleSheet from 'react-native-extended-stylesheet';
import {isIphoneX} from '../../../libs/Utils';
import {Colors} from '../../../theme';

const styles = EStyleSheet.create({
  container: {
    flex: isIphoneX() ? 1 : 0,
    paddingTop: 50,
    paddingHorizontal: 0,
  },
  signupLoginInputGroup: {
    paddingHorizontal: 25,
    flexDirection: 'column',
    flex: 1,
  },
  confirmNumberText: {
    width: 250,
    lineHeight: 21,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
  },
  bottomAccountText: {
    lineHeight: 18,
    color: Colors.lightBlack,
    alignSelf: 'center',
  },
  loginSignupBtnText: {
    lineHeight: 18,
    color: Colors.pink,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: Colors.pink,
  },
  otpInputStyle: {
    width: 40,
    height: 40,
    backgroundColor: Colors.white,
    borderRadius: 12,
    textAlign: 'center',
    shadowOffset: {
      width: 1,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 20,
    shadowColor: Colors.blurBlack,
  },
  otpInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 33,
  },
  bottomContinueBtn: {
    flex: 1,
    paddingHorizontal: 25,
  },
  otpContinueBtn: {
    marginTop: 'auto',
  },
  loaderContent: {
    width: 93,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 35,
    marginTop: 19,
  },
  loaderDotsStyle: {
    color: Colors.pink,
    fontSize: 75,
    letterSpacing: -12,
    lineHeight: 30,
  },
  logoHeadingStyle: {
    marginHorizontal: -25,
  },
});

export default styles;

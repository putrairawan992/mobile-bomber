/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import EStyleSheet from 'react-native-extended-stylesheet';
import {isIphoneX} from '../../../libs/Utils';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  container: {
    paddingHorizontal: 14,
    paddingBottom: 15,
    '@media ios': {
      flex: isIphoneX() ? 1 : 0,
      paddingTop: 81,
    },
    '@media android': {
      paddingTop: 70,
    },
  },
  signupLoginInputGroup: {
    paddingHorizontal: 25,
    flexDirection: 'column',
    flex: 1,
  },
  lastInputStyle: {
    marginBottom: 32,
  },
  passwordInputStyle: {
    marginBottom: 0,
  },
  signUpLogInBtn: {
    marginBottom: 37,
  },
  googleFaceBookBtnRow: {
    flexDirection: 'row',
    marginHorizontal: '-4%',
    marginTop: 37,
    marginBottom: 32,
  },
  bottomAccountText: {
    lineHeight: 18,
    color: Colors.lightBlack,
    alignSelf: 'center',
    marginTop: 'auto',
    ...Fonts.style.normalText,
    fontSize: Fonts.size.tiny,
  },
  loginSignupBtnText: {
    lineHeight: 18,
    color: Colors.pink,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: Colors.pink,
    ...Fonts.style.textInputText,
    fontSize: Fonts.size.tiny,
  },
  forgotPasswordLink: {
    marginBottom: 32,
    marginLeft: 'auto',
  },
  forgotPasswordText: {
    textAlign: 'right',
    fontSize: 10,
    lineHeight: 15,
    color: Colors.darkGray,
    ...Fonts.style.textInputText,
  },
  forgotPasswordInput: {
    marginBottom: 37,
  },
  resetPasswordInput: {
    ...Fonts.style.normalText,
  },
  forgotPasswordPageText: {
    lineHeight: 21,
    marginBottom: 20,
    ...Fonts.style.normalText,
    fontSize: Fonts.size.medium,
  },
  resetPageText: {
    marginBottom: 33,
    letterSpacing: -0.24,
  },
  resetPasswordContainer: {
    paddingHorizontal: 15,
    paddingTop: 23,
  },
  inputLabelText: {
    textAlign: 'left',
    color: Colors.lighterBlack,
    ...Fonts.style.textInputText,
    fontSize: Fonts.size.tiny,
  },
});

export default styles;

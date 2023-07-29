import EStyleSheet from 'react-native-extended-stylesheet';
import {isIphoneX} from '../../../libs/Utils';
import {Colors} from '../../../theme';

const styles = EStyleSheet.create({
  container: {
    paddingHorizontal: 27,
    '@media ios': {
      // flex: isIphoneX() ? 1 : 0,
      paddingTop: 61,
    },
    '@media android': {
      paddingTop: 50,
    },
  },
  signupLoginInputGroup: {
    flexDirection: 'column',
    flex: 1,
    marginTop: 56,
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
  },
  loginSignupBtnText: {
    lineHeight: 18,
    color: Colors.pink,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: Colors.pink,
  },
  forgotPasswordLink: {
    marginLeft: 'auto',
  },
  forgotPasswordText: {
    textAlign: 'right',
    fontSize: 10,
    lineHeight: 15,
    color: Colors.darkGray,
  },
  forgotPasswordInput: {
    marginBottom: 37,
  },

  forgotPasswordPageText: {
    lineHeight: 21,
    marginBottom: 20,
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
  },
});

export default styles;

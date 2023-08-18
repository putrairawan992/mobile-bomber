import * as React from 'react';
import {Section, Text, Layout} from '../../components/atoms';
import {useContext, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import OtpInputs from 'react-native-otp-inputs';
import styles from './Styles/OtpStyle';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParams} from '../../navigation/AuthScreenStack';
import useTheme from '../../theme/useTheme';
import LoadingDots from '@apolloeagle/loading-dots';
import {ModalToastContext} from '../../context/AppModalToastContext';
import useThemedStyles from '../../theme/useThemedStyles';
import {ThemeInterface} from '../../theme/ThemeProvider';
import {LogoLabel, ModalToast} from '../../components/molecules';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {loginSuccess} from '../../store/user/userActions';
import {setStorage} from '../../service/mmkvStorage';

type Props = NativeStackScreenProps<AuthStackParams, 'OtpSignIn', 'MyStack'>;

function OtpSignInNumberScreen({route}: Props) {
  const theme = useTheme();
  const s = useThemedStyles(Styles);
  const dispatch = useDispatch();
  const otpRef = React.useRef<any>();
  const [otpInputFill, setOtpInputFill] = useState(true);
  const [confirmation, setConfirmation] = useState<any>(null);
  const {
    isShowToast,
    setIsShowToast,
    toastMessage,
    setToastMessage,
    type,
    setType,
  } = useContext(ModalToastContext);
  React.useEffect(() => {
    if (!route.params.isResend) {
      signInWithMobileNumber();
    }
    setTimeout(() => {
      otpRef?.current?.focus();
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signInWithMobileNumber = async () => {
    try {
      const result: any = await auth().signInWithPhoneNumber(
        route.params.phone,
      );
      setConfirmation(result);
    } catch (error: any) {
      setIsShowToast(true);
      setType('error');
      setToastMessage('Please try again');
    }
  };

  const handleConfirmCode = async (code: string) => {
    try {
      const response = await confirmation.confirm(code);
      const userAuth = {
        userId: response.user.uid,
        fullName: '',
        username: response.user.displayName,
        phone: response.user.phoneNumber,
        photoUrl: response.user.photoURL,
        email: response.user.email,
        creationTime: 0,
        lastSignInTime: 0,
        emailVerified: false,
        age: 0,
        bio: '',
      };
      setOtpInputFill(true);
      await setStorage('userAuth', JSON.stringify(userAuth));
      await setStorage(
        'refreshToken',
        JSON.stringify(response.user.uid + '_' + response.user.phoneNumber),
      );
      dispatch(loginSuccess(userAuth));
    } catch (error: any) {
      setIsShowToast(true);
      setType('error');
      setToastMessage('Wrong otp number');
      setOtpInputFill(true);
    }
  };
  return (
    <Layout contentContainerStyle={styles.container}>
      <View style={styles.signupLoginInputGroup}>
        <LogoLabel
          title="Confirm Your Number"
          subtitle={`Enter the code we sent over SMS to  ${route.params.phone}:`}
        />
        {otpInputFill ? (
          <OtpInputs
            handleChange={code => {
              if (code.length === 6) {
                setOtpInputFill(false);
                setTimeout(() => {
                  handleConfirmCode(code);
                }, 3000);
              }
            }}
            numberOfInputs={6}
            ref={otpRef}
            style={styles.otpInputContainer}
            inputStyles={s.otpStyle}
            autofillFromClipboard={false}
          />
        ) : (
          <View style={styles.loaderContent}>
            <LoadingDots
              animation="pulse"
              dots={4}
              color={theme?.colors.PRIMARY}
              size={15}
            />
          </View>
        )}
        <Section isRow>
          <Text
            variant="base"
            label="Didn’t get a code? "
            color={theme?.colors.TEXT_SECONDARY}
          />
          <TouchableOpacity onPress={signInWithMobileNumber}>
            <Text variant="base" label="Resent" color={theme?.colors.PRIMARY} />
          </TouchableOpacity>
        </Section>
      </View>
      <ModalToast
        isVisible={isShowToast}
        onCloseModal={() => setIsShowToast(false)}
        message={toastMessage}
        type={type}
      />
    </Layout>
  );
}

export default OtpSignInNumberScreen;

const Styles = (theme: ThemeInterface) =>
  StyleSheet.create({
    otpStyle: {
      width: 50,
      height: 50,
      backgroundColor: theme?.colors.BACKGROUND2,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme?.colors.BORDER,
      textAlign: 'center',
      fontSize: 14,
      fontFamily: 'Poppins-Regular',
      color: theme?.colors.TEXT_PRIMARY,
    },
  });
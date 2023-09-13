/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  Section,
  Text,
  Layout,
  Gap,
  TouchableSection,
} from '../../components/atoms';
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
import {loginSuccess, setUserType} from '../../store/user/userActions';
import {setStorage} from '../../service/mmkvStorage';
import {Colors} from '../../theme';
import {Edit2} from 'iconsax-react-native';
import CountdownTimer from '../../components/molecules/Countdown';

type Props = NativeStackScreenProps<AuthStackParams, 'OtpSignIn', 'MyStack'>;

function OtpSignInNumberScreen({route, navigation}: Props) {
  const theme = useTheme();
  const s = useThemedStyles(Styles);
  const dispatch = useDispatch();
  const userData = route.params.userData;
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
  const [codeInput, setCodeInput] = useState<string>('');
  const ONE_MINUTES = 1 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();

  const dateTimeOneMinutes = NOW_IN_MS + ONE_MINUTES;

  React.useEffect(() => {
    if (!route.params.isResend) {
      signInWithMobileNumber();
    }
    setTimeout(() => {
      otpRef?.current?.focus();
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openToast = (toastType: 'success' | 'error', message: string) => {
    setIsShowToast(true);
    setType(toastType);
    setToastMessage(message);
  };

  const signInWithMobileNumber = async () => {
    try {
      const result: any = await auth().signInWithPhoneNumber(userData.phone);
      setConfirmation(result);
    } catch (error: any) {
      openToast('error', 'Please try again');
    }
  };

  const handleConfirmCode = async (code: string) => {
    try {
      const response = await confirmation.confirm(code);
      const userAuth = {
        id: userData.id,
        fullName: userData.fullName,
        username: userData.username,
        phone: userData.phone,
        photoUrl: userData.photoUrl,
        email: userData.email,
        creationTime: 0,
        lastSignInTime: 0,
        emailVerified: false,
        age: userData.age,
        bio: userData.bio,
      };
      await setStorage('userAuth', JSON.stringify(userAuth));
      await setStorage('userType', 'regular');
      await setStorage(
        'refreshToken',
        JSON.stringify(response.user.uid + '_' + response.user.phoneNumber),
      );
      setOtpInputFill(true);
      openToast('success', 'Login successfully');
      setTimeout(() => {
        dispatch(loginSuccess(userAuth));
        dispatch(setUserType('regular'));
      }, 2000);
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
          title="One more steps"
          subtitle={'Just finish the OTP and you ready to shake the stage'}
        />
        <View
          style={{
            height: 100,
          }}>
          <Section isRow>
            <Text
              fontWeight="semi-bold"
              label={'we’ve sent this OTP to '}
              color={Colors['white-100']}
            />
            <Text
              fontWeight="semi-bold"
              label={userData.phone}
              color={Colors['warning-500']}
            />
            <Gap width={2} />
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Edit2 size={16} color={Colors['warning-500']} />
            </TouchableOpacity>
          </Section>
          <Gap height={12} />
          {otpInputFill ? (
            <OtpInputs
              handleChange={code => setCodeInput(code)}
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
        </View>

        <Section isRow>
          <Text
            variant="base"
            label="Don’t receive OTP ? "
            color={theme?.colors.TEXT_SECONDARY}
            fontWeight="medium"
          />
          <CountdownTimer
            targetDate={dateTimeOneMinutes}
            component={
              <TouchableOpacity onPress={signInWithMobileNumber}>
                <Text
                  variant="base"
                  label="Resent"
                  color={theme?.colors.PRIMARY}
                />
              </TouchableOpacity>
            }
          />
        </Section>
        <Gap height={56} />
        <TouchableSection
          padding="12px 20px"
          backgroundColor="#333"
          rounded={8}
          onPress={() => {
            if (codeInput.length === 6) {
              setOtpInputFill(false);
              setTimeout(() => {
                handleConfirmCode(codeInput);
              }, 2000);
            }
          }}>
          <Text
            variant="large"
            label="Submit"
            color={Colors['black-20']}
            textAlign="center"
          />
        </TouchableSection>
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
      height: 60,
      backgroundColor: theme?.colors.BACKGROUND2,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme?.colors.BORDER,
      textAlign: 'center',
      fontSize: 32,
      lineHeight: 38,
      alignContent: 'center',
      fontFamily: 'Poppins-Regular',
      color: theme?.colors.TEXT_PRIMARY,
    },
  });

/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  Section,
  Text,
  Layout,
  Gap,
  TouchableSection,
} from '../../components/atoms';
import {useContext, useEffect, useState} from 'react';
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
import {AuthService} from '../../service/AuthService';
import {useDispatch} from 'react-redux';
import {setStorage} from '../../service/mmkvStorage';
import {loginSuccess, setUserType} from '../../store/user/userActions';
import {Colors} from '../../theme';
import {Edit2} from 'iconsax-react-native';
import moment from 'moment';

type Props = NativeStackScreenProps<AuthStackParams, 'OtpSignUp', 'MyStack'>;

function OtpSignUpNumberScreen({route, navigation}: Props) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const s = useThemedStyles(Styles);
  const otpRef = React.useRef<any>();
  const data = route.params.payload;
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
  const WAITING_DURATION = 59;
  const [waitingTime, setWaitingTime] = useState(0);

  useEffect(() => {
    if (!waitingTime) {
      return;
    }

    const intervalId = setInterval(() => {
      setWaitingTime(waitingTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [waitingTime]);

  React.useEffect(() => {
    signInWithMobileNumber();
    setTimeout(() => {
      otpRef?.current?.focus();
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signInWithMobileNumber = async () => {
    try {
      const result: any = await auth().signInWithPhoneNumber(data.phone);
      setConfirmation(result);
      setWaitingTime(WAITING_DURATION);
    } catch (error: any) {
      setIsShowToast(true);
      setType('error');
      setToastMessage('Please try again');
    }
  };

  const openToast = (toastType: 'success' | 'error', message: string) => {
    setIsShowToast(true);
    setType(toastType);
    setToastMessage(message);
  };

  const handleConfirmCode = async (code: string) => {
    try {
      const response = await confirmation.confirm(code);
      const userAuth = {
        id: response.user.uid,
        fullName: '',
        username: data.username,
        phone: response.user.phoneNumber,
        photoUrl: response.user.photoURL,
        email: response.user.email,
        creationTime: 0,
        lastSignInTime: 0,
        emailVerified: false,
        age: 0,
        bio: '',
      };
      const register = await AuthService.postRegister({
        id: response.user.uid as string,
        username: data.username,
        phone: data.phone,
        email: data.email,
        password: data.password,
      });
      if (!register.error) {
        await setStorage('userAuth', JSON.stringify(userAuth));
        await setStorage('userType', 'regular');
        await setStorage(
          'refreshToken',
          JSON.stringify(response.user.uid + '_' + response.user.phoneNumber),
        );
        setOtpInputFill(true);
        openToast('success', 'Register successfully');
        setTimeout(() => {
          dispatch(loginSuccess(userAuth));
          dispatch(setUserType('regular'));
        }, 2000);
      } else {
        openToast('error', register.message);
      }
    } catch (error: any) {
      openToast('error', 'Wrong otp code');
      setOtpInputFill(true);
    }
  };
  return (
    <Layout contentContainerStyle={styles.container} isDisableKeyboardAware>
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
              label={data.phone}
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
              inputContainerStyles={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
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
          {waitingTime === 0 ? (
            <TouchableOpacity onPress={signInWithMobileNumber}>
              <Text
                variant="base"
                label="Resent"
                color={theme?.colors.PRIMARY}
              />
            </TouchableOpacity>
          ) : (
            <Text
              variant="base"
              label={moment.utc(waitingTime * 1000).format('mm:ss')}
              color={theme?.colors.PRIMARY}
            />
          )}
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

export default OtpSignUpNumberScreen;

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
      fontSize: 30,
      lineHeight: 38,
      fontFamily: 'Poppins-Regular',
      color: theme?.colors.TEXT_PRIMARY,
    },
  });

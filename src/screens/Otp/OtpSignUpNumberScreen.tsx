/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Content, Container, Section, Text} from '../../components/atoms';
import {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
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

type Props = NativeStackScreenProps<AuthStackParams, 'OtpSignUp', 'MyStack'>;

function OtpSignUpNumberScreen({route, navigation}: Props) {
  const theme = useTheme();
  const s = useThemedStyles(Styles);
  const optConfirm = '123456';
  const otpRef = React.useRef<any>();
  const [otpInputFill, setOtpInputFill] = useState(true);
  const {
    isShowToast,
    setIsShowToast,
    toastMessage,
    setToastMessage,
    type,
    setType,
  } = useContext(ModalToastContext);
  React.useEffect(() => {
    setTimeout(() => {
      otpRef?.current?.focus();
    }, 1000);
  }, []);
  return (
    <Container>
      <Content
        hasHeader
        contentContainerStyle={{
          ...styles.container,
          backgroundColor: theme?.colors.BACKGROUND1,
        }}>
        <View style={styles.signupLoginInputGroup}>
          <LogoLabel
            title="Confirm Your Number"
            subtitle={`Enter the code we sent over SMS to  ${route.params.phone}:`}
          />
          {otpInputFill ? (
            <OtpInputs
              handleChange={code => {
                if (optConfirm === code) {
                  setOtpInputFill(false);
                  setTimeout(() => {
                    setOtpInputFill(true);
                    navigation.navigate('SuccessNumber');
                  }, 3000);
                } else if (code.length === 6 && optConfirm !== code) {
                  setOtpInputFill(false);
                  setTimeout(() => {
                    setIsShowToast(true);
                    setType('error');
                    setToastMessage('Wrong otp number');
                    setOtpInputFill(true);
                    navigation.navigate('OtpSignUp', {
                      phone: route.params.phone,
                    });
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
              fontWeight="inter-regular"
              variant="base"
              label="Didn’t get a code? "
              color={theme?.colors.TEXT_SECONDARY}
            />
            <Text
              fontWeight="inter-regular"
              variant="base"
              label="Resent"
              color={theme?.colors.PRIMARY}
            />
          </Section>
        </View>
        <ModalToast
          isVisible={isShowToast}
          onCloseModal={() => setIsShowToast(false)}
          message={toastMessage}
          type={type}
        />
      </Content>
    </Container>
  );
}

export default OtpSignUpNumberScreen;

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

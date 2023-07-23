/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from 'react';
import { useContext, useState } from 'react';
import { View } from 'react-native';
import { Container, Content } from '../../components';
import LogoHeading from '../../components/SignUpLogIn/LogoHeading';
import CommanText from '../../components/SignUpLogIn/CommanText';
import OtpInputs from 'react-native-otp-inputs';
import styles from './Styles/OtpStyle';
// import { Ellipsis } from '../../components/animations/AnimatedEllipsis';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParams } from '../../navigation/AuthScreenStack';
import { Section } from '../../components/Section';
import useTheme from '../../theme/useTheme';
import { Text } from '../../components/Text';
import { Logo } from '../../assets/icons/Logo';
import Spacer from '../../components/Spacer/Spacer';
import { ModalToastContext } from '../../context/AppModalToastContext';
import LoadingDots from '@apolloeagle/loading-dots';
import { ModalToast } from '../../components/ModalToast';

type Props = NativeStackScreenProps<AuthStackParams, 'OtpForgot', 'MyStack'>;

function OtpForgotPasswordScreen({ route, navigation }: Props) {
  const theme = useTheme();
  const optConfirm = '123456';
  const [otpInputFill, setOtpInputFill] = useState(true);
  const {
    isShowToast,
    setIsShowToast,
    toastMessage,
    setToastMessage,
    type,
    setType,
  } = useContext(ModalToastContext);
  return (
    <Container>
      <Content hasHeader contentContainerStyle={styles.container}>
        <View style={styles.signupLoginInputGroup}>
          <Section isCenter style={{ marginBottom: 37 }}>
            <Logo size={80} color={theme?.colors.PRIMARY} />
            <Spacer l />
            <Text variant="ultra-large" fontWeight="bold" label="Confirm Your Number" color={theme?.colors.TEXT_PRIMARY} style={{ marginBottom: 38 }} />
          </Section>
          <Section padding="0 70" style={{ marginBottom: 23 }}>
            <Text
              label={`Enter the code we sent over SMS to  ${route.params.phone}:`}
              style={{ textAlign: 'center' }}
              color="#777682"
              fontWeight='medium'
            />
          </Section>
          {otpInputFill ? (
            <OtpInputs
              handleChange={(code) => {
                if (optConfirm === code) {
                  setOtpInputFill(false);
                  setTimeout(() => {
                    setOtpInputFill(true);
                    navigation.navigate('ResetPassword');
                  }, 3000);
                } else if (code.length === 6 && optConfirm !== code) {
                  setOtpInputFill(false);
                  setTimeout(() => {
                    setIsShowToast(true);
                    setType('error');
                    setToastMessage('Wrong otp number');
                    setOtpInputFill(true);
                    navigation.navigate("OtpForgot", {
                      phone: route.params.phone
                    })
                  }, 3000);
                }
              }}
              numberOfInputs={6}
              style={styles.otpInputContainer}
              inputStyles={{
                width: 40,
                height: 40,
                backgroundColor: theme?.colors.BACKGROUND2,
                borderRadius: 12,
                textAlign: 'center',
                fontSize: 14,
                fontFamily: 'PlusJakartaDisplay-Medium'
              }}
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
          <Section isRow isCenter>
            <Text variant="small" label="Didn’t get a code? " color={theme?.colors.TEXT_SECONDARY} />
            <Text variant="small" label="Resent" color={theme?.colors.PRIMARY} />
          </Section>
        </View>
        <View style={styles.bottomContinueBtn}>
          <ModalToast
            isVisible={isShowToast}
            onCloseModal={() => setIsShowToast(false)}
            message={toastMessage}
            type={type}
          />
        </View>
      </Content>
    </Container>
  );
}

export default OtpForgotPasswordScreen;

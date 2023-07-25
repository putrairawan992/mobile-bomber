/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Container, Content} from '../../components';
import OtpInputs from 'react-native-otp-inputs';
import styles from './Styles/OtpStyle';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParams} from '../../navigation/AuthScreenStack';
import {Section} from '../../components/Section';
import Spacer from '../../components/Spacer/Spacer';
import useTheme from '../../theme/useTheme';
import {Text} from '../../components/Text';
import {Logo} from '../../assets/icons/Logo';
import LoadingDots from '@apolloeagle/loading-dots';
import {ModalToastContext} from '../../context/AppModalToastContext';
import {ModalToast} from '../../components/ModalToast';
import GradientText from '../../components/Text/GradientText';
import useThemedStyles from '../../theme/useThemedStyles';
import {ThemeInterface} from '../../theme/ThemeProvider';

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
          <Section>
            <Logo size={64} color={theme?.colors.PRIMARY} />
            <Spacer sm />
            <GradientText colors={['#A060FA', '#A060FA']} style={s.headerText}>
              Confirm Your Number
            </GradientText>
            <Text
              variant="base"
              fontWeight="inter-regular"
              label={`Enter the code we sent over SMS to  ${route.params.phone}:`}
              color={theme?.colors.TEXT_PRIMARY}
              style={{marginBottom: 56}}
            />
          </Section>
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
    headerText: {
      fontSize: 32,
      fontFamily: 'Poppins-SemiBold',
    },
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

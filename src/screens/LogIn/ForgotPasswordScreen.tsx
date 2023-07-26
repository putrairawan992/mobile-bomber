/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import styles from './Styles/LogInStyle';
import {NativeStackScreenProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {AuthStackParams} from '../../navigation/AuthScreenStack';
import useTheme from '../../theme/useTheme';

import {useFormik} from 'formik';
import * as Yup from 'yup';

import useThemedStyles from '../../theme/useThemedStyles';
import {
  Button,
  Container,
  Content,
  GradientText,
  Section,
  Spacer,
  Text,
  TextInput,
} from '../../components/atoms';
import {Logo} from '../../assets/icons';

type Props = NativeStackScreenProps<
  AuthStackParams,
  'ForgotPassword',
  'MyStack'
>;

interface ForgotPasswordInterface {
  phone: string;
}

function ForgotPasswordScreen({navigation}: Props) {
  const theme = useTheme();
  const s = useThemedStyles(Styles);
  const formik = useFormik<ForgotPasswordInterface>({
    initialValues: {
      phone: '',
    },
    validationSchema: Yup.object({
      phone: Yup.string().required('Phone number is required'),
    }),
    // validateOnChange: false,
    enableReinitialize: true,
    onSubmit: values =>
      navigation.navigate('OtpForgot', {
        phone: values.phone,
      }),
  });
  return (
    <Container>
      <Content
        hasHeader
        contentContainerStyle={{
          ...styles.container,
          backgroundColor: theme?.colors.BACKGROUND1,
        }}>
        <Section>
          <Logo size={64} color={theme?.colors.PRIMARY} />
          <Spacer sm />
          <GradientText colors={['#A060FA', '#C800CC']} style={s.headerText}>
            Forgot Your Password?
          </GradientText>
          <Text
            variant="base"
            fontWeight="inter-regular"
            label={
              "No worries! We'll help you get back into the groove. Enter your email to reset your password."
            }
            color={theme?.colors.TEXT_PRIMARY}
            style={{marginBottom: 56}}
          />
        </Section>
        <TextInput
          value={formik.values.phone}
          label="Phone Number"
          errorText={formik.errors.phone}
          onChangeText={formik.handleChange('phone')}
          placeholder="Phone Number"
          isNumeric
        />
        <Spacer xl />
        <Button
          type="primary"
          onPress={() => formik.handleSubmit()}
          title="Submit"
          isLoading={false}
        />

        <Section style={{marginTop: 28}} isRow>
          <Text
            fontWeight="inter-regular"
            variant="base"
            label="Remember the password? "
            color={theme?.colors.TEXT_SECONDARY}
          />
          <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
            <Text
              fontWeight="inter-regular"
              variant="base"
              label="Login Now"
              color={theme?.colors.PRIMARY}
            />
          </TouchableOpacity>
        </Section>
      </Content>
    </Container>
  );
}

export default ForgotPasswordScreen;

const Styles = () =>
  StyleSheet.create({
    headerText: {
      fontSize: 32,
      fontFamily: 'Poppins-SemiBold',
    },
  });

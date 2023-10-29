/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {TouchableOpacity} from 'react-native';

import styles from './Styles/LogInStyle';
import {NativeStackScreenProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {AuthStackParams} from '../../navigation/AuthScreenStack';
import useTheme from '../../theme/useTheme';

import {useFormik} from 'formik';
import * as Yup from 'yup';

import {
  Button,
  Layout,
  Section,
  Spacer,
  Text,
  TextInput,
} from '../../components/atoms';
import {LogoLabel} from '../../components/molecules';
import {ImageBackground} from 'react-native';
import {bgOnboarding} from '../../theme/Images';
import {HEIGHT, WIDTH} from '../../utils/config';

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
  const formik = useFormik<ForgotPasswordInterface>({
    initialValues: {
      phone: '',
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .min(6, 'Please enter valid number.')
        .required('Phone number is required'),
    }),
    // validateOnChange: false,
    enableReinitialize: true,
    onSubmit: values =>
      navigation.navigate('OtpForgot', {
        phone: values.phone,
      }),
  });
  return (
    <ImageBackground
      source={bgOnboarding}
      style={{width: WIDTH, height: HEIGHT}}
      resizeMode="cover">
      <Layout
        backgroundColor="transparent"
        contentContainerStyle={styles.container}>
        <LogoLabel
          colors={theme?.colors.PRIMARY}
          title="Forgot Your Password?"
          subtitle="No worries! We'll help you get back into the groove. Enter your email to reset your password."
        />
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
            variant="base"
            label="Remember the password? "
            color={theme?.colors.TEXT_SECONDARY}
          />
          <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
            <Text
              variant="base"
              label="Login Now"
              color={theme?.colors.PRIMARY}
            />
          </TouchableOpacity>
        </Section>
      </Layout>
    </ImageBackground>
  );
}

export default ForgotPasswordScreen;

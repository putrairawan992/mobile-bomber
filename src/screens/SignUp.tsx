/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Section, Spacer, Text, Layout} from '../components/atoms';
import {TouchableOpacity} from 'react-native';
import useTheme from '../theme/useTheme';
import * as Yup from 'yup';
import {SignUpPayloadInterface} from '../interfaces/UserInterface';
import {AuthStackParams} from '../navigation/AuthScreenStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useFormik} from 'formik';
import {Button, TextInput} from '../components/atoms';
import {LogoLabel} from '../components/molecules';
import styles from './LogIn/Styles/LogInStyle';

type Props = NativeStackScreenProps<AuthStackParams, 'SignUp', 'MyStack'>;

export const SignUp = ({navigation}: Props) => {
  const theme = useTheme();
  const formik = useFormik<SignUpPayloadInterface>({
    initialValues: {
      username: '',
      password: '',
      phone: '',
      confirmPassword: '',
      email: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      phone: Yup.string().required('Phone number is required'),
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password is too short - should be 8 chars minimum.'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), ''], 'Passwords must match')
        .required('Password confirmation is required'),
    }),
    // validateOnChange: false,
    enableReinitialize: true,
    onSubmit: values => {
      navigation.navigate('OtpSignUp', {
        payload: {
          username: values.username,
          password: values.password,
          phone: '+' + values.phone,
          email: values.email,
        },
      });
    },
  });
  return (
    <Layout contentContainerStyle={styles.container}>
      <LogoLabel
        title="Join the Party!"
        subtitle="Create your account now and experience the nightlife like never before."
      />
      <TextInput
        value={formik.values.username}
        label="Username"
        errorText={formik.errors.username}
        onChangeText={formik.handleChange('username')}
        placeholder="Username"
      />
      <Spacer l />
      <TextInput
        value={formik.values.phone}
        label="Phone Number"
        errorText={formik.errors.phone}
        onChangeText={formik.handleChange('phone')}
        placeholder="Phone number"
        isNumeric
      />
      <Spacer l />
      <TextInput
        value={formik.values.email}
        label="Email Address"
        errorText={formik.errors.email}
        onChangeText={formik.handleChange('email')}
        placeholder="Email address"
      />
      <Spacer l />
      <TextInput
        value={formik.values.password}
        label="Password"
        errorText={formik.errors.password}
        onChangeText={formik.handleChange('password')}
        placeholder="Password"
        type="password"
      />
      <Spacer l />
      <TextInput
        value={formik.values.confirmPassword}
        label="Confirm Password"
        errorText={formik.errors.confirmPassword}
        onChangeText={formik.handleChange('confirmPassword')}
        placeholder="Confirm password"
        type="password"
      />
      <Spacer lxx />
      <Button
        type="primary"
        onPress={() => formik.handleSubmit()}
        title="Sign Up"
        isLoading={false}
      />
      <Spacer lxx />
      <Section isRow style={{marginBottom: 30}}>
        <Text
          variant="base"
          label="Already have an account? "
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
  );
};

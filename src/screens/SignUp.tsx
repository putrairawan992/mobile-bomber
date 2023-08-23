/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Section, Spacer, Text, Layout, Gap} from '../components/atoms';
import {Platform, TouchableOpacity} from 'react-native';
import useTheme from '../theme/useTheme';
import * as Yup from 'yup';
import {SignUpPayloadInterface} from '../interfaces/UserInterface';
import {AuthStackParams} from '../navigation/AuthScreenStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useFormik} from 'formik';
import {Button, TextInput} from '../components/atoms';
import {LogoLabel} from '../components/molecules';
import styles from './LogIn/Styles/LogInStyle';
import CheckBox from '@react-native-community/checkbox';

type Props = NativeStackScreenProps<AuthStackParams, 'SignUp', 'MyStack'>;

export const SignUp = ({navigation}: Props) => {
  const theme = useTheme();
  const [isAgree, setIsAgree] = useState<boolean>(false);
  let EMAIL_REGX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
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
      email: Yup.string()
        .required('Email is required')
        .matches(EMAIL_REGX, 'Invalid email address'),
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password is too short - should be 8 chars minimum.'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), ''], 'Passwords must match')
        .required('Password confirmation is required'),
    }),
    validateOnChange: false,
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
        onChangeText={value => {
          formik.setFieldValue('username', value);
          formik.setFieldError('username', undefined);
        }}
        placeholder="Username"
      />
      <Spacer l />
      <TextInput
        value={formik.values.phone}
        label="Phone Number"
        errorText={formik.errors.phone}
        onChangeText={value => {
          formik.setFieldValue('phone', value);
          formik.setFieldError('phone', undefined);
        }}
        placeholder="Phone number"
        isNumeric
      />
      <Spacer l />
      <TextInput
        value={formik.values.email}
        label="Email Address"
        errorText={formik.errors.email}
        onChangeText={value => {
          formik.setFieldValue('email', value);
          formik.setFieldError('email', undefined);
        }}
        placeholder="Email address"
      />
      <Spacer l />
      <TextInput
        value={formik.values.password}
        label="Password"
        errorText={formik.errors.password}
        onChangeText={value => {
          formik.setFieldValue('password', value);
          formik.setFieldError('password', undefined);
        }}
        placeholder="Password"
        type="password"
      />
      <Spacer l />
      <TextInput
        value={formik.values.confirmPassword}
        label="Confirm Password"
        errorText={formik.errors.confirmPassword}
        onChangeText={value => {
          formik.setFieldValue('confirmPassword', value);
          formik.setFieldError('confirmPassword', undefined);
        }}
        placeholder="Confirm password"
        type="password"
      />
      <Gap height={12} />
      <Section isRow>
        <CheckBox
          disabled={false}
          value={isAgree}
          onValueChange={newValue => setIsAgree(newValue)}
          boxType="square"
          onCheckColor={theme?.colors.PRIMARY}
          onTintColor={theme?.colors.PRIMARY}
          onFillColor="#FFF"
          style={{
            marginRight: Platform.OS === 'android' ? 16 : 4,
            width: 14,
            height: 14,
          }}
        />
        <Gap width={4} />
        <Text
          variant="small"
          label="I have read and agree to the Terms and Conditions"
        />
      </Section>
      <Gap height={28} />
      <Button
        type={isAgree ? 'primary' : 'disabled'}
        onPress={() => isAgree && formik.handleSubmit()}
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

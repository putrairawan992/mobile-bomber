/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Section, Spacer, Text, Layout, Gap} from '../components/atoms';
import {ImageBackground, Platform, TouchableOpacity} from 'react-native';
import useTheme from '../theme/useTheme';
import * as Yup from 'yup';
import {
  SignUpPayloadInterface,
  UserLocationInterface,
} from '../interfaces/UserInterface';
import {AuthStackParams} from '../navigation/AuthScreenStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useFormik} from 'formik';
import {Button, TextInput} from '../components/atoms';
import {LogoLabel} from '../components/molecules';
import styles from './LogIn/Styles/LogInStyle';
import CheckBox from '@react-native-community/checkbox';
import {PhoneInput} from '../components/atoms/Form/PhoneInput';
import {COUNTRY_PHONE_CODE, COUNTRY_PHONE_CODE_WITH_ICON} from '../utils/data';
import {Colors} from '../theme';
import {bgOnboarding} from '../theme/Images';
import {HEIGHT, WIDTH} from '../utils/config';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ScrollView} from 'react-native-gesture-handler';
import {LocationService} from '../service/LocationService';
import {useCheckLocation} from '../hooks/useCheckLocation';

type Props = NativeStackScreenProps<AuthStackParams, 'SignUp', 'MyStack'>;

export const SignUp = ({navigation}: Props) => {
  const theme = useTheme();
  const [isAgree, setIsAgree] = useState<boolean>(false);
  const [phoneCode, setPhoneCode] = useState<string>();
  const {currentLocation} = useCheckLocation();
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
      username: Yup.string()
        .required('Username is required')
        .matches(
          /[^A-Za-z0-9]+/,
          'Field must contain at least one special character',
        )
        .min(4, 'Username must be at least 4 characters long'),
      phone: Yup.string()
        .min(6, 'Please enter valid number.')
        .required('Phone number is required'),
      email: Yup.string()
        .required('Email is required')
        .matches(EMAIL_REGX, 'Invalid email address'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(
          /[!@#$%^&*(),.?":{}|<>]/,
          'Password must contain at least one special character',
        )
        .required('Password is required'),
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
          phone:
            (COUNTRY_PHONE_CODE.find(el => el.country === phoneCode)
              ?.code as string) + values.phone,
          email: values.email,
        },
      });
    },
  });

  useEffect(() => {
    const fetchUserLocation = async () => {
      const location: UserLocationInterface =
        await LocationService.geocodeReverse({
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
        });
      const kodearea = COUNTRY_PHONE_CODE.find(
        c => c.country === location.country,
      );
      setPhoneCode(kodearea?.country);
    };
    fetchUserLocation();
  }, [currentLocation]);

  useEffect(() => {
    console.log(phoneCode);
  }, [phoneCode]);
  return (
    <KeyboardAwareScrollView>
      <ImageBackground
        source={bgOnboarding}
        style={{width: WIDTH, height: HEIGHT}}
        resizeMode="cover">
        <ScrollView>
          <Layout
            backgroundColor="transparent"
            contentContainerStyle={styles.container}>
            <LogoLabel
              colors={theme?.colors.PRIMARY}
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
            <PhoneInput
              data={COUNTRY_PHONE_CODE_WITH_ICON.map(item => {
                return {
                  value: item.name,
                  label: item.dial_code,
                  image: item.flag,
                };
              })}
              errorText={formik.errors.phone ?? ''}
              value={phoneCode}
              onChange={value => setPhoneCode(value)}
              label="Phone number"
              textValue={formik.values.phone}
              onChangeText={value => {
                formik.setFieldValue('phone', value);
                formik.setFieldError('phone', undefined);
              }}
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
            <Section isRow padding="0px 4px">
              <CheckBox
                disabled={false}
                value={isAgree}
                onValueChange={newValue => setIsAgree(newValue)}
                boxType="square"
                tintColors={{
                  true: theme?.colors.PRIMARY,
                  false: Colors['white-100'],
                }}
                style={{
                  marginRight: Platform.OS === 'android' ? 16 : 4,
                  width: 20,
                  height: 20,
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
        </ScrollView>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
};

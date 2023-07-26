/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Content,
  Container,
  GradientText,
  Section,
  Spacer,
  Text,
} from '../components/atoms';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Logo} from '../assets/icons/Logo';
import useTheme from '../theme/useTheme';
import * as Yup from 'yup';
import {SignUpPayloadInterface} from '../interfaces/UserInterface';
import {AuthStackParams} from '../navigation/AuthScreenStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import useThemedStyles from '../theme/useThemedStyles';
import {useFormik} from 'formik';
import {Button, TextInput} from '../components/atoms';

type Props = NativeStackScreenProps<AuthStackParams, 'SignUp', 'MyStack'>;

export const SignUp = ({navigation}: Props) => {
  const theme = useTheme();
  const s = useThemedStyles(Styles);

  const formik = useFormik<SignUpPayloadInterface>({
    initialValues: {
      username: '',
      password: '',
      phone: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('username is required'),
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
    onSubmit: () => {
      navigation.navigate('OtpSignUp', {
        phone: formik.values.phone,
      });
    },
  });
  return (
    <Container>
      <Content
        hasHeader
        contentContainerStyle={{
          flex: 1,
          paddingTop: 50,
          backgroundColor: theme?.colors.BACKGROUND1,
          paddingHorizontal: 27,
        }}>
        <Section>
          <Logo size={64} color={theme?.colors.PRIMARY} />
          <Spacer sm />
          <GradientText colors={['#A060FA', '#A060FA']} style={s.headerText}>
            Join the Party!
          </GradientText>
          <Text
            variant="base"
            fontWeight="inter-regular"
            label="Create your account now and experience the nightlife like never before."
            color={theme?.colors.TEXT_PRIMARY}
            style={{marginBottom: 56}}
          />
        </Section>
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
          label="Phone number"
          errorText={formik.errors.phone}
          onChangeText={formik.handleChange('phone')}
          placeholder="Phone number"
          isNumeric
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
        <Section isRow>
          <Text
            fontWeight="inter-regular"
            variant="base"
            label="Already have an account? "
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
};

const Styles = () =>
  StyleSheet.create({
    headerText: {
      fontSize: 32,
      fontFamily: 'Poppins-SemiBold',
    },
  });

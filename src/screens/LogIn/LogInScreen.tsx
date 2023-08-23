import * as React from 'react';
import * as Yup from 'yup';
import {TouchableOpacity} from 'react-native';

import {AuthStackParams} from '../../navigation/AuthScreenStack';
import {LoginPayloadInterface} from '../../interfaces/UserInterface';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import styles from './Styles/LogInStyle';
import {useFormik} from 'formik';
import useTheme from '../../theme/useTheme';
import {
  Button,
  Section,
  Spacer,
  Text,
  TextInput,
  Layout,
} from '../../components/atoms';
import {LogoLabel, ModalToast} from '../../components/molecules';
import {useContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {AuthService} from '../../service/AuthService';
import {ModalToastContext} from '../../context/AppModalToastContext';

type Props = NativeStackScreenProps<AuthStackParams, 'LogIn', 'MyStack'>;

function LogInScreen({navigation}: Props) {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    isShowToast,
    setIsShowToast,
    toastMessage,
    setToastMessage,
    type,
    setType,
  } = useContext(ModalToastContext);
  const formik = useFormik<LoginPayloadInterface>({
    initialValues: {
      phone: '',
      password: '',
    },
    validationSchema: Yup.object({
      phone: Yup.string().required('Phone number is required'),
      password: Yup.string().required('Password is required'),
    }),
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: values => handleSignIn('+' + values.phone, values.password),
  });

  const onAuthStateChanged = async (userAuth: any) => {
    if (!userAuth) {
      return;
    } else {
    }
  };

  const openToast = (toastType: 'success' | 'error', message: string) => {
    setIsShowToast(true);
    setType(toastType);
    setToastMessage(message);
  };

  const handleSignIn = async (phone: string, password: string) => {
    try {
      setIsLoading(true);
      const login = await AuthService.postLogin({
        phone,
        password,
      });
      if (login.error) {
        openToast('error', login.message);
        setIsLoading(false);
      } else {
        navigation.navigate('OtpSignIn', {
          userData: {
            id: login.data.id,
            fullName: login.data.name,
            email: login.data.email,
            username: login.data.username,
            phone,
            bio: '',
            age: 0,
            photoUrl: login.data.profilePictureUrl,
          },
          isResend: false,
        });
        setIsLoading(false);
      }
    } catch (error: any) {}
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => {
      subscriber;
    };
  }, []);

  return (
    <Layout contentContainerStyle={styles.container}>
      <LogoLabel
        title="Nightlife Awaits!"
        subtitle="Access your account and get ready for an unforgettable night of fun and celebration."
      />
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
      <Spacer sm />
      <TouchableOpacity
        style={styles.forgotPasswordLink}
        onPress={() => navigation.navigate('ForgotPassword')}>
        <Text label="Forgot Password?" color={theme?.colors.PRIMARY} />
      </TouchableOpacity>
      <Spacer lxx />
      <Button
        type="primary"
        onPress={() => formik.handleSubmit()}
        title="Sign In"
        isLoading={isLoading}
      />
      <Spacer lxx />
      <Section isRow>
        <Text
          variant="base"
          label="Don’t have an account yet? "
          color={theme?.colors.TEXT_SECONDARY}
        />
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text
            variant="base"
            label="Register Now"
            color={theme?.colors.PRIMARY}
          />
        </TouchableOpacity>
      </Section>
      <ModalToast
        isVisible={isShowToast}
        onCloseModal={() => setIsShowToast(false)}
        message={toastMessage}
        type={type}
      />
    </Layout>
  );
}

export default LogInScreen;

/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import * as Yup from 'yup';
import {TouchableOpacity} from 'react-native';

import {AuthStackParams} from '../../navigation/AuthScreenStack';
import {
  LoginPayloadInterface,
  UserInterface,
} from '../../interfaces/UserInterface';
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
  Gap,
  Loading,
} from '../../components/atoms';
import {LogoLabel, ModalToast} from '../../components/molecules';
import {useContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {AuthService} from '../../service/AuthService';
import {ModalToastContext} from '../../context/AppModalToastContext';
import {setStorage} from '../../service/mmkvStorage';
import {useDispatch} from 'react-redux';
import {loginSuccess, setUserType} from '../../store/user/userActions';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Google} from 'iconsax-react-native';
import Config from 'react-native-config';
import {PhoneInput} from '../../components/atoms/Form/PhoneInput';
import {COUNTRY_PHONE_CODE} from '../../utils/data';

type Props = NativeStackScreenProps<AuthStackParams, 'LogIn', 'MyStack'>;

function LogInScreen({navigation}: Props) {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingDj, setIsLoadingDj] = useState<boolean>(false);
  const [phoneCode, setPhoneCode] = useState<string>(
    COUNTRY_PHONE_CODE[0].country,
  );
  const [isLoadingGoogle, setIsLoadingGoogle] = useState<boolean>(false);
  const dispatch = useDispatch();
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
      phone: Yup.string()
        .min(6, 'Please enter valid number.')
        .required('Phone number is required'),
      password: Yup.string().required('Password is required'),
    }),
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: values =>
      handleSignIn(
        (COUNTRY_PHONE_CODE.find(el => el.country === phoneCode)
          ?.code as string) + values.phone,
        values.password,
      ),
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function formatPhoneNumber(phoneNumber: string): string {
    // Hapus semua karakter non-digit dari nomor telepon
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');

    // Periksa apakah nomor telepon diawali dengan "0"
    if (cleanedPhoneNumber.startsWith('0')) {
      // Jika ya, ganti "0" dengan "62"
      return `62${cleanedPhoneNumber.slice(1)}`;
    } else if (cleanedPhoneNumber.startsWith('+62')) {
      // Jika diawali dengan "+62", hapus tanda "+" dan biarkan "62" tetap
      return `62${cleanedPhoneNumber.slice(3)}`;
    } else {
      // Jika tidak diawali dengan "0" atau "+62", kembalikan apa adanya
      return cleanedPhoneNumber;
    }
  }

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
    } catch (error: any) {
      openToast('error', error.response.data.message);
      setIsLoading(false);
    }
  };

  const googleLogin = async () => {
    try {
      setIsLoadingGoogle(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const res = await AuthService.checkRegisteredEmail({
        email: userInfo.user.email,
      });

      let userAuth;
      if (res?.data?.length) {
        const data = res?.data[0];
        userAuth = {
          id: data.id,
          fullName: data.username,
          username: data.username,
          phone: data.phone,
          photoUrl: data.photoUrl,
          email: data.email,
          creationTime: 0,
          lastSignInTime: 0,
          emailVerified: false,
          age: 0,
          bio: data.bio,
        };
      } else {
        await AuthService.postRegister({
          id: userInfo.user.id.toString(),
          username: userInfo.user.givenName as string,
          phone: '',
          email: userInfo.user.email,
          password: '',
          photo_url: userInfo.user.photo as string,
        });
        userAuth = {
          id: userInfo.user.id.toString(),
          fullName: userInfo.user.name as string,
          username: userInfo.user.givenName as string,
          phone: '',
          photoUrl: userInfo.user.photo as string,
          email: userInfo.user.email,
          creationTime: 0,
          lastSignInTime: 0,
          emailVerified: false,
          age: 0,
          bio: '',
        };
      }
      handleAutoSignIn(userAuth);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(error);
      }
      setIsLoadingGoogle(false);
    }
  };

  const handleAutoSignIn = async (userAuth: UserInterface) => {
    await setStorage('userAuth', JSON.stringify(userAuth));
    await setStorage('userType', 'regular');
    await setStorage('refreshToken', userAuth.id as string);
    setIsLoadingGoogle(false);
    openToast('success', 'Login successfully');
    setTimeout(() => {
      dispatch(loginSuccess(userAuth));
      dispatch(setUserType('regular'));
    }, 2000);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => {
      subscriber;
    };
  }, []);

  const webClientId = Config.WEB_CLIENT_ID;

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: webClientId,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const djSignIn = async () => {
    setIsLoadingDj(true);
    const userAuth = {
      id: 'abc',
      fullName: 'Calvin Harris',
      username: 'calvin.harris',
      phone: '+6282119395389',
      photoUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Calvin_Harris_-_Rock_in_Rio_Madrid_2012_-_09.jpg/220px-Calvin_Harris_-_Rock_in_Rio_Madrid_2012_-_09.jpg',
      email: 'calvin.harris@gmail.com',
      creationTime: 0,
      lastSignInTime: 0,
      emailVerified: false,
      age: 0,
      bio: '',
    };
    await setStorage('userAuth', JSON.stringify(userAuth));
    await setStorage('userType', 'dj');
    await setStorage('refreshToken', JSON.stringify('abc'));
    setIsLoadingDj(false);
    openToast('success', 'Login as DJ successfully');
    setTimeout(() => {
      dispatch(loginSuccess(userAuth));
      dispatch(setUserType('dj'));
    }, 2000);
  };

  return (
    <Layout contentContainerStyle={styles.container}>
      {(isLoadingDj || isLoadingGoogle) && <Loading />}
      <LogoLabel
        title="Nightlife Awaits!"
        subtitle="Access your account and get ready for an unforgettable night of fun and celebration."
      />
      <PhoneInput
        data={COUNTRY_PHONE_CODE.map(item => {
          return {
            value: item.country,
            label: item.code,
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
        value={formik.values.password}
        label="Password"
        errorText={formik.errors.password}
        onChangeText={value => {
          formik.setFieldValue('password', value);
          formik.setFieldError('password', undefined);
        }}
        placeholder="password"
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
      <Spacer sm />
      <Button
        type="outlined"
        onPress={googleLogin}
        title="Login with Google"
        isLoading={isLoadingGoogle}
        LeftComponent={
          <Google
            size={16}
            color={theme?.colors.PRIMARY}
            style={{marginRight: 8}}
          />
        }
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
      <Gap height={10} />
      <Section isRow>
        <Text
          variant="base"
          label="Are you DJ ?"
          color={theme?.colors.TEXT_SECONDARY}
        />
        <TouchableOpacity onPress={djSignIn}>
          <Text
            variant="base"
            label=" Enter Here"
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

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import {
  LayoutAnimation,
  Platform,
  SafeAreaView,
  StyleSheet,
  Switch,
  UIManager,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { MMKVLoader } from 'react-native-mmkv-storage';
import { EntryAnimation } from '../components/animations/EntryAnimation';
import Button from '../components/Button';
import { TextInput } from '../components/Form/TextInput';
import Spacer from '../components/Spacer/Spacer';
import { Text } from '../components/Text';
import {
  LoginPayloadInterface,
  UserInterface,
} from '../interfaces/UserInterface';
import { loginSuccess } from '../store/user/userActions';
import { ThemeInterface } from '../theme/ThemeProvider';
import useTheme from '../theme/useTheme';
import useThemedStyles from '../theme/useThemedStyles';
import { ModalToastContext } from '../context/AppModalToastContext';
import { ModalToast } from '../components/ModalToast';

const userList: UserInterface[] = [
  {
    userId: '1',
    name: 'reza',
    email: 'lukman.reza@gmail.com',
    password: 'admin',
    token: 'abc',
  },
  {
    userId: '2',
    name: 'lukman',
    email: 'reza.lukman@gmail.com',
    password: 'coba',
    token: 'def',
  },
  {
    userId: '3',
    name: 'admin',
    email: 'admin@admin.com',
    password: 'admin',
    token: 'ghi',
  },
];

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const MMKV = new MMKVLoader().initialize(); // Returns an MMKV Instance
/* eslint-disable import/prefer-default-export */
export const LoginScreen = () => {
  const style = useThemedStyles(styles);
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  const {
    isShowToast,
    setIsShowToast,
    toastMessage,
    setToastMessage,
    type,
    setType,
  } = useContext(ModalToastContext);

  const onExpand = () => {
    LayoutAnimation.configureNext({
      duration: 300,
      update: {
        type: 'easeInEaseOut',
      },
    });
    setIsExpand(!isExpand);
  };

  const formik = useFormik<LoginPayloadInterface>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Must be valid email')
        .required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: () => onLogin(),
  });

  // eslint-disable-next-line @typescript-eslint/require-await
  const onLogin = async () => {
    try {
      setIsLoading(true);
      // eslint-disable-next-line max-len
      const loginResponse = userList.find(
        (user: UserInterface) => user.email === formik.values.email
          && user.password === formik.values.password,
      );
      setTimeout(async () => {
        if (loginResponse) {
          const {
            userId, name, email, token,
          } = loginResponse;
          const userAuth: UserInterface = {
            userId,
            name,
            email,
            token,
          };
          dispatch(loginSuccess(userAuth));
          await MMKV.setStringAsync('userAuth', JSON.stringify(userAuth));
        } else {
          setIsShowToast(true);
          setType('error');
          setToastMessage('Wrong email / password');
        }
        setIsLoading(false);
      }, 2000);
    } catch (error: any) {
      /* empty */
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={{ position: 'absolute', bottom: 16 }}>
        <Text
          variant="small"
          label="Login demo: admin@admin.com / admin"
          fontStyle="italic"
        />
      </View>
      <EntryAnimation index={0}>
        <Text variant="extra-large" label="Login" />
      </EntryAnimation>

      <Spacer s />
      {isExpand && (
        <>
          <TextInput
            value={formik.values.email}
            label="Email"
            errorText={formik.errors.email}
            onChangeText={formik.handleChange('email')}
            placeholder="Your email"
          />
          <Spacer s />
          <TextInput
            value={formik.values.password}
            label="Password"
            errorText={formik.errors.password}
            onChangeText={formik.handleChange('password')}
            placeholder="Your secret password"
            secureTextEntry
          />
          <Spacer m />
        </>
      )}
      <EntryAnimation index={1}>
        <Button
          title={isExpand ? 'Submit' : 'Press Here'}
          onPress={isExpand ? () => formik.handleSubmit() : onExpand}
          isLoading={isLoading}
          type="primary"
          noRound
        />
      </EntryAnimation>
      <Spacer m />
      <Switch onValueChange={theme?.toggleTheme} value={theme?.isLightTheme} />
      <ModalToast
        isVisible={isShowToast}
        onCloseModal={() => setIsShowToast(false)}
        message={toastMessage}
        type={type}
      />
    </SafeAreaView>
  );
};

const styles = (theme: ThemeInterface) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.BACKGROUND1,
  },
});

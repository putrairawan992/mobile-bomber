/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Button, Spacer, TextInput, Layout} from '../../components/atoms';
import styles from './Styles/LogInStyle';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParams} from '../../navigation/AuthScreenStack';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {ResetPasswordInterface} from '../../interfaces/UserInterface';
import {LogoLabel} from '../../components/molecules';
import {ImageBackground} from 'react-native';
import {bgOnboarding} from '../../theme/Images';
import {HEIGHT, WIDTH} from '../../utils/config';

type Props = NativeStackScreenProps<
  AuthStackParams,
  'ResetPassword',
  'MyStack'
>;

function ResetPasswordScreen({navigation}: Props) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const formik = useFormik<ResetPasswordInterface>({
    initialValues: {
      password: '',
      rePassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password is too short - should be 8 chars minimum.'),
      rePassword: Yup.string()
        .oneOf([Yup.ref('password'), ''], 'Passwords must match')
        .required('Password confirmation is required'),
    }),
    // validateOnChange: false,
    enableReinitialize: true,
    onSubmit: () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigation.navigate('SuccessPassword');
      }, 3000);
    },
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
          title="Reset Your Password"
          subtitle="Enter a different password with the previous"
        />
        <TextInput
          value={formik.values.password}
          label="New Password"
          errorText={formik.errors.password}
          onChangeText={formik.handleChange('password')}
          placeholder="Password"
          type="password"
        />
        <Spacer l />
        <TextInput
          value={formik.values.rePassword}
          label="Confirm Password"
          errorText={formik.errors.rePassword}
          onChangeText={formik.handleChange('rePassword')}
          placeholder="Confirm password"
          type="password"
          style={{marginBottom: 37}}
        />
        <Button
          type="primary"
          onPress={() => formik.handleSubmit()}
          title="Reset Password"
          isLoading={isLoading}
        />
      </Layout>
    </ImageBackground>
  );
}

export default ResetPasswordScreen;

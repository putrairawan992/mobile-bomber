/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  Content,
  Container,
  Button,
  Spacer,
  TextInput,
} from '../../components/atoms';
import styles from './Styles/LogInStyle';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParams} from '../../navigation/AuthScreenStack';
import useTheme from '../../theme/useTheme';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {ResetPasswordInterface} from '../../interfaces/UserInterface';
import {LogoLabel} from '../../components/molecules';

type Props = NativeStackScreenProps<
  AuthStackParams,
  'ResetPassword',
  'MyStack'
>;

function ResetPasswordScreen({navigation}: Props) {
  const theme = useTheme();
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
    <Container>
      <Content
        hasHeader
        contentContainerStyle={{
          ...styles.container,
          backgroundColor: theme?.colors.BACKGROUND1,
        }}>
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
      </Content>
    </Container>
  );
}

export default ResetPasswordScreen;

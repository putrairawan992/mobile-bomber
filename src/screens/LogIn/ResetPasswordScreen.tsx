/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from 'react';

import { Container, Content, Header } from '../../components';

import CommanText from '../../components/SignUpLogIn/CommanText';
import ResetPassword from '../../components/SignUpLogIn/ResetPassword';
import { View } from 'react-native';
import styles from './Styles/LogInStyle';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParams } from '../../navigation/AuthScreenStack';
import Button from '../../components/Button';
import useTheme from '../../theme/useTheme';
import { Text } from '../../components/Text';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ResetPasswordInterface } from '../../interfaces/UserInterface';
import { TextInput } from '../../components/Form/TextInput';
import Spacer from '../../components/Spacer/Spacer';

type Props = NativeStackScreenProps<AuthStackParams, 'ResetPassword', 'MyStack'>;

function ResetPasswordScreen({ navigation }: Props) {
  const theme = useTheme();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const formik = useFormik<ResetPasswordInterface>({
    initialValues: {
      password: '',
      rePassword: ''
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password is too short - should be 8 chars minimum.'),
      rePassword: Yup.string()
        .oneOf([Yup.ref('password'), ''], 'Passwords must match')
        .required("Password confirmation is required"),
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
      <Header
        transparent
        hasBackBtn
        title="Reset Password"
        onBackPress={() => navigation.goBack()}
      />
      <Content hasHeader contentContainerStyle={styles.resetPasswordContainer}>
        <View style={styles.signupLoginInputGroup}>
          <Text fontWeight='medium' label="Enter a different password with the previous" color={theme?.colors.TEXT_SECONDARY} style={{ textAlign: 'center', marginBottom: 33 }} />
          <TextInput
            value={formik.values.password}
            label="New Password"
            errorText={formik.errors.password}
            onChangeText={formik.handleChange('password')}
            placeholder=""
            type="password"
          />
          <Spacer l />
          <TextInput
            value={formik.values.rePassword}
            label="Confirm Password"
            errorText={formik.errors.rePassword}
            onChangeText={formik.handleChange('rePassword')}
            placeholder=""
            type="password"
            style={{ marginBottom: 37 }}
          />
          <Button
            type="primary"
            onPress={() =>
              formik.handleSubmit()
            }
            title="Reset Password"
            isLoading={isLoading}
          />
        </View>
      </Content>
    </Container>
  );
}

export default ResetPasswordScreen;

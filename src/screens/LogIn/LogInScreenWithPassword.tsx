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
import {LogoLabel} from '../../components/molecules';

type Props = NativeStackScreenProps<AuthStackParams, 'LogIn', 'MyStack'>;

function LogInScreenWithPassword({navigation}: Props) {
  const theme = useTheme();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const formik = useFormik<LoginPayloadInterface>({
    initialValues: {
      password: '',
      phone: '',
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .min(6, 'Please enter valid number.')
        .required('Phone number is required'),
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password is too short - should be 8 chars minimum.'),
    }),
    // validateOnChange: false,
    enableReinitialize: true,
    onSubmit: () => {
      setIsLoading(true);
      // setTimeout(() => {
      //   dispatch(
      //     loginSuccess({
      //       userId: 'ABC123',
      //       username: 'John Wick',
      //       phone: formik.values.phone,
      //       token: 'DEF456',
      //     }),
      //   );
      // }, 3000);
    },
  });
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
    </Layout>
  );
}

export default LogInScreenWithPassword;

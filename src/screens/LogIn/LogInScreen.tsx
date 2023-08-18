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
import {useEffect} from 'react';
import auth from '@react-native-firebase/auth';

type Props = NativeStackScreenProps<AuthStackParams, 'LogIn', 'MyStack'>;

function LogInScreen({navigation}: Props) {
  const theme = useTheme();
  const formik = useFormik<LoginPayloadInterface>({
    initialValues: {
      phone: '',
    },
    validationSchema: Yup.object({
      phone: Yup.string().required('Phone number is required'),
    }),
    // validateOnChange: false,
    enableReinitialize: true,
    onSubmit: () => {
      navigation.navigate('OtpSignIn', {
        phone: '+' + formik.values.phone,
        isResend: false,
      });
    },
  });

  const onAuthStateChanged = async (userAuth: any) => {
    if (!userAuth) {
      return;
    } else {
    }
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
        onChangeText={formik.handleChange('phone')}
        placeholder="Phone number"
        isNumeric
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
        isLoading={false}
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

export default LogInScreen;

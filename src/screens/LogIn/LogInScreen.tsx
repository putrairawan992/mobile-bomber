/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from 'react';
import * as Yup from 'yup';

import { Container, Content } from '../../components';
import { TouchableOpacity, View } from 'react-native';

import { AuthStackParams } from '../../navigation/AuthScreenStack';
import Button from '../../components/Button';
import CommanText from '../../components/SignUpLogIn/CommanText';
import GoogleFaceBookBtn from '../../components/SignUpLogIn/GoogleFaceBookBtn';
import { Images } from '../../theme';
import { LoginPayloadInterface } from '../../interfaces/UserInterface';
import { Logo } from '../../assets/icons/Logo';
import LogoHeading from '../../components/SignUpLogIn/LogoHeading';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Section } from '../../components/Section';
import Spacer from '../../components/Spacer/Spacer';
import { Text } from '../../components/Text';
import { TextInput } from '../../components/Form/TextInput';
import styles from './Styles/LogInStyle';
import { useFormik } from 'formik';
import useTheme from '../../theme/useTheme';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/user/userActions';

type Props = NativeStackScreenProps<AuthStackParams, 'LogIn', 'MyStack'>;

function LogInScreen({ navigation }: Props) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const formik = useFormik<LoginPayloadInterface>({
    initialValues: {
      password: '',
      phone: ''
    },
    validationSchema: Yup.object({
      phone: Yup.string().required('Phone number is required'),
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password is too short - should be 8 chars minimum.')
    }),
    // validateOnChange: false,
    enableReinitialize: true,
    onSubmit: () => {
      setIsLoading(true);
      setTimeout(() => {
        dispatch(loginSuccess({
          userId: 'ABC123',
          fullName: 'John Wick',
          email: 'john.wick@gmail.com',
          token: 'DEF456'
        }))
      }, 3000);
    }
  });
  return (
    <Container>
      <Content
        hasHeader
        contentContainerStyle={styles.container}
        extraScrollHeight={1}>
        <Section isCenter>
          <Logo size={80} color={theme?.colors.PRIMARY} />
          <Spacer l />
          <Text variant="ultra-large" fontWeight="bold" label="Log in" color={theme?.colors.TEXT_PRIMARY} style={{ marginBottom: 38 }} />
        </Section>
        <View style={styles.signupLoginInputGroup}>
          <TextInput
            value={formik.values.phone}
            label=""
            errorText={formik.errors.phone}
            onChangeText={formik.handleChange('phone')}
            placeholder="Phone Number"
            isNumeric
          />
          <Spacer l />
          <TextInput
            value={formik.values.password}
            label=""
            errorText={formik.errors.password}
            onChangeText={formik.handleChange('password')}
            placeholder="Password"
            type="password"
          />
          <Spacer l />
          <TouchableOpacity
            style={styles.forgotPasswordLink}
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text variant="small" label="Forgot your password?" color={theme?.colors.TEXT_SECONDARY} />
          </TouchableOpacity>
          <Button
            type="primary"
            onPress={() =>
              formik.handleSubmit()
            }
            title="Log In"
            isLoading={isLoading}
          />
          <Spacer lxx />
          <Section isCenter >
            <Text variant="small" label="Or log in using" color={theme?.colors.TEXT_SECONDARY} />
          </Section>
          <Spacer lxx />
          <Section isRow isBetween>
            <GoogleFaceBookBtn
              googleImg
              btnImage={Images.Google}
              btnText="Google"
            />
            <GoogleFaceBookBtn btnImage={Images.Facebook} btnText="Facebook" />
          </Section>
          <Section isCenter isRow style={{
            marginTop: 128
          }}>
            <Text variant="small" label="Don’t have an account yet? " color={theme?.colors.TEXT_SECONDARY} />
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text variant="small" label="Sign up" color={theme?.colors.PRIMARY} />
            </TouchableOpacity>
          </Section>

        </View>
      </Content>
    </Container>
  );
}

export default LogInScreen;

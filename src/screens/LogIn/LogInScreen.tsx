/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import * as Yup from 'yup';

import {Container, Content} from '../../components';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {AuthStackParams} from '../../navigation/AuthScreenStack';
import Button from '../../components/Button';
import {LoginPayloadInterface} from '../../interfaces/UserInterface';
import {Logo} from '../../assets/icons/Logo';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Section} from '../../components/Section';
import Spacer from '../../components/Spacer/Spacer';
import {Text} from '../../components/Text';
import {TextInput} from '../../components/Form/TextInput';
import styles from './Styles/LogInStyle';
import {useFormik} from 'formik';
import useTheme from '../../theme/useTheme';
import {useDispatch} from 'react-redux';
import {loginSuccess} from '../../store/user/userActions';
import GradientText from '../../components/Text/GradientText';
import useThemedStyles from '../../theme/useThemedStyles';

type Props = NativeStackScreenProps<AuthStackParams, 'LogIn', 'MyStack'>;

function LogInScreen({navigation}: Props) {
  const theme = useTheme();
  const s = useThemedStyles(Styles);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const formik = useFormik<LoginPayloadInterface>({
    initialValues: {
      password: '',
      phone: '',
    },
    validationSchema: Yup.object({
      phone: Yup.string().required('Phone number is required'),
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password is too short - should be 8 chars minimum.'),
    }),
    // validateOnChange: false,
    enableReinitialize: true,
    onSubmit: () => {
      setIsLoading(true);
      setTimeout(() => {
        dispatch(
          loginSuccess({
            userId: 'ABC123',
            username: 'John Wick',
            phone: formik.values.phone,
            token: 'DEF456',
          }),
        );
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
        }}
        extraScrollHeight={1}>
        <Section>
          <Logo size={64} color={theme?.colors.PRIMARY} />
          <Spacer sm />
          <GradientText colors={['#A060FA', '#C800CC']} style={s.headerText}>
            Nightlife Awaits!
          </GradientText>
          <Text
            variant="base"
            fontWeight="inter-regular"
            label="Access your account and get ready for an unforgettable night of fun and celebration."
            color={theme?.colors.TEXT_PRIMARY}
            style={{marginBottom: 56}}
          />
        </Section>
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
            fontWeight="inter-regular"
            variant="base"
            label="Don’t have an account yet? "
            color={theme?.colors.TEXT_SECONDARY}
          />
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text
              fontWeight="inter-regular"
              variant="base"
              label="Register Now"
              color={theme?.colors.PRIMARY}
            />
          </TouchableOpacity>
        </Section>
      </Content>
    </Container>
  );
}

export default LogInScreen;

const Styles = () =>
  StyleSheet.create({
    headerText: {
      fontSize: 32,
      fontFamily: 'Poppins-SemiBold',
    },
  });

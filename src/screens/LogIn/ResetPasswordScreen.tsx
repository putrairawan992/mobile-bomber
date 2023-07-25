/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Container, Content} from '../../components';
import {StyleSheet} from 'react-native';
import styles from './Styles/LogInStyle';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParams} from '../../navigation/AuthScreenStack';
import Button from '../../components/Button';
import useTheme from '../../theme/useTheme';
import {Text} from '../../components/Text';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {ResetPasswordInterface} from '../../interfaces/UserInterface';
import {TextInput} from '../../components/Form/TextInput';
import Spacer from '../../components/Spacer/Spacer';
import {Section} from '../../components/Section';
import GradientText from '../../components/Text/GradientText';
import {Logo} from '../../assets/icons/Logo';
import useThemedStyles from '../../theme/useThemedStyles';

type Props = NativeStackScreenProps<
  AuthStackParams,
  'ResetPassword',
  'MyStack'
>;

function ResetPasswordScreen({navigation}: Props) {
  const theme = useTheme();
  const s = useThemedStyles(Styles);
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
        <Section>
          <Logo size={64} color={theme?.colors.PRIMARY} />
          <Spacer sm />
          <GradientText colors={['#A060FA', '#C800CC']} style={s.headerText}>
            Reset Your Password
          </GradientText>
          <Text
            variant="base"
            fontWeight="inter-regular"
            label="Enter a different password with the previous"
            color={theme?.colors.TEXT_PRIMARY}
            style={{marginBottom: 56}}
          />
        </Section>
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

const Styles = () =>
  StyleSheet.create({
    headerText: {
      fontSize: 32,
      fontFamily: 'Poppins-SemiBold',
    },
  });

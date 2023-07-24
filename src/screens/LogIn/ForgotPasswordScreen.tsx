/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from 'react';

import {Container, Content} from '../../components';
import {TouchableOpacity, View} from 'react-native';

import styles from './Styles/LogInStyle';
import {NativeStackScreenProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {AuthStackParams} from '../../navigation/AuthScreenStack';
import Button from '../../components/Button';
import useTheme from '../../theme/useTheme';
import {Section} from '../../components/Section';
import {Text} from '../../components/Text';
import Spacer from '../../components/Spacer/Spacer';
import {Logo} from '../../assets/icons/Logo';
import {TextInput} from '../../components/Form/TextInput';
import {useFormik} from 'formik';
import * as Yup from 'yup';

type Props = NativeStackScreenProps<
  AuthStackParams,
  'ForgotPassword',
  'MyStack'
>;

interface ForgotPasswordInterface {
  phone: string;
}

function ForgotPasswordScreen({navigation}: Props) {
  const theme = useTheme();
  const formik = useFormik<ForgotPasswordInterface>({
    initialValues: {
      phone: '',
    },
    validationSchema: Yup.object({
      phone: Yup.string().required('Phone number is required'),
    }),
    // validateOnChange: false,
    enableReinitialize: true,
    onSubmit: values =>
      navigation.navigate('OtpForgot', {
        phone: values.phone,
      }),
  });
  return (
    <Container>
      <Content hasHeader contentContainerStyle={styles.container}>
        <Section isCenter>
          <Logo size={80} color={theme?.colors.PRIMARY} />
          <Spacer l />
          <Text
            variant="ultra-large"
            fontWeight="bold"
            label="Forgot Password"
            color={theme?.colors.TEXT_PRIMARY}
            style={{marginBottom: 38}}
          />
        </Section>
        <View style={styles.signupLoginInputGroup}>
          <Text
            fontWeight="medium"
            label="Enter your registered phone number below"
            color={theme?.colors.TEXT_SECONDARY}
            style={{textAlign: 'center', marginBottom: 23}}
          />
          <TextInput
            value={formik.values.phone}
            label=""
            errorText={formik.errors.phone}
            onChangeText={formik.handleChange('phone')}
            placeholder="Phone Number"
            isNumeric
          />
          <Spacer xl />
          <Button
            type="primary"
            onPress={() => formik.handleSubmit()}
            title="Submit"
            isLoading={false}
          />
        </View>
        <Section
          isCenter
          isRow
          style={{
            marginTop: 128,
          }}>
          <Text
            variant="small"
            label="Remember the password? "
            color={theme?.colors.TEXT_SECONDARY}
          />
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text
              variant="small"
              label="Log in"
              color={theme?.colors.PRIMARY}
            />
          </TouchableOpacity>
        </Section>
      </Content>
    </Container>
  );
}

export default ForgotPasswordScreen;

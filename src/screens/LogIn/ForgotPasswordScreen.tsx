/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {TouchableOpacity} from 'react-native';

import styles from './Styles/LogInStyle';
import {NativeStackScreenProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {AuthStackParams} from '../../navigation/AuthScreenStack';
import useTheme from '../../theme/useTheme';

import {useFormik} from 'formik';
import * as Yup from 'yup';

import {
  Button,
  DefaultText,
  Layout,
  Section,
  Spacer,
  Text,
} from '../../components/atoms';
import {LogoLabel} from '../../components/molecules';
import {ImageBackground} from 'react-native';
import {bgOnboarding} from '../../theme/Images';
import {HEIGHT, WIDTH} from '../../utils/config';
import {PhoneInput} from '../../components/atoms/Form/PhoneInput';
import {
  COUNTRY_PHONE_CODE,
  COUNTRY_PHONE_CODE_WITH_ICON,
} from '../../utils/data';

type Props = NativeStackScreenProps<
  AuthStackParams,
  'ForgotPassword',
  'MyStack'
>;

interface ForgotPasswordInterface {
  phone: string;
}

function ForgotPasswordScreen({navigation}: Props) {
  const [phoneCode, setPhoneCode] = React.useState<string>(
    COUNTRY_PHONE_CODE[0].country,
  );
  const theme = useTheme();
  const formik = useFormik<ForgotPasswordInterface>({
    initialValues: {
      phone: '',
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .min(6, 'Please enter valid number.')
        .required('Phone number is required'),
    }),
    // validateOnChange: false,
    enableReinitialize: true,
    onSubmit: values =>
      navigation.navigate('OtpForgot', {
        phone:
          (COUNTRY_PHONE_CODE.find(el => el.country === phoneCode)
            ?.code as string) + values.phone,
      }),
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
          title="Forgot Your Password?"
          subtitle="No worries! We'll help you get back into the groove. Enter your phone number to reset your password."
        />
        <PhoneInput
          data={COUNTRY_PHONE_CODE_WITH_ICON.map(item => {
            return {
              value: item.name,
              label: item.dial_code,
              image: item.flag,
            };
          })}
          errorText={formik.errors.phone ?? ''}
          value={phoneCode}
          onChange={value => setPhoneCode(value)}
          label="Phone number"
          textValue={formik.values.phone}
          onChangeText={value => {
            formik.setFieldValue('phone', value);
            formik.setFieldError('phone', undefined);
          }}
        />
        <Spacer xl />
        <Button
          type="primary"
          TextComponent={
            <DefaultText
              title="Submit"
              titleClassName="font-inter-medium text-base"
            />
          }
          onPress={() => formik.handleSubmit()}
          isLoading={false}
        />

        <Section style={{marginTop: 28}} isRow>
          <Text
            variant="base"
            label="Already remember? "
            color={theme?.colors.TEXT_SECONDARY}
          />
          <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
            <Text
              variant="base"
              label="Login Now"
              color={theme?.colors.PRIMARY}
            />
          </TouchableOpacity>
        </Section>
      </Layout>
    </ImageBackground>
  );
}

export default ForgotPasswordScreen;

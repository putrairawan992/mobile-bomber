import * as React from 'react';

import {Image, View} from 'react-native';
import {Layout, Section, Text} from '../../components/atoms';

import {AuthStackParams} from '../../navigation/AuthScreenStack';
import {Images} from '../../theme';
/* eslint-disable react-native/no-inline-styles */
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import styles from './Styles/SuccessStyle';
import useTheme from '../../theme/useTheme';

type Props = NativeStackScreenProps<
  AuthStackParams,
  'SuccessNumber',
  'MyStack'
>;

function SuccessNumberScreen({navigation}: Props) {
  const theme = useTheme();
  setTimeout(() => {
    navigation.navigate('LogIn');
  }, 2000);
  return (
    <Layout contentContainerStyle={styles.container}>
      <View style={styles.successContent}>
        <Image
          source={Images.Success}
          style={styles.successImage}
          resizeMode="contain"
        />
        <Text
          variant="ultra-large"
          fontWeight="bold"
          label="Success"
          color={theme?.colors.TEXT_PRIMARY}
          style={{marginBottom: 33}}
        />
        <Section padding="0 38">
          <Text
            variant="base"
            label="Congratulations your number has been confirmed."
            color={theme?.colors.TEXT_SECONDARY}
            style={{textAlign: 'center'}}
          />
        </Section>
      </View>
    </Layout>
  );
}

export default SuccessNumberScreen;

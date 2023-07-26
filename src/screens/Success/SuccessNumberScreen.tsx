/* eslint-disable react-native/no-inline-styles */
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as React from 'react';
import {Image, View} from 'react-native';
import {Content, Container, Section, Text} from '../../components/atoms';
import {AuthStackParams} from '../../navigation/AuthScreenStack';
import {Images} from '../../theme';
import useTheme from '../../theme/useTheme';
import styles from './Styles/SuccessStyle';

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
    <Container>
      <Content
        contentContainerStyle={{
          ...(styles.container, {backgroundColor: theme?.colors.BACKGROUND1}),
        }}>
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
              fontWeight="inter-regular"
              label="Congratulations your number has been confirmed."
              color={theme?.colors.TEXT_SECONDARY}
              style={{textAlign: 'center'}}
            />
          </Section>
        </View>
      </Content>
    </Container>
  );
}

export default SuccessNumberScreen;

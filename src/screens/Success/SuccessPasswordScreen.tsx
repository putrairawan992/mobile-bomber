/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { Image, View } from 'react-native';
import { Container, Content } from '../../components';
import Button from '../../components/Button';
import { Section } from '../../components/Section';
import { Text } from '../../components/Text';
import { AuthStackParams } from '../../navigation/AuthScreenStack';
import { Images } from '../../theme';
import useTheme from '../../theme/useTheme';
import styles from './Styles/SuccessStyle';

type Props = NativeStackScreenProps<AuthStackParams, 'SuccessPassword', 'MyStack'>;

function SuccessPasswordScreen({ navigation }: Props) {
  const theme = useTheme();
  return (
    <Container>
      <Content contentContainerStyle={styles.container}>
        <View style={styles.successContent}>
          <Image
            source={Images.Success}
            style={styles.successImage}
            resizeMode="contain"
          />
          <Text variant='ultra-large' fontWeight='bold' label="Success" color={theme?.colors.TEXT_PRIMARY} style={{ marginBottom: 33 }} />
          <Section padding='0 38'>
            <Text fontWeight='medium' label=" Congratulations your password has been changed." color={theme?.colors.TEXT_SECONDARY} style={{ textAlign: 'center' }} />
          </Section>
        </View>
        <Button
          type="primary"
          onPress={() =>
            navigation.navigate('LogIn')
          }
          title="Log In"
          isLoading={false}
        />
      </Content>
    </Container>
  );
}

export default SuccessPasswordScreen;

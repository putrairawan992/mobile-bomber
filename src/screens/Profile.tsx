import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { Container, Header } from '../components';
import { MainStackParams } from '../navigation/MainScreenStack';
import useTheme from '../theme/useTheme';

type Props = NativeStackScreenProps<MainStackParams, 'Profile', 'MyStack'>;

function ProfileScreen({ navigation }: Props) {
const theme = useTheme()

  return (
    <Container>
      <Header
        transparent
      />
    </Container>
  );
}

export default ProfileScreen;

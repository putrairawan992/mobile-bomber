import * as React from 'react';

import Container from '../components/atoms/Container';
import {Header} from '../components/molecules';

// type Props = NativeStackScreenProps<MainStackParams, 'Profile', 'MyStack'>;

function ProfileScreen() {
  return (
    <Container>
      <Header transparent />
    </Container>
  );
}

export default ProfileScreen;

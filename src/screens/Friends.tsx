import * as React from 'react';
import {Layout} from '../components/atoms';

import {Header} from '../components/molecules';
import styles from './Styles';

// type Props = NativeStackScreenProps<MainStackParams, 'Booked', 'MyStack'>;

function FriendsScreen() {
  return (
    <Layout contentContainerStyle={styles.container}>
      <Header transparent />
    </Layout>
  );
}

export default FriendsScreen;

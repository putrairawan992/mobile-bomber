import * as React from 'react';
import {Layout} from '../components/atoms';
import styles from './Styles';
import {Header} from '../components/molecules';

// type Props = NativeStackScreenProps<MainStackParams, 'Profile', 'MyStack'>;

function ProfileScreen() {
  return (
    <Layout contentContainerStyle={styles.container}>
      <Header transparent />
    </Layout>
  );
}

export default ProfileScreen;

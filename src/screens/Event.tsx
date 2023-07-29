import * as React from 'react';
import {Layout} from '../components/atoms';
import {Header} from '../components/molecules';
import styles from './Styles';

// type Props = NativeStackScreenProps<MainStackParams, 'Saved', 'MyStack'>;

function EventScreen() {
  return (
    <Layout contentContainerStyle={styles.container}>
      <Header transparent />
    </Layout>
  );
}

export default EventScreen;

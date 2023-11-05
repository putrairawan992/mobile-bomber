import React from 'react';
import {Layout} from '../../components/atoms';
import {Header} from '../../components/molecules';
import styles from '../Styles';
import {WebView} from 'react-native-webview';

export default function PrivacyPage() {
  return (
    <Layout contentContainerStyle={styles.container}>
      <Header
        hasBackBtn
        transparent
        title="Privacy"
        titleStyle={styles.eventHeaderTitle}
      />
      <WebView
        source={{
          uri: 'https://www.termsfeed.com/live/698a69c6-8dc2-4713-a5d2-e8e86e7dd58d',
        }}
        style={{marginTop: 20}}
      />
    </Layout>
  );
}

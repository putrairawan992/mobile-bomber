import React from 'react';
import {DefaultText, Layout} from '../../components/atoms';
import {Header} from '../../components/molecules';
import styles from '../Styles';
import {Linking, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function PrivacyPage() {
  const loadInBrowser = () => {
    Linking.openURL(
      'https://www.termsfeed.com/live/698a69c6-8dc2-4713-a5d2-e8e86e7dd58d',
    ).catch(err => console.error("Couldn't load page", err));
  };
  return (
    <Layout contentContainerStyle={styles.container}>
      <Header
        hasBackBtn
        transparent
        title="Privacy"
        titleStyle={styles.eventHeaderTitle}
      />
      <TouchableOpacity onPress={() => loadInBrowser()}>
        <View key="1" className="mt-10 ml-5">
          <DefaultText
            titleClassName="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
            title="Privacy Policy Bomber"
          />
        </View>
      </TouchableOpacity>
    </Layout>
  );
}

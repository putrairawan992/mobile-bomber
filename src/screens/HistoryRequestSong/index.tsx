import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {DefaultText, Gap, Layout} from '../../components/atoms';
import {Header} from '../../components/molecules';
import colors from '../../styles/colors';
import CardHistoryRequestSong from '../../components/molecules/Card/CardHistoryRequestSong';

export default function HistoryRequestSong() {
  return (
    <Layout>
      <Header
        hasBackBtn
        transparent
        title="History"
        titleStyle={styles.headerTitle}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Gap height={30} />
        <DefaultText
          title="Today"
          titleClassName="font-inter-bold text-base mx-10 mb-2"
        />
        <CardHistoryRequestSong />
        <CardHistoryRequestSong />
        <CardHistoryRequestSong />
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    color: colors.white,
  },
});

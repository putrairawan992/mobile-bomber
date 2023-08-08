import {StyleSheet} from 'react-native';
import React from 'react';
import {Layout} from '../../components/atoms';
import {Header} from '../../components/molecules';
import colors from '../../styles/colors';

export default function HistoryRequestSong() {
  return (
    <Layout>
      <Header
        hasBackBtn
        transparent
        title="History"
        titleStyle={styles.headerTitle}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    color: colors.white,
  },
});

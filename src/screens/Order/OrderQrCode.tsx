/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Layout} from '../../components/atoms';
import {Header} from '../../components/molecules';
import {StyleSheet, View} from 'react-native';
import DefaultText from '../../components/atoms/Text/DefaultText';

export default function OrderQrCode() {
  return (
    <Layout contentContainerStyle={styles.parent}>
      <Header transparent title="Under Maintenance" hasBackBtn />
      <View className="flex-row items-center justify-center">
        <DefaultText
          title="Coming Soon"
          titleClassName="text-base mt-20 font-inter-medium mr-3"
        />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
});

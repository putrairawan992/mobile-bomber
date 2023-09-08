import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import CardBooking from '../../../components/molecules/Card/CardBooking';
import CardAuction from '../../../components/molecules/Card/CardAuction';

interface Unpaid {
  activeTheme: string;
  dataEvents:any;
}

export default function Unpaid({activeTheme,dataEvents}: Unpaid) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {dataEvents && dataEvents?.length > 0 && dataEvents?.map((value:any, key:any) => {
        return activeTheme === 'Auction' ? (
          <CardAuction key={key} />
        ) : (
          <CardBooking key={key} data={dataEvents} type="Unpaid" />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
});

import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import CardBooking from '../../../components/molecules/Card/CardBooking';
import CardAuction from '../../../components/molecules/Card/CardAuction';

interface Unpaid {
  activeTheme: string;
}

export default function Unpaid({activeTheme}: Unpaid) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {[1, 2, 3].map((_, key) => {
        return activeTheme === 'Auction' ? (
          <CardAuction key={key} />
        ) : (
          <CardBooking key={key} type="Unpaid" />
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

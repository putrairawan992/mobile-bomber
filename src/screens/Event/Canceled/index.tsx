import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import CardBooking from '../../../components/molecules/Card/CardBooking';
import CardAuction from '../../../components/molecules/Card/CardAuction';
import {BookingInterface} from '../../../interfaces/BookingInterface';

interface Finished {
  activeTheme: string;
  dataEvents: BookingInterface[];
  onSelect: (data: BookingInterface) => void;
}

export default function Finished({
  activeTheme,
  dataEvents,
  onSelect,
}: Finished) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {dataEvents.map((value, key) => {
        return activeTheme === 'Auction' ? (
          <CardAuction key={key} />
        ) : (
          <CardBooking
            key={key}
            data={value}
            type="Canceled"
            onSelect={onSelect}
          />
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

import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import CardBooking from '../../../components/molecules/Card/CardBooking';
import CardAuction from '../../../components/molecules/Card/CardAuction';
import {BookingInterface} from '../../../interfaces/BookingInterface';

interface Paid {
  activeTheme: string;
  dataEvents: BookingInterface[];
  onSelect: (data: BookingInterface) => void;
}

export default function Paid({activeTheme, dataEvents, onSelect}: Paid) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {dataEvents &&
        dataEvents?.length > 0 &&
        dataEvents?.map((value: any, key: any) => {
          return activeTheme === 'Auction' ? (
            <CardAuction data={value} key={key} />
          ) : (
            <CardBooking
              data={value}
              key={key}
              type="Paid"
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

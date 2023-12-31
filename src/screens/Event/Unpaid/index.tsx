import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import CardBooking from '../../../components/molecules/Card/CardBooking';
import CardAuction from '../../../components/molecules/Card/CardAuction';
import {BookingInterface} from '../../../interfaces/BookingInterface';

interface Unpaid {
  activeTheme: string;
  dataEvents: any;
  status?: string;
  onSelect: (data: BookingInterface) => void;
}

export default function Unpaid({
  activeTheme,
  dataEvents,
  onSelect,
  status,
}: Unpaid) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {dataEvents &&
        dataEvents?.length > 0 &&
        dataEvents?.map((value: any, key: any) => {
          return activeTheme === 'Auction' ? (
            <CardAuction key={key} />
          ) : (
            <CardBooking
              status={status}
              key={key}
              data={value}
              type="Unpaid"
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

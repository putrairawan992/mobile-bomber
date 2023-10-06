import {ScrollView, StyleSheet} from 'react-native';
import React, {memo} from 'react';
import CardBooking from '../../../components/molecules/Card/CardBooking';
import CardAuction from '../../../components/molecules/Card/CardAuction';
import {BookingInterface} from '../../../interfaces/BookingInterface';

interface Paid {
  activeTheme: string;
  status?: string;
  dataEvents: BookingInterface[];
  onSelect: (data: BookingInterface) => void;
}

function Paid({activeTheme, dataEvents, onSelect, status}: Paid) {
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
              status={status}
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

export default memo(Paid);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
});

import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import CardBooking from '../../../components/molecules/Card/CardBooking';
import {BookingInterface} from '../../../interfaces/BookingInterface';
import {DefaultText} from '../../../components/atoms';

interface Paid {
  status?: string;
  dataEvents: any[];
  onSelect: (data: BookingInterface) => void;
}

function Paid({dataEvents, onSelect, status}: Paid) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {dataEvents && dataEvents?.length > 0 ? (
        dataEvents?.map((value: any, key: any) => {
          return (
            <CardBooking
              data={value}
              status={status}
              key={key}
              type="Paid"
              onSelect={onSelect}
            />
          );
        })
      ) : (
        <DefaultText title="No Data" titleClassName="self-center" />
      )}
    </ScrollView>
  );
}

export default Paid;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
});

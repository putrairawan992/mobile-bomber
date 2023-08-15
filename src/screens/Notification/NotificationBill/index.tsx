import {FlatList} from 'react-native';
import React from 'react';
import CardNotificationBill from '../../../components/molecules/Notification/CardNotificationBill';
import {BillNotificationInterface} from '../../../interfaces/NotificationInterface';

interface NotificationBillProps {
  data: BillNotificationInterface[];
  onSelect: (billId: string) => void;
}

export default function NotificationBill({
  data,
  onSelect,
}: NotificationBillProps) {
  return (
    <FlatList
      data={data}
      keyExtractor={(_, key) => key.toString()}
      renderItem={({item, index}) => (
        <CardNotificationBill data={item} index={index} onSelect={onSelect} />
      )}
      showsVerticalScrollIndicator={false}
    />
  );
}

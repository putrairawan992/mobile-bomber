import {FlatList} from 'react-native';
import React from 'react';
import CardNotificationBill from '../../../components/molecules/Notification/CardNotificationBill';

export default function NotificationBill() {
  return (
    <FlatList
      data={[1, 2, 3, 4]}
      keyExtractor={(_, key) => key.toString()}
      renderItem={() => (
        <CardNotificationBill name="Jean Chen" title="WAVE, TAIPEI" />
      )}
      showsVerticalScrollIndicator={false}
    />
  );
}

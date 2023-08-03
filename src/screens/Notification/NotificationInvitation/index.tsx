import {FlatList} from 'react-native';
import React from 'react';
import CardNotificationInvitation from '../../../components/molecules/Notification/CardNotificationInvitation';

export default function NotificationInvitation() {
  return (
    <FlatList
      data={[1, 2, 3, 4, 5]}
      keyExtractor={(_, key) => key.toString()}
      renderItem={({index}) => (
        <CardNotificationInvitation
          image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60"
          name="Jean Chen"
          time="4 hours ago"
          showBorder={[1, 2, 3, 4, 5].length === index + 1 ? false : true}
        />
      )}
      showsVerticalScrollIndicator={false}
    />
  );
}

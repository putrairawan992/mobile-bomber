import {FlatList} from 'react-native';
import React from 'react';
import CardNotificationFriends from '../../../components/molecules/Notification/CardNotificationFriends';
import {RequestFriendNotificationInterface} from '../../../interfaces/NotificationInterface';

interface NotificationFriendsProps {
  data: RequestFriendNotificationInterface[];
}

export default function NotificationFriends({data}: NotificationFriendsProps) {
  return (
    <FlatList
      data={data}
      keyExtractor={(_, key) => key.toString()}
      renderItem={({item, index}) => (
        <CardNotificationFriends
          data={item}
          key={`friend_notif_${index}`}
          isShowBorder={data.length === index + 1 ? false : true}
        />
      )}
      showsVerticalScrollIndicator={false}
    />
  );
}

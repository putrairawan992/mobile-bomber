import {FlatList} from 'react-native';
import React from 'react';
import CardNotificationFriends from '../../../components/molecules/Notification/CardNotificationFriends';
import {FriendRequestInterface} from '../../../interfaces/UserInterface';

interface NotificationFriendsProps {
  data: FriendRequestInterface[];
}

export default function NotificationFriends({data}: NotificationFriendsProps) {
  return (
    <FlatList
      data={data}
      keyExtractor={(_, key) => key.toString()}
      renderItem={({item, index}) => (
        <CardNotificationFriends
          data={item}
          isShowBorder={data.length === index + 1 ? false : true}
        />
      )}
      showsVerticalScrollIndicator={false}
    />
  );
}

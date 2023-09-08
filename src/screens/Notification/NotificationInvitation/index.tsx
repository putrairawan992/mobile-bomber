import {FlatList} from 'react-native';
import React from 'react';
import CardNotificationInvitation from '../../../components/molecules/Notification/CardNotificationInvitation';
import {InviteNotificationInterface} from '../../../interfaces/NotificationInterface';

interface NotificationInvitationProps {
  data: InviteNotificationInterface[];
  onOpenInvitation: (data: InviteNotificationInterface) => void;
}

export default function NotificationInvitation({
  data,
  onOpenInvitation,
}: NotificationInvitationProps) {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={({item, index}) => (
        <CardNotificationInvitation
          index={index}
          data={item}
          key={`invitation_${index}`}
          showBorder={data.length === index + 1 ? false : true}
          onOpenInvitation={onOpenInvitation}
        />
      )}
      showsVerticalScrollIndicator={false}
    />
  );
}

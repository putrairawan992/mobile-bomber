import {FlatList} from 'react-native';
import React from 'react';
import CardNotificationInvitation from '../../../components/molecules/Notification/CardNotificationInvitation';
import {InvitationNotificationInterface} from '../../../interfaces/NotificationInterface';

interface NotificationInvitationProps {
  data: InvitationNotificationInterface[];
  onOpenInvitation: (invitationId: string) => void;
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
          showBorder={data.length === index + 1 ? false : true}
          onOpenInvitation={onOpenInvitation}
        />
      )}
      showsVerticalScrollIndicator={false}
    />
  );
}

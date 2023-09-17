import {Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {DefaultText, Gap} from '../../../atoms';
import {colors} from '../../../../utils/colors';
import moment from 'moment';
import {Close} from '../../../../assets/icons';
import {RequestFriendNotificationInterface} from '../../../../interfaces/NotificationInterface';

interface CardNotificationFriends {
  data: RequestFriendNotificationInterface;
  isShowBorder: boolean;
  onApprove: (data: RequestFriendNotificationInterface) => void;
}

export default function CardNotificationFriends({
  data,
  isShowBorder = true,
  onApprove,
}: CardNotificationFriends) {
  return (
    <View
      className={`flex-row items-center mx-3 py-4 border-b-[1px] ${
        isShowBorder ? 'border-b-neutral-700' : 'border-b-transparent'
      }`}>
      <Image
        className="w-[32] h-[32] bg-container rounded-full"
        source={{
          uri: data.invitedPhotoUrl,
        }}
        resizeMode="cover"
      />
      <Gap width={10} />
      <View className="flex-1">
        <DefaultText
          title={data.senderName}
          titleClassName="text-warning"
          subtitle="sent friend request"
        />
        <Gap height={2.5} />
        <DefaultText
          title={moment(new Date()).startOf('hour').fromNow()}
          titleClassName="text-xs text-neutral-400"
        />
      </View>
      <Gap width={10} />
      <TouchableOpacity
        onPress={() => onApprove(data)}
        activeOpacity={0.7}
        className="border-[1px] border-white rounded-md px-3 py-2">
        <DefaultText
          title="Approve"
          titleClassName="text-[10px] font-inter-medium"
        />
      </TouchableOpacity>
      <Gap width={10} />
      <TouchableOpacity activeOpacity={0.7}>
        <Close color={colors.white} size={21} />
        {/* <CloseCircle color={colors.white} size={24} /> */}
      </TouchableOpacity>
    </View>
  );
}

import {Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {DefaultText, Gap} from '../../../atoms';
import {CloseCircle} from 'iconsax-react-native';
import {colors} from '../../../../utils/colors';

interface CardNotificationFriends {
  image: string;
  name: string;
  time: string;
  showBorder?: boolean;
}

export default function CardNotificationFriends({
  image,
  name,
  time,
  showBorder = true,
}: CardNotificationFriends) {
  return (
    <View
      className={`flex-row items-center mx-3 py-4 border-b-[1px] ${
        showBorder ? 'border-b-neutral-700' : 'border-b-transparent'
      }`}>
      <Image
        className="w-[32] h-[32] bg-container rounded-full"
        source={{
          uri: image,
        }}
        resizeMode="cover"
      />
      <Gap width={10} />
      <View className="flex-1">
        <DefaultText
          title={name}
          titleClassName="text-warning"
          subtitle="sent friend request"
        />
        <Gap height={2.5} />
        <DefaultText title={time} titleClassName="text-xs text-neutral-400" />
      </View>
      <Gap width={10} />
      <TouchableOpacity
        activeOpacity={0.7}
        className="border-[1px] border-white rounded-md px-3 py-2">
        <DefaultText
          title="Approve"
          titleClassName="text-[10px] font-inter-medium"
        />
      </TouchableOpacity>
      <Gap width={10} />
      <TouchableOpacity activeOpacity={0.7}>
        <CloseCircle color={colors.white} size={24} />
      </TouchableOpacity>
    </View>
  );
}

import {Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import DefaultText from '../../../atoms/Text/DefaultText';
import {Spacer} from '../../../atoms';

interface CardInviteFriends {
  onPress: (value: string,val:any) => void;
  val: any;
}

export default function CardInviteFriends({onPress, val}: CardInviteFriends) {
  return (
    <View className="flex-row items-center py-2">
      <Image
        source={{
          uri: val?.photoUrl,
        }}
        resizeMode="cover"
        className="w-[57] h-[57] rounded-full"
      />
      <Spacer width={10} />
      <View className="flex-1">
        <DefaultText
          title={val?.userName}
          titleClassName="font-inter-medium mb-1"
        />
        <DefaultText
          title="@jean"
          titleClassName="text-xs font-inter-medium text-neutral-500"
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        className="bg-neutral-600 py-1 px-2 rounded-md"
        onPress={() => onPress('1',val)}>
        <DefaultText title="Invite" />
      </TouchableOpacity>
    </View>
  );
}

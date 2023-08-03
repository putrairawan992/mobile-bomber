import {Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import DefaultText from '../../atoms/Text/DefaultText';
import {Spacer} from '../../atoms';

interface CardInviteFriends {
  onPress: (value: string) => void;
}

export default function CardInviteFriends({onPress}: CardInviteFriends) {
  return (
    <View className="flex-row items-center py-2">
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60',
        }}
        resizeMode="cover"
        className="w-[57] h-[57] rounded-full"
      />
      <Spacer width={10} />
      <View className="flex-1">
        <DefaultText
          title="Jean Chen"
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
        onPress={() => onPress('1')}>
        <DefaultText title="Invite" />
      </TouchableOpacity>
    </View>
  );
}

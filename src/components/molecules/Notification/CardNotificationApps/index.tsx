import {Image, View} from 'react-native';
import React from 'react';
import {DefaultText, Gap} from '../../../atoms';

interface CardNotificationAppsProps {
  image: string;
  text: string;
  time: string;
  showBorder?: boolean;
}

export default function CardNotificationApps({
  image,
  text,
  time,
  showBorder = true,
}: CardNotificationAppsProps) {
  return (
    <View
      className={`flex-row mx-5 py-3 border-b-[1px] ${
        showBorder ? 'border-b-neutral-700' : 'border-b-transparent'
      }`}>
      <Image
        className="w-[30] h-[30] bg-container rounded-full"
        source={{
          uri: image,
        }}
        resizeMode="cover"
      />
      <Gap width={10} />
      <View className="flex-1">
        <DefaultText title={text} titleClassName="leading-5" />
        <Gap height={5} />
        <DefaultText title={time} titleClassName="text-xs text-neutral-400" />
      </View>
    </View>
  );
}

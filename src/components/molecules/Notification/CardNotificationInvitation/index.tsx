import {Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {DefaultText, Gap} from '../../../atoms';
import {images} from '../../../../utils/images';
import {ArrowRight2} from 'iconsax-react-native';
import {colors} from '../../../../utils/colors';

interface CardNotificationInvitation {
  image: string;
  name: string;
  time: string;
  showBorder?: boolean;
}

export default function CardNotificationInvitation({
  image,
  name,
  time,
  showBorder = true,
}: CardNotificationInvitation) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
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
          subtitle="inviting you to party"
          subtitleClassName="text-neutral-400"
        />
        <Gap height={8} />
        <View className="bg-gray-secondary px-3 py-2 rounded-md">
          <DefaultText title={"hi michael, i'm jean who meet you..."} />
        </View>
        <Gap height={8} />
        <View className="flex-row items-center">
          <Image className="w-[16] h-[16]" source={images.wave} />
          <Gap width={5} />
          <DefaultText title={'WAVE'} titleClassName="text-xs" />
          <Gap width={15} />
          <Image className="w-[16] h-[16]" source={images.calendar} />
          <Gap width={5} />
          <DefaultText title={'Sat 14 Dec'} titleClassName="text-xs" />
          <Gap width={15} />
          <Image className="w-[16] h-[16]" source={images.table} />
          <Gap width={5} />
          <DefaultText title={'X4'} titleClassName="text-xs" />
          <Gap width={20} />
          <View>
            <View className="w-[20] h-[20] rounded-full bg-white" />
            <View className="w-[20] h-[20] rounded-full bg-gray-secondary absolute left-3" />
          </View>
          <Gap width={20} />
          <DefaultText title={'3'} titleClassName="text-xs" />
        </View>
        <Gap height={5} />
        <DefaultText title={time} titleClassName="text-xs text-neutral-400" />
      </View>
      <Gap width={10} />
      <ArrowRight2 color={colors.white} size={24} />
    </TouchableOpacity>
  );
}

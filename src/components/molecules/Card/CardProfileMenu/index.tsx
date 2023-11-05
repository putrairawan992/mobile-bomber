import {Image, ImageSourcePropType, TouchableOpacity} from 'react-native';
import React from 'react';
import {DefaultText, Gap} from '../../../atoms';

interface CardProfileMenu {
  title: string;
  icon: ImageSourcePropType;
  onPress: () => void;
}

export default function CardProfileMenu({
  icon,
  title,
  onPress,
}: CardProfileMenu) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row items-center py-2 px-1 mb-2"
      onPress={onPress}>
      <Image source={icon} resizeMode="contain" className="w-[20] h-[20]" />
      <Gap width={15} />
      <DefaultText title={title} />
    </TouchableOpacity>
  );
}

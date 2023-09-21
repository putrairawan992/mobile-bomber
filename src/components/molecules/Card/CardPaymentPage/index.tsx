import {TouchableOpacity} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import {DefaultText} from '../../../atoms';
import {IcMasterCard} from '../../../../theme/Images';

interface CardPaymentPage {
  isDefault: boolean;
  number: string;
  onPress: () => void;
}

export default function CardPaymentPage({
  isDefault,
  number,
  onPress,
}: CardPaymentPage) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row bg-[#2f2f2f] h-[52] rounded-md justify-center items-center px-4 mb-3"
      onPress={() => onPress()}>
      <Image
        source={IcMasterCard}
        resizeMode="contain"
        className="h-[16] w-[19]"
      />
      <DefaultText
        title={number}
        titleClassName="text-base font-inter-medium flex-1 ml-2"
      />
      {isDefault ? (
        <DefaultText title="default" titleClassName="text-yellow-700" />
      ) : (
        <DefaultText title="set as default" titleClassName="text-white-700" />
      )}
    </TouchableOpacity>
  );
}

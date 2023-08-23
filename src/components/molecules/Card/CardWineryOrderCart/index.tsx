import {Image, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {DefaultText, Gap} from '../../../atoms';
import {IcDelete, ImgWineryOrder} from '../../../../theme/Images';

interface CardWineryOrderCart {
  onRemove: () => void;
}

export default function CardWineryOrderCart({onRemove}: CardWineryOrderCart) {
  const [value, setValue] = useState<number>(1);

  return (
    <View className="p-4 bg-[#2D2D2D] rounded-lg mb-4">
      <View className="flex-row items-center">
        <Image
          source={ImgWineryOrder}
          resizeMode="cover"
          className="w-[120] h-[109] rounded-[8px]"
        />
        <Gap width={10} />
        <View className="flex-1">
          <DefaultText
            title={'Veuve Clicquot Brut Set x 6'}
            titleClassName="font-inter-medium"
          />
          <Gap height={5} />
          <DefaultText
            title={'法國凱歌香檳 x 6'}
            titleClassName="font-inter-medium text-xs"
          />
          <Gap height={10} />
          <DefaultText
            title={'NT 36,000'}
            titleClassName="font-inter-medium text-xs text-[#3ca6ec]"
          />
        </View>
      </View>
      <View className="w-full h-[1] bg-neutral-700 my-3" />
      <View className="flex-row items-center justify-between">
        <TouchableOpacity activeOpacity={0.7}>
          <Image
            source={IcDelete}
            resizeMode="contain"
            className="w-[17] h-[18]"
          />
        </TouchableOpacity>
        <View className="bg-black flex-row items-center rounded-md px-3 py-[6]">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => (value > 1 ? setValue(value - 1) : onRemove())}>
            <DefaultText title="-" titleClassName="text-xl text-neutral-400" />
          </TouchableOpacity>
          <DefaultText title={value} titleClassName="font-poppins-bold mx-6" />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setValue(value + 1)}>
            <DefaultText title="+" titleClassName="text-xl text-neutral-400" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

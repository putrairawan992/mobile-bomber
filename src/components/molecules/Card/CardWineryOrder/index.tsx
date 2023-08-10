import {Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {DefaultText, Gap} from '../../../atoms';
import {ImgWineryOrder} from '../../../../theme/Images';

export default function CardWineryOrder() {
  return (
    <View className="flex-row px-5 py-6">
      <View className="flex-1">
        <DefaultText
          title={'Veuve Clicquot Brut Set x 6'}
          titleClassName="font-inter-medium"
        />
        <Gap height={4} />
        <DefaultText
          title={'法國凱歌香檳 x 6'}
          titleClassName="font-inter-medium text-xs"
        />
        <Gap height={4} />
        <DefaultText
          title={'NT 36,000'}
          titleClassName="font-inter-medium text-xs text-[#3ca6ec]"
        />
        <Gap height={8} />
        <TouchableOpacity
          activeOpacity={0.7}
          className="bg-primary p-2 self-start rounded-md">
          <DefaultText title="Add to cart" />
        </TouchableOpacity>
      </View>
      <Gap width={10} />
      <Image
        source={ImgWineryOrder}
        resizeMode="cover"
        className="w-[114] h-[114] rounded-[8px]"
      />
    </View>
  );
}

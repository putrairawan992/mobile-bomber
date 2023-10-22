import {Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import DefaultText from '../../../atoms/Text/DefaultText';
import {Gap} from '../../../atoms';
import {WaveLogoImg} from '../../../../theme/Images';

export default function CardAuction() {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="mx-3 p-3 bg-neutral-800 rounded-xl mb-3"
      onPress={() => {}}>
      <View className="flex-row items-center">
        <DefaultText
          title={'You win the auction'}
          titleClassName="text-xs font-inter-medium flex-1 text-green-700"
        />
        <DefaultText
          title={'Monday, 14 June'}
          titleClassName="text-xs font-inter-medium text-neutral-400"
        />
      </View>
      <Gap height={10} />
      <View className="flex-row items-center">
        <View className="p-2 bg-[#2f2f2f] rounded-lg justify-center items-center">
          <Image
            source={WaveLogoImg}
            resizeMode="contain"
            className="w-[45] h-[17]"
          />
          <DefaultText
            title="WAVE"
            titleClassName="font-inter-medium text-xs mt-1"
          />
        </View>
        <Gap width={10} />
        <View className="flex-1">
          <View className="flex-row items-center">
            <DefaultText
              title={'X3'}
              titleClassName="text-base font-inter-semibold"
              subtitle=" at "
              subtitleClassName="text-xs text-neutral-400"
            />
            <DefaultText
              title={'Wave Taipei'}
              titleClassName="text-base font-inter-semibold"
            />
          </View>
          <Gap height={10} />
          <View className="flex-row items-center">
            <DefaultText
              title="Your Bid"
              titleClassName="font-inter-medium text-xs flex-1 text-neutral-400"
            />
            <DefaultText
              title="90.000"
              titleClassName="font-inter-medium text-xs text-neutral-400"
            />
          </View>
          <Gap height={5} />
          <View className="flex-row items-center">
            <DefaultText
              title="Latest Bid"
              titleClassName="font-inter-medium text-xs flex-1 text-neutral-400"
            />
            <DefaultText
              title="95.000"
              titleClassName="font-inter-medium text-xs text-neutral-400"
            />
          </View>
          <Gap height={5} />
          <View className="flex-row items-center">
            <DefaultText
              title="Your Bid by"
              titleClassName="font-inter-medium text-xs flex-1 text-neutral-400"
            />
            <DefaultText
              title="Anchu299"
              titleClassName="font-inter-medium text-xs text-neutral-400"
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

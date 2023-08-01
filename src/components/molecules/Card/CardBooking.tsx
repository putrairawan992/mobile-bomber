import {Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import DefaultText from '../../atoms/Text/DefaultText';
import {Spacer} from '../../atoms';
import {WaveImg} from '../../../theme/Images';
import {Profile2User} from 'iconsax-react-native';

interface CardBooking {
  type: 'Paid' | 'Unpaid' | 'Canceled' | 'Finished';
}

export default function CardBooking({type}: CardBooking) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="mx-5 p-3 bg-neutral-800 rounded-xl mb-3">
      <View className="flex-row items-center">
        <DefaultText
          title={'ID : 2221421'}
          titleClassName="text-xs text-neutral-400 flex-1"
        />
        <DefaultText
          title={'NT 42.000'}
          titleClassName="text-xs font-poppins-semibold text-yellow-600"
        />
      </View>
      <Spacer height={10} />
      <View className="flex-row">
        <Image
          source={WaveImg}
          className="w-[80] h-[80] rounded-lg"
          resizeMode="cover"
        />
        <Spacer width={10} />
        <View className="flex-1">
          <DefaultText
            title={'Wave Taipei'}
            titleClassName="text-base font-poppins-semibold"
          />
          <Spacer height={5} />
          <DefaultText
            title={'Table X33'}
            titleClassName="text-xs font-inter-semibold"
            subtitle={'Sat, 14 June - 19:30'}
            subtitleClassName="text-xs font-inter-medium"
          />
          <Spacer height={5} />
          <View className="flex-row items-center">
            <Profile2User className="text-neutral-500" size={16} />
            <DefaultText
              title={'13 person join here'}
              titleClassName="text-xs font-inter-medium text-neutral-500 flex-1 ml-1"
            />
          </View>
          <Spacer height={5} />
          <DefaultText
            title={type}
            titleClassName="text-green-500 font-inter-bold text-xs"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

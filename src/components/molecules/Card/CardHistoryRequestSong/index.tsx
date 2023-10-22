import {Image, View} from 'react-native';
import React from 'react';
import {DefaultText, Gap} from '../../../atoms';
import {WaveLogoImg} from '../../../../theme/Images';
import {currency} from '../../../../utils/function';

interface CardHistoryRequestSongProps {
  showBorder?: boolean;
}

export default function CardHistoryRequestSong({
  showBorder = true,
}: CardHistoryRequestSongProps) {
  return (
    <View
      className={`flex-row mx-5 py-3 border-b-[0.5px] ${
        showBorder ? 'border-b-neutral-700' : 'border-b-transparent'
      }`}>
      <View className="w-[29] h-[29] bg-grey-one rounded-full justify-center items-center">
        <Image
          className="w-[16] h-[6]"
          source={WaveLogoImg}
          resizeMode="contain"
        />
      </View>
      <Gap width={10} />
      <View className="flex-1">
        <View className="flex-row flex-wrap">
          <DefaultText
            title={'You'}
            titleClassName="leading-5 font-inter-medium"
            subtitle={'send request song '}
            subtitleClassName="text-neutral-500"
          />
          <DefaultText
            title={'Buttler by BTS'}
            titleClassName="leading-5 font-inter-medium"
            subtitle={'to '}
            subtitleClassName="text-neutral-500"
          />
          <DefaultText
            title={'DJ SODA'}
            titleClassName="leading-5 font-inter-medium"
            subtitle={'for about '}
            subtitleClassName="text-neutral-500"
          />
          <DefaultText
            title={currency(50000)}
            titleClassName="leading-5 font-inter-medium"
          />
        </View>
        <Gap height={5} />
        <DefaultText
          title={'32 hours ago'}
          titleClassName="text-xs text-neutral-500"
        />
      </View>
    </View>
  );
}

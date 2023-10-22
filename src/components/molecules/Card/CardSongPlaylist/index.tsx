import {Image, View, useWindowDimensions} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {DefaultText, Gap} from '../../../atoms';
import {currency} from '../../../../utils/function';

interface CardSongPlaylistProps {
  title: string;
  singer: string;
  tip: number;
  time: string;
  userName: string;
  userImage: string;
}

export default function CardSongPlaylist({
  title,
  singer,
  tip,
  time,
  userName,
  userImage,
}: CardSongPlaylistProps) {
  const {width} = useWindowDimensions();

  return (
    <LinearGradient
      className="self-center p-[1px] rounded-lg mb-3"
      colors={['#A060FA', '#C800CC']}>
      <View
        className="bg-neutral-800 p-3 rounded-lg"
        style={{width: width / 1.4}}>
        <View className="flex-row items-center">
          <DefaultText
            title={`${title} - ${singer}`}
            titleClassName="font-inter-medium flex-1"
          />
          <DefaultText
            title={currency(tip)}
            titleClassName="font-inter-medium text-neutral-400"
          />
        </View>
        <Gap height={5} />
        <DefaultText
          title={`played around ${time}`}
          titleClassName="font-inter-medium text-neutral-400"
        />
        <Gap height={10} />
        <DefaultText
          title="Thanks to"
          titleClassName="text-[10px] font-inter-medium text-neutral-400"
        />
        <Gap height={5} />
        <View className="flex-row items-center">
          <Image
            source={{
              uri: userImage,
            }}
            resizeMode="cover"
            className="w-[20] h-[20] rounded-full"
          />
          <Gap width={5} />
          <DefaultText
            title={`@${userName}`}
            titleClassName="text-yellow-600 text-[10px]"
          />
        </View>
      </View>
    </LinearGradient>
  );
}

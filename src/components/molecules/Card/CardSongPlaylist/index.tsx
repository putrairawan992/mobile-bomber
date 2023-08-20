import {Image, View, useWindowDimensions} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {DefaultText, Gap} from '../../../atoms';

export default function CardSongPlaylist() {
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
            title="Butter - BTS"
            titleClassName="font-inter-medium flex-1"
          />
          <DefaultText
            title="NT 150,000"
            titleClassName="font-inter-medium text-neutral-400"
          />
        </View>
        <Gap height={5} />
        <DefaultText
          title="played around 1.30am"
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
              uri: 'https://images.unsplash.com/photo-1494959764136-6be9eb3c261e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60',
            }}
            resizeMode="cover"
            className="w-[20] h-[20] rounded-full"
          />
          <Gap width={5} />
          <DefaultText
            title="@jean"
            titleClassName="text-yellow-600 text-[10px]"
          />
        </View>
      </View>
    </LinearGradient>
  );
}

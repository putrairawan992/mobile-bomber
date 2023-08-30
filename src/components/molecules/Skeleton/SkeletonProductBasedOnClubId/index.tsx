import {View} from 'react-native';
import React from 'react';

export default function SkeletonProductBasedOnClubId() {
  return [1, 2, 3, 4, 5].map((_, key) => {
    return (
      <View className="animate-pulse px-5 py-4 flex-row" key={key}>
        <View className="flex-1">
          <View className="h-5 rounded-md bg-neutral-700 w-[100] mb-2" />
          <View className="h-3 rounded-sm bg-neutral-700 w-[100] mb-4" />
          <View className="h-7 rounded-md bg-neutral-700 w-[100] mb-2" />
        </View>
        <View className="rounded-md bg-neutral-700 w-[114] h-[114]" />
      </View>
    );
  });
}

import {Image, View} from 'react-native';
import React from 'react';
import DefaultText from '../../../atoms/Text/DefaultText';
import {Spacer} from '../../../atoms';
import {currency} from '../../../../utils/function';
import {TouchableOpacity} from 'react-native';

export default function CardBookingOrderNotTable({
  index,
  activeTheme,
  setActiveTheme,
}: {
  index: number;
  activeTheme: number;
  setActiveTheme: any;
}) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => setActiveTheme(index)}>
      <View
        className={`bg-screen p-3 mt-4 rounded-md border-[2px] mx-2 ${
          index === activeTheme ? 'border-primary' : 'border-neutral-600'
        }`}>
        <View className="flex-row items-center">
          <DefaultText
            title="#OR33212"
            titleClassName="flex-1 font-inter-regular text-neutral-500"
          />
          <DefaultText
            title={`Total ${currency(50000)}`}
            titleClassName="font-inter-medium text-yellow-600"
          />
        </View>
        <Spacer height={2} />
        <DefaultText
          title="Ready to serve"
          titleClassName="font-inter-semibold text-base text-green-700"
        />
        <Spacer height={12} />
        <View className="flex-row items-center">
          <View className="mr-5">
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
              }}
              resizeMode="cover"
              className="w-[24] h-[24] rounded-full"
            />
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
              }}
              resizeMode="cover"
              className="w-[24] h-[24] rounded-full absolute left-[15]"
            />
          </View>
          <DefaultText
            title="3x White wine, 2x Capatain morgan"
            titleClassName="font-inter-medium flex-1"
            titleProps={{
              numberOfLines: 1,
            }}
          />
        </View>
        <Spacer height={24} />
        <DefaultText
          title="ordered 13 hours ago"
          titleClassName="text-neutral-500 font-inter-regular"
        />
      </View>
    </TouchableOpacity>
  );
}

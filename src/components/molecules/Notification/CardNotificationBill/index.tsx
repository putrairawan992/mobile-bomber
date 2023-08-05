import {Image, View} from 'react-native';
import React from 'react';
import {Button, DefaultText, Gap} from '../../../atoms';
import {images} from '../../../../utils/images';

interface CardNotificationBill {
  title: string;
  name: string;
}

export default function CardNotificationBill({
  title,
  name,
}: CardNotificationBill) {
  return (
    <View className="mx-4 py-4">
      <View className="flex-row items-center">
        <View className="border-[1px] border-white rounded-md p-1">
          <DefaultText title="Split bill" titleClassName="text-xs" />
        </View>
        <Gap width={10} />
        <View className="border-[1px] border-white rounded-md p-1">
          <DefaultText title="Food order" titleClassName="text-xs" />
        </View>
        <Gap classname="flex-1" />
        <View className="bg-gray-secondary rounded-md p-2">
          <DefaultText
            title="NT 5.000"
            titleClassName="font-inter-bold text-warning"
          />
        </View>
      </View>
      <Gap height={10} />
      <DefaultText
        title={title}
        titleClassName="font-inter-semibold text-base"
      />
      <Gap height={8} />
      <View className="flex-row">
        <DefaultText
          title={'#WV99920-21'}
          titleClassName="text-xs font-inter-semibold"
          subtitle={'| Hosted by '}
        />
        <DefaultText
          title={name}
          titleClassName="text-xs text-warning"
          subtitle={'in table X4'}
        />
      </View>
      <Gap height={8} />
      <View className="flex-row items-center">
        <Image className="w-[16] h-[16]" source={images.wave} />
        <Gap width={5} />
        <DefaultText title={name} titleClassName="text-xs" />
        <Gap width={15} />
        <Image className="w-[16] h-[16]" source={images.building} />
        <Gap width={5} />
        <DefaultText title={'X33'} titleClassName="text-xs" />
        <Gap width={15} />
        <Image className="w-[16] h-[16]" source={images.calendar} />
        <Gap width={5} />
        <DefaultText title={'Sat, 14 Dec'} titleClassName="text-xs" />
      </View>
      <Gap height={8} />
      <DefaultText
        title="WAITING PAYMENT"
        titleClassName="text-red-500 text-xs font-inter-bold"
      />
      <View className="w-full h-[1px] bg-neutral-600 my-3" />
      <Button title="Pay" type="primary" onPress={() => undefined} />
      <Gap height={8} />
      <DefaultText
        title={'4 hours ago'}
        titleClassName="text-xs text-neutral-400"
      />
    </View>
  );
}

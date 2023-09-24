import {Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import DefaultText from '../../../atoms/Text/DefaultText';
import {Gap} from '../../../atoms';
import {IcCoupon, IcPeopleTwo} from '../../../../theme/Images';
import moment from 'moment';
import {BookingInterface} from '../../../../interfaces/BookingInterface';

interface CardBooking {
  type: 'Paid' | 'Unpaid' | 'Canceled' | 'Finished';
  data?: BookingInterface;
  onSelect: (data: BookingInterface) => void;
}

export default function CardBooking({type, data, onSelect}: CardBooking) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="mx-3 p-2 bg-neutral-800 rounded-xl mb-3"
      onPress={() => (data ? onSelect(data) : undefined)}>
      <View className="flex-row items-center">
        <DefaultText
          title={`ID : ${data?.club_id}`}
          titleClassName="text-xs text-neutral-400 flex-1"
        />
        <DefaultText
          title={`NT ${data?.paidTotal}`}
          titleClassName="text-xs font-poppins-semibold text-yellow-600"
        />
      </View>
      <Gap height={10} />
      <View className="flex-row">
        <Image
          source={{uri: data?.clubImg}}
          className="w-[80] h-[80] rounded-lg"
          resizeMode="cover"
        />
        <Gap width={10} />
        <View className="flex-1">
          <DefaultText
            title={`${data?.clubName}`}
            titleClassName="text-base font-poppins-semibold"
          />
          <Gap height={2.5} />
          <DefaultText
            title={`Table ${data?.tableName}`}
            titleClassName="text-xs font-inter-semibold"
            subtitle={`${moment(data?.bookingDate).format('DD-MM-YYYY')}`}
            subtitleClassName="text-xs font-inter-medium"
          />
          <Gap height={5} />
          <View className="flex-row items-center">
            <Image
              source={IcPeopleTwo}
              resizeMode="contain"
              className="w-[16] h-[16]"
            />
            <DefaultText
              title={`${data?.joinedTotal} person join here`}
              titleClassName="text-xs font-inter-medium text-neutral-500 ml-1"
            />
            <Gap width={5} />
            <Image
              source={IcCoupon}
              resizeMode="contain"
              className="w-[16] h-[16]"
            />
            <DefaultText
              title={`${data?.couponUsed} coupon used`}
              titleClassName="text-xs font-inter-medium text-neutral-500 ml-1"
            />
          </View>
          <Gap height={10} />
          <DefaultText
            title={type}
            titleClassName="text-green-500 font-inter-bold text-xs"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

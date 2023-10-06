import {Image, TouchableOpacity, View, Text} from 'react-native';
import React, {memo} from 'react';
import DefaultText from '../../../atoms/Text/DefaultText';
import {Gap} from '../../../atoms';
import {IcCalendar, IcPeopleTwo} from '../../../../theme/Images';
import moment from 'moment';
import {BookingInterface} from '../../../../interfaces/BookingInterface';
import {Sofa} from '../../../../assets/icons';
import {Colors} from '../../../../theme';
interface CardBooking {
  type: 'Paid' | 'Unpaid' | 'Canceled' | 'Finished';
  data?: BookingInterface;
  status?: string;
  onSelect: (data: BookingInterface) => void;
}

function CardBooking({type, data, onSelect, status}: CardBooking) {
  console.log('Status: ' + status);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="mx-3 p-2 bg-neutral-800 rounded-xl mb-3"
      onPress={() => (data ? onSelect(data) : undefined)}>
      <View className="flex-row justify-between">
        <View className="flex-row">
          <Text
            className="text-xs font-inter-semibold text-white text-center"
            style={{backgroundColor: '#EF9533', width: 60, padding: 5}}>
            Deposit
          </Text>
          <Text
            className="text-xs font-inter-semibold text-white text-center"
            style={{
              backgroundColor: '#0CA35F',
              width: 60,
              padding: 5,
              marginLeft: 5,
            }}>
            Deposit
          </Text>
        </View>
        <DefaultText
          title={`${moment(data?.bookingDate).format('ddd, DD MMM hh:mm')}`}
          titleClassName="text-xs text-neutral-400"
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
            title={`ID : ${data?.club_id}`}
            titleClassName="text-xs text-neutral-400 flex-1"
          />
          <DefaultText
            title={`${data?.clubName}`}
            titleClassName="text-base font-poppins-semibold"
          />
          <Gap height={2.5} />
          <View className="flex-row items-center">
            <TouchableOpacity className="mr-1.5">
              <Sofa color={Colors['white-70']} size={20} />
            </TouchableOpacity>
            <DefaultText
              title={`Table ${data?.tableName}`}
              titleClassName="text-xs font-inter-semibold"
              subtitleClassName="text-xs font-inter-medium"
            />
            <TouchableOpacity className="ml-2.5">
              <Image
                source={IcCalendar}
                resizeMode="contain"
                className="w-[16] tex-white h-[16] mr-1.5"
              />
            </TouchableOpacity>
            <Gap height={5} />
            <DefaultText
              title={`${moment(data?.bookingDate).format('ddd, DD MMM')}`}
              titleClassName="text-xs font-inter-semibold"
              subtitleClassName="text-xs font-inter-medium mr-1.5"
            />
          </View>
          <Gap height={5} />
          <View className="flex-row items-center">
            <Image
              source={IcPeopleTwo}
              resizeMode="contain"
              className="w-[16] h-[16]"
            />
            <DefaultText
              title={`${data?.joinedTotal}`}
              titleClassName="text-xs font-inter-medium text-neutral-500 ml-1"
            />
            {/* <Gap width={5} />
            <Image
              source={IcCoupon}
              resizeMode="contain"
              className="w-[16] h-[16]"
            />
            <DefaultText
              title={`${data?.couponUsed} coupon used`}
              titleClassName="text-xs font-inter-medium text-neutral-500 ml-1"
            /> */}
          </View>
          <Gap height={10} />

          <DefaultText
            title={`NT ${data?.paidTotal} | ${type.toUpperCase()}`}
            titleClassName="text-green-500 font-inter-bold text-xs text-right"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default memo(CardBooking);

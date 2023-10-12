import {Image, TouchableOpacity, View, Text} from 'react-native';
import React from 'react';
import DefaultText from '../../../atoms/Text/DefaultText';
import {Gap, Section} from '../../../atoms';
import {IcPeopleTwo} from '../../../../theme/Images';
import moment from 'moment';
import {BookingInterface} from '../../../../interfaces/BookingInterface';
import {Sofa} from '../../../../assets/icons';
import {Colors} from '../../../../theme';
import {CalendarSecond} from '../../../../assets/icons/CalendarSecond';
import {currency} from '../../../../utils/function';
import LinearGradient from 'react-native-linear-gradient';
interface CardBooking {
  type: 'Paid' | 'Unpaid' | 'Canceled' | 'Finished';
  data?: BookingInterface;
  status?: string;
  onSelect: (data: BookingInterface) => void;
}

function CardBooking({type, data, onSelect, status}: CardBooking) {
  let tagOne = 'Deposit';
  let bgColorTagOne = '#EF9533';
  let tagTwo = 'Checked';
  let bgColorTagTwo = '#0CA35F';
  switch (status) {
    case 'Walk in Ticket':
      tagOne = 'VIP Ticket';
      break;
    case 'Direct Order':
      tagOne = 'Host Order';
      break;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="mx-3 p-2 bg-neutral-800 rounded-xl mb-3"
      onPress={() => (data ? onSelect(data) : undefined)}>
      <View className="flex-row justify-between">
        <View className="flex-row">
          {status === 'Walk in Ticket' ? (
            <LinearGradient
              style={{borderRadius: 4, width: 100}}
              start={{x: 0.8, y: 0}}
              end={{x: 0, y: 1}}
              colors={['#FFE419', '#F27611']}
              className="p-1 rounded-sm">
              <Text className="text-xs font-inter-semibold text-white text-center">
                {tagOne}
              </Text>
            </LinearGradient>
          ) : (
            status === 'Booking Table' && (
              <>
                <View
                  className="p-1 rounded-sm"
                  style={{
                    backgroundColor: bgColorTagOne,
                    borderRadius: 4,
                    width: 80,
                  }}>
                  <Text className="text-xs font-inter-semibold text-white text-center">
                    {tagOne}
                  </Text>
                </View>
                <View
                  className="ml-2 p-1 rounded-sm"
                  style={{
                    backgroundColor: bgColorTagTwo,
                    borderRadius: 4,
                    width: 80,
                  }}>
                  <Text className="text-xs font-inter-semibold text-white text-center">
                    {tagTwo}
                  </Text>
                </View>
              </>
            )
          )}
          {status === 'Direct Order' && (
            <View
              className="p-1 rounded-sm"
              style={{
                backgroundColor: bgColorTagTwo,
                borderRadius: 4,
                width: 100,
              }}>
              <Text className="text-xs font-inter-semibold text-white text-center">
                {tagOne}
              </Text>
            </View>
          )}
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
          <Gap height={status === 'Walk in Ticket' ? 2.5 : 10} />
          <DefaultText
            title={`${data?.clubName}`}
            titleClassName="text-base font-poppins-semibold"
          />
          <Gap height={2.5} />
          {status === 'Walk in Ticket' ? (
            <View className="flex-row items-center">
              <TouchableOpacity
                className={status === 'Walk in Ticket' ? 'ml-0' : 'ml-2.5'}>
                <CalendarSecond color={Colors['white-70']} size={20} />
              </TouchableOpacity>
              <DefaultText
                title={`${moment(data?.bookingDate).format('ddd, DD MMM')}`}
                titleClassName="text-xs font-inter-semibold ml-1.5"
              />
            </View>
          ) : (
            status === 'Booking Table' && (
              <View className="flex-row items-center">
                <TouchableOpacity className="mr-1.5">
                  <Sofa color={Colors['white-70']} size={20} />
                </TouchableOpacity>
                <DefaultText
                  title={`Table ${data?.tableName}`}
                  titleClassName="text-xs font-inter-semibold"
                />
                <TouchableOpacity
                  className={status === 'Booking Table' ? 'ml-2.5' : 'ml-0'}>
                  <CalendarSecond color={Colors['white-70']} size={20} />
                </TouchableOpacity>
                <DefaultText
                  title={`${moment(data?.bookingDate).format(
                    'ddd, DD MMM hh:mm',
                  )}`}
                  titleClassName="text-xs font-inter-semibold ml-1.5"
                />
              </View>
            )
          )}
          {status !== 'Direct Order' && <Gap height={10} />}
          {status !== 'Direct Order' && (
            <View className="w-full h-[0.5px] bg-neutral-600" />
          )}
          {status !== 'Direct Order' && <Gap height={10} />}
          {status === 'Booking Table' ? (
            <Section isRow isBetween>
              <Section isRow>
                <>
                  <Image
                    source={IcPeopleTwo}
                    resizeMode="contain"
                    className="w-[16] h-[16]"
                  />
                  <DefaultText
                    title={`${data?.joinedTotal}`}
                    titleClassName="text-xs font-inter-medium text-neutral-500 ml-1"
                  />
                </>
              </Section>
              <DefaultText
                title={`${currency(data?.paidTotal)} | ${type.toUpperCase()}`}
                titleClassName={
                  'text-right text-green-500 font-inter-bold text-xs'
                }
              />
            </Section>
          ) : (
            status === 'Walk in Ticket' && (
              <DefaultText
                title={`${currency(data?.paidTotal)} | ${type.toUpperCase()}`}
                titleClassName={
                  'text-right text-green-500 font-inter-bold text-xs'
                }
              />
            )
          )}
          {status === 'Direct Order' && (
            <DefaultText title={'1x Jack D, 1x Balihai beer, 2x Singapo...'} />
          )}
          <Gap height={10} />
          {status === 'Direct Order' && (
            <DefaultText
              title={`${currency(data?.paidTotal)} | ${type.toUpperCase()}`}
              titleClassName={
                'text-left text-green-500 font-inter-bold text-xs'
              }
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default CardBooking;

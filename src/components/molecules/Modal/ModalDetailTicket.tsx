import {StyleSheet, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import DefaultText from '../../atoms/Text/DefaultText';
import {GradientText, Spacer} from '../../atoms';
import {currency} from '../../../utils/function';
import {BookingDetailInterface} from '../../../interfaces/BookingInterface';

interface ModalDetailTicket {
  booking: BookingDetailInterface | null;
  memberLength: number;
  show: boolean;
  hide: () => void;
}

export default function ModalDetailTicket({
  show,
  hide,
  booking,
  memberLength,
}: ModalDetailTicket) {
  return (
    <Modal
      className="m-0 p-0"
      isVisible={show}
      onBackButtonPress={hide}
      onBackdropPress={hide}>
      <View className="absolute bottom-0 right-0 left-0 bg-container p-4 rounded-t-xl bg-neutral-800">
        <View className="w-[50] h-[4] rounded-full bg-neutral-600 self-center" />
        <Spacer height={15} />
        <GradientText colors={['#A060FA', '#C800CC']} style={styles.titleSong}>
          Payment detail
        </GradientText>
        <Spacer height={15} />
        <View className="bg-[#2D2D2D] p-4 rounded-xl">
          <DefaultText
            title="Booking Detail"
            titleClassName="text-base font-inter-semibold"
          />
          <Spacer height={10} />
          <View className="flex-row items-center">
            <View className="flex-1">
              <DefaultText title="Table" titleClassName="font-inter-medium" />
              <DefaultText
                title={`Table code: ${booking?.tableName?.replace(
                  booking?.clubName + ' - ',
                  '',
                )}`}
                titleClassName="text-xs font-inter-medium text-neutral-400"
              />
            </View>
            <DefaultText title={currency(30000)} />
          </View>
          <Spacer height={10} />
          <View className="flex-row items-center">
            <View className="flex-1">
              <DefaultText title="Guest" titleClassName="font-inter-medium" />
              <DefaultText
                title={memberLength.toString()}
                titleClassName="text-xs font-inter-medium text-neutral-400"
              />
            </View>
            <DefaultText title={currency(0)} />
          </View>
          <Spacer height={10} />
          <View className="flex-row items-center">
            <View className="flex-1">
              <DefaultText
                title="Discount"
                titleClassName="font-inter-medium"
              />
            </View>
            <DefaultText title={currency(1500)} />
          </View>
          <Spacer height={10} />
          <View className="flex-row items-center">
            <View className="flex-1">
              <DefaultText
                title="Platform Service Fee"
                titleClassName="font-inter-medium"
              />
              <DefaultText
                title="5%"
                titleClassName="text-xs font-inter-medium text-neutral-400"
              />
            </View>
            <DefaultText title={currency(10500)} />
          </View>
          <Spacer height={10} />
          <View className="flex-row items-center">
            <View className="flex-1">
              <DefaultText title="TOTAL" titleClassName="font-inter-bold" />
            </View>
            <DefaultText
              title={currency(booking?.paidTotal)}
              titleClassName="font-inter-bold"
            />
          </View>
          <View className="w-full h-[0.5] bg-neutral-500 my-3" />
          <DefaultText
            title="Payment Status"
            titleClassName="font-inter-semibold text-base"
          />
          <Spacer height={10} />
          <View className="flex-row items-center">
            <View className="flex-1">
              <DefaultText
                title="Pais using VISA"
                titleClassName="font-inter-medium"
              />
              <DefaultText
                title="at 15 june 2023"
                titleClassName="text-xs font-inter-medium text-neutral-400"
              />
            </View>
            <DefaultText title="XXXX XXXX XX32" />
          </View>
        </View>

        <Spacer height={15} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  titleSong: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
});

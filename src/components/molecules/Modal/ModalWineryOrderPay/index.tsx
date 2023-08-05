import {ScrollView, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import DefaultText from '../../../atoms/Text/DefaultText';
import {Gap} from '../../../atoms';
import Switch from '../../../atoms/Switch';
import LinearGradient from 'react-native-linear-gradient';

interface ModalWineryOrderPay {
  show: boolean;
  hide: () => void;
}

export default function ModalWineryOrderPay({show, hide}: ModalWineryOrderPay) {
  const [splitBill, setSplitBill] = useState<boolean>(false);
  const [payment, setPayment] = useState<string>('visa');

  return (
    <Modal
      className="m-0 p-0"
      isVisible={show}
      onBackButtonPress={hide}
      onBackdropPress={hide}>
      <View className="absolute bottom-0 right-0 left-0 bg-container rounded-t-xl bg-neutral-800 pt-4">
        <View className="w-[50] h-[4] rounded-full bg-neutral-600 self-center" />
        <Gap height={15} />
        <DefaultText
          title="Order Detail"
          titleClassName="font-inter-bold text-base text-center"
        />
        <Gap height={15} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="px-4">
            <View className="bg-[#2D2D2D] p-4 rounded-xl">
              <DefaultText
                title="Items"
                titleClassName="text-base font-inter-semibold"
              />
              <Gap height={10} />
              <View className="flex-row items-center mb-[10]">
                <View className="flex-1">
                  <DefaultText
                    title="Veuve Clicquot Brut Set x 6"
                    titleClassName="font-inter-medium"
                  />
                  <DefaultText
                    title="Table code: X3"
                    titleClassName="text-xs font-inter-medium text-neutral-400"
                  />
                </View>
                <DefaultText title="NT 36.000" />
              </View>
              <View className="flex-row items-center mb-[10]">
                <View className="flex-1">
                  <DefaultText
                    title="Veuve Clicquot Brut Set x 6"
                    titleClassName="font-inter-medium"
                  />
                  <DefaultText
                    title="Table code: X3"
                    titleClassName="text-xs font-inter-medium text-neutral-400"
                  />
                </View>
                <DefaultText title="NT 36.000" />
              </View>
              <Gap height={10} />
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
                <DefaultText title="NT 1.000" />
              </View>
              <Gap height={10} />
              <View className="flex-row items-center">
                <View className="flex-1">
                  <DefaultText title="TOTAL" titleClassName="font-inter-bold" />
                </View>
                <DefaultText
                  title="NT 31.500"
                  titleClassName="font-inter-bold"
                />
              </View>
            </View>

            <Gap height={15} />
            <View className="bg-[#2D2D2D] p-4 rounded-xl">
              <View className="flex-row items-center">
                <DefaultText
                  title="Split Bill"
                  titleClassName="font-inter-bold flex-1"
                />
                <Switch
                  value={splitBill}
                  onValueChange={value => setSplitBill(value)}
                />
              </View>
            </View>

            <Gap height={15} />
            <View className="bg-[#2D2D2D] p-4 rounded-xl">
              <DefaultText
                title="Payment Method"
                titleClassName="font-inter-bold text-center"
              />
              <Gap height={10} />
              <TouchableOpacity
                className="flex-row items-center"
                onPress={() => setPayment('cash')}>
                {payment === 'cash' ? (
                  <View className="w-[15] h-[15] border-[1px] border-blue-500 rounded-full p-[1]">
                    <View className="w-full h-full rounded-full bg-blue-500" />
                  </View>
                ) : (
                  <View className="w-[15] h-[15] border-[1px] border-white rounded-full" />
                )}
                <Gap width={5} />
                <DefaultText title="Cash" />
              </TouchableOpacity>
              <Gap height={10} />
              <TouchableOpacity
                className="flex-row items-center"
                onPress={() => setPayment('visa')}>
                {payment === 'visa' ? (
                  <View className="w-[15] h-[15] border-[1px] border-blue-500 rounded-full p-[1]">
                    <View className="w-full h-full rounded-full bg-blue-500" />
                  </View>
                ) : (
                  <View className="w-[15] h-[15] border-[1px] border-white rounded-full" />
                )}
                <Gap width={5} />
                <DefaultText title="VISA +64" />
              </TouchableOpacity>
            </View>
            <Gap height={10} />
          </View>
        </ScrollView>
        <TouchableOpacity
          className="mt-3"
          activeOpacity={0.8}
          onPress={() => {}}>
          <LinearGradient
            className="py-4"
            colors={['#AA5AFA', '#C111D5']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <DefaultText
              title="Pay"
              titleClassName="text-base font-inter-bold text-center"
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import DefaultText from '../../../atoms/Text/DefaultText';
import {Gap} from '../../../atoms';
import QRCode from 'react-native-qrcode-svg';
import {currency} from '../../../../utils/function';

interface ModalWineryOrderDetail {
  show: boolean;
  hide: () => void;
}

export default function ModalWineryOrderDetail({
  show,
  hide,
}: ModalWineryOrderDetail) {
  return (
    <Modal
      className="m-0 p-0"
      isVisible={show}
      onBackButtonPress={hide}
      onBackdropPress={hide}>
      <View className="absolute bottom-0 right-0 left-0 bg-container rounded-t-xl bg-neutral-800 pt-4 max-h-[700]">
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
                <DefaultText title={currency(1500)} />
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
                <DefaultText title={currency(1500)} />
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
                <DefaultText title={currency(1000)} />
              </View>
              <Gap height={10} />
              <View className="flex-row items-center">
                <View className="flex-1">
                  <DefaultText title="TOTAL" titleClassName="font-inter-bold" />
                </View>
                <DefaultText
                  title={currency(66000)}
                  titleClassName="font-inter-bold"
                />
              </View>
            </View>

            <Gap height={15} />
            <DefaultText
              title="Public QR"
              titleClassName="font-inter-bold text-center"
            />
            <Gap height={10} />
            <DefaultText
              title={
                'Split bill can be paid by scan this QR,\nask your guest in bill list to scan'
              }
              titleClassName="text-center"
            />
            <Gap height={15} />
            <View className="self-center bg-[#2D2D2D] rounded-lg p-2">
              <QRCode value="http://awesome.link.qr" size={200} />
            </View>

            <Gap height={15} />
            <View className="bg-[#2D2D2D] p-4 rounded-xl">
              <DefaultText
                title="Split Bill - Equally"
                titleClassName="text-base font-inter-semibold"
              />
              <Gap height={10} />
              <SplitBillItem />
              <SplitBillItem />
              <SplitBillItem />
            </View>
            <Gap height={30} />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const SplitBillItem = () => {
  return (
    <View className="flex-row items-center border-b-[0.5px] border-b-neutral-600 py-1 mb-2">
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60',
        }}
        resizeMode="cover"
        className="w-[33] h-[33] rounded-full bg-neutral-500"
      />
      <Gap width={8} />
      <View className="flex-1">
        <DefaultText
          title={'Not yet pay'}
          titleClassName="font-inter-regular text-xs text-red-600"
        />
        <Gap height={5} />
        <DefaultText
          title={'Jennifer'}
          titleClassName="font-inter-semibold text-base"
        />
        <DefaultText
          title={currency(10500)}
          titleClassName="font-inter-regular text-neutral-400 text-xs"
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        className="bg-primary px-3 py-2 rounded-md"
        onPress={() => {}}>
        <DefaultText title="Send QR" />
      </TouchableOpacity>
    </View>
  );
};

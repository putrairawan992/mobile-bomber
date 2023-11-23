import {ScrollView, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import DefaultText from '../../../atoms/Text/DefaultText';
import {Gap} from '../../../atoms';
import QRCode from 'react-native-qrcode-svg';
import {currency} from '../../../../utils/function';

interface ModalWineryOrderDetail {
  show: boolean;
  hide: () => void;
  checkoutItems: any;
}

export default function ModalWineryOrderDetail({
  show,
  hide,
  checkoutItems,
}: ModalWineryOrderDetail) {
  const calculateTotal = () => {
    let total = 0;
    for (const item of checkoutItems) {
      total += item.price * item.quantity;
    }
    return total;
  };

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
              {checkoutItems.map((item: any) => {
                return (
                  <View className="flex-row items-center mb-[10]">
                    <View className="flex-1">
                      <DefaultText
                        title={`${item.englishProductTitle} x ${item.quantity}`}
                        titleClassName="font-inter-medium"
                      />
                      <DefaultText
                        title={`Table code: ${item.quantity}`}
                        titleClassName="text-xs font-inter-medium text-neutral-400"
                      />
                    </View>
                    <DefaultText title={currency(item.price * item.quantity)} />
                  </View>
                );
              })}
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
                  title={`${currency(calculateTotal() + 1000)}`}
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

            <Gap height={30} />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

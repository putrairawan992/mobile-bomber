import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import DefaultText from '../../../atoms/Text/DefaultText';
import {Gap} from '../../../atoms';
import {IcCheckHistory, IcRemoveCard} from '../../../../theme/Images';

interface ModalPaymentPage {
  show: boolean;
  hide: () => void;
  onRemoveCard: () => void;
  onCheckHistory: () => void;
  onDefaultPayment: () => void;
}

export default function ModalPaymentPage({
  show,
  hide,
  onRemoveCard,
  onCheckHistory,
  onDefaultPayment,
}: ModalPaymentPage) {
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
          title="Option"
          titleClassName="font-inter-bold text-base text-center"
        />
        <Gap height={15} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="px-4">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => onDefaultPayment()}
              className="bg-[#2D2D2D] p-4 mb-4 rounded-md flex-row items-center">
              <DefaultText
                title="Set As Default"
                titleClassName="font-inter-medium flex-1 ml-3"
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              className="bg-[#2D2D2D] p-4 rounded-md flex-row items-center"
              onPress={() => onRemoveCard()}>
              <Image
                source={IcRemoveCard}
                resizeMode="contain"
                className="w-[20] h-[20]"
              />
              <DefaultText
                title="Remove Card"
                titleClassName="font-inter-medium flex-1 ml-3"
              />
            </TouchableOpacity>
            <Gap height={10} />
            <TouchableOpacity
              activeOpacity={0.7}
              className="bg-[#2D2D2D] p-4 rounded-md flex-row items-center"
              onPress={() => onCheckHistory()}>
              <Image
                source={IcCheckHistory}
                resizeMode="contain"
                className="w-[20] h-[20]"
              />
              <DefaultText
                title="Check history"
                titleClassName="font-inter-medium flex-1 ml-3"
              />
            </TouchableOpacity>
          </View>
          <Gap height={50} />
        </ScrollView>
      </View>
    </Modal>
  );
}

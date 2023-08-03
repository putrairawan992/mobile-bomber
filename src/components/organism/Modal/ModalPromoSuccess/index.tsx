import {View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {Button, DefaultText, Gap} from '../../../atoms';

interface ModalPromoSuccessProps {
  show: boolean;
  hide: () => void;
  onBackHome: () => void;
}

export default function ModalPromoSuccess({
  show,
  hide,
  onBackHome,
}: ModalPromoSuccessProps) {
  return (
    <Modal
      className="m-0 p-0"
      isVisible={show}
      onBackButtonPress={hide}
      onBackdropPress={hide}>
      <View className="absolute bottom-0 right-0 left-0 bg-container p-4 rounded-t-xl">
        <View className="w-[50] h-[4] rounded-full bg-gray self-center" />
        <Gap height={15} />
        <DefaultText
          title="Coupon Applied"
          titleClassName="text-center text-base font-inter-bold text-warning"
        />
        <Gap height={20} />
        <DefaultText
          title="Sucessfuly Apply Coupon"
          titleClassName="text-center text-2xl font-inter-bold"
        />
        <Gap height={30} />
        <Button
          type="secondary"
          title="Back to homepage"
          onPress={onBackHome}
        />
        <Gap height={15} />
      </View>
    </Modal>
  );
}

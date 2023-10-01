import {View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {Button, DefaultText, Gap, Text} from '../../../atoms';
import {Colors} from '../../../../theme';

interface ModalPromoSuccessProps {
  show: boolean;
  hide: () => void;
  onBackHome: () => void;
  isClaim?: boolean;
}

export default function ModalPromoSuccess({
  show,
  hide,
  onBackHome,
  isClaim,
}: ModalPromoSuccessProps) {
  return (
    <Modal
      className="m-0 p-0"
      isVisible={show}
      onBackButtonPress={hide}
      onBackdropPress={hide}>
      <View className="absolute bottom-0 right-0 left-0 bg-container p-4 rounded-t-xl bg-neutral-800">
        <View className="w-[50] h-[4] rounded-full bg-neutral-600 self-center" />
        <Gap height={15} />
        <DefaultText
          title="Coupon Applied"
          titleClassName="text-center text-base font-inter-bold text-warning"
        />
        <Gap height={20} />
        <Text
          variant="large"
          fontWeight="bold"
          color={Colors['white-100']}
          label="Successfuly Apply Coupon"
          textAlign="center"
        />
        <Gap height={54} />
        <Button
          buttonPrimaryColors={['#A060FA', '#A060FA']}
          type="primary"
          TextComponent={
            <DefaultText
              title={isClaim ? 'Close' : 'Back to order'}
              titleClassName="font-poppins-regular text-base"
            />
          }
          onPress={onBackHome}
        />
        <Gap height={15} />
      </View>
    </Modal>
  );
}

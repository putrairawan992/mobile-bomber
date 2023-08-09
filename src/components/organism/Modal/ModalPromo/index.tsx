import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {Button, DefaultText, Gap} from '../../../atoms';
import {colors} from '../../../../utils/colors';
import {ArrowRight2, Information, People} from 'iconsax-react-native';

interface ModalPromoProps {
  show: boolean;
  hide: () => void;
  onUse: () => void;
}

export default function ModalPromo({show, hide, onUse}: ModalPromoProps) {
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
          title="50% Discount"
          titleClassName="text-center text-[18px] font-inter-bold"
        />
        <Gap height={5} />
        <DefaultText title="1/2 coupon applied" titleClassName="text-center" />
        <Gap height={15} />
        <View className="bg-gray-secondary p-3 rounded-lg">
          <View className="flex-row items-center">
            <View className="w-[5] h-[5] bg-white rounded-full" />
            <DefaultText
              title="Minimal order 2 cocktail"
              titleClassName="flex-1 ml-1"
            />
          </View>
          <Gap height={2.5} />
          <View className="flex-row items-center">
            <View className="w-[5] h-[5] bg-white rounded-full" />
            <DefaultText
              title="Only for dine in"
              titleClassName="flex-1 ml-1"
            />
          </View>
          <Gap height={2.5} />
          <View className="flex-row items-center">
            <View className="w-[5] h-[5] bg-white rounded-full" />
            <DefaultText
              title="Cannot use by special member"
              titleClassName="flex-1 ml-1"
            />
          </View>
        </View>
        <Gap height={15} />
        <View className="flex-row items-center border-[1px] border-white self-start rounded-full py-1 px-2">
          <People color={colors.white} size={18} />
          <DefaultText
            title="walk in only"
            titleClassName="font-inter-bold ml-1"
          />
        </View>
        <Gap height={20} />
        <TouchableOpacity activeOpacity={0.7} className="flex-row items-center">
          <Information color={colors.white} size={20} />
          <DefaultText
            title="Read Term and Conditions"
            titleClassName="flex-1 mx-2"
          />
          <ArrowRight2 color={colors.white} size={24} />
        </TouchableOpacity>
        <Gap height={20} />
        <Button title="Use" onPress={onUse} type="primary" />
        <Gap height={15} />
      </View>
    </Modal>
  );
}

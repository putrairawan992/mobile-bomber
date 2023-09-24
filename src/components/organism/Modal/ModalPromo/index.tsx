import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {Button, DefaultText, Gap, GradientText} from '../../../atoms';
import {colors} from '../../../../utils/colors';
import {ArrowRight2} from 'iconsax-react-native';
import {IcDoor, IcWarning} from '../../../../theme/Images';
import {CouponInterface} from '../../../../interfaces/PlaceInterface';

interface ModalPromoProps {
  show: boolean;
  hide: () => void;
  onUse: () => void;
  BannerComponent?: JSX.Element;
  data: CouponInterface;
}

export default function ModalPromo({
  show,
  hide,
  onUse,
  BannerComponent,
  data,
}: ModalPromoProps) {
  return (
    <Modal
      className="m-0 p-0"
      isVisible={show}
      onBackButtonPress={hide}
      onBackdropPress={hide}>
      <View className="absolute bottom-0 right-0 left-0 bg-container p-4 rounded-t-xl bg-neutral-800">
        <View className="w-[50] h-[4] rounded-full bg-neutral-600 self-center" />
        <Gap height={15} />
        <GradientText colors={['#C800CC', '#A060FA']} style={styles.discount}>
          {data?.title}
        </GradientText>
        <Gap height={5} />
        <DefaultText title="1/2 coupon applied" titleClassName="text-center" />
        <Gap height={15} />
        {BannerComponent ?? (
          <View className="bg-gray-secondary p-3 rounded-lg">
            <View className="flex-row items-center">
              <View className="w-[5] h-[5] bg-white rounded-full" />
              <DefaultText
                title={data?.description}
                titleClassName="flex-1 ml-1"
              />
            </View>
            {/* <Gap height={2.5} />
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
            </View> */}
          </View>
        )}
        <Gap height={15} />
        <View className="flex-row items-center border-[1px] border-white self-start rounded-full py-1 px-2">
          <Image
            source={IcDoor}
            resizeMode="contain"
            className="w-[16] h-[16]"
          />
          <DefaultText
            title="walk in only"
            titleClassName="font-inter-bold ml-1"
          />
        </View>
        <Gap height={20} />
        <TouchableOpacity activeOpacity={0.7} className="flex-row items-center">
          <Image
            source={IcWarning}
            resizeMode="contain"
            className="w-[16] h-[16]"
          />
          <DefaultText
            title="Read Term and Conditions"
            titleClassName="flex-1 mx-2"
          />
          <ArrowRight2 color={colors.white} size={20} />
        </TouchableOpacity>
        <Gap height={20} />
        <Button title="Use" onPress={onUse} type="primary" />
        <Gap height={15} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  discount: {
    textAlign: 'center',
    fontFamily: 'Inter-Bold',
    fontSize: 18,
  },
});

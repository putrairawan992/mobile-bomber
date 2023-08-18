import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import DefaultText from '../../../atoms/Text/DefaultText';
import {Gap} from '../../../atoms';
import Header from '../../Header';
import colors from '../../../../styles/colors';
import CardCoupon from '../../Card/CardCoupon';

interface ModalBookingTablePromotion {
  show: boolean;
  hide: () => void;
}

export default function ModalBookingTablePromotion({
  show,
  hide,
}: ModalBookingTablePromotion) {
  return (
    <Modal
      className="m-0 p-0"
      isVisible={show}
      onBackButtonPress={hide}
      onBackdropPress={hide}>
      <View className="absolute bottom-0 right-0 left-0 top-0 bg-container rounded-t-xl bg-neutral-800 pt-4">
        <Gap height={10} />
        <Header
          hasBackBtn
          transparent
          title="Promotion"
          titleStyle={styles.title}
          onBackPress={hide}
        />
        <Gap height={15} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="px-4">
            <View className="bg-[#2D2D2D] p-4 rounded-xl">
              <DefaultText
                title="Inside Omni"
                titleClassName="text-base font-inter-bold"
              />
              <Gap height={10} />
              <CardCoupon
                type="free"
                title="Free 2 cocktail"
                subtitle="Minimum purchase NT 15.000"
                containerClassName="mx-0"
                contentClassName="bg-neutral-800"
                onPress={() => hide()}
              />
              <CardCoupon
                type="discount"
                title="Discount  50% for ladies"
                subtitle="Entry before 11pm"
                warning="4 hours before promo ended"
                containerClassName="mx-0"
                contentClassName="bg-neutral-800"
                onPress={() => hide()}
              />
              <CardCoupon
                type="discount"
                title="Discount NT 3.000 for any Food"
                subtitle="Entry before 11pm"
                containerClassName="mx-0"
                contentClassName="bg-neutral-800"
                onPress={() => hide()}
              />
            </View>
            <Gap height={20} />
            <View className="bg-[#2D2D2D] p-4 rounded-xl">
              <DefaultText
                title="Platform Coupon"
                titleClassName="text-base font-inter-bold"
              />
              <Gap height={10} />
              <CardCoupon
                type="discount"
                title="Discount NT 3.000 for any Food"
                subtitle="Entry before 11pm"
                containerClassName="mx-0"
                contentClassName="bg-neutral-800"
                onPress={() => hide()}
              />
              <CardCoupon
                type="discount"
                title="Discount NT 3.000 for any Food"
                subtitle="Entry before 11pm"
                containerClassName="mx-0"
                contentClassName="bg-neutral-800"
                onPress={() => hide()}
              />
              <CardCoupon
                type="discount"
                title="Discount NT 3.000 for any Food"
                subtitle="Entry before 11pm"
                containerClassName="mx-0"
                contentClassName="bg-neutral-800"
                onPress={() => hide()}
              />
            </View>

            <Gap height={30} />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.white,
  },
});

/* eslint-disable react-native/no-inline-styles */
import {ScrollView, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import DefaultText from '../../../atoms/Text/DefaultText';
import {EntryAnimation, Gap, Loading, Section, Text} from '../../../atoms';
import {Colors} from '../../../../theme';
import {ArrowLeft} from 'iconsax-react-native';
import useTheme from '../../../../theme/useTheme';
import {
  CouponInterface,
  PlaceInterface,
} from '../../../../interfaces/PlaceInterface';
import {NightlifeService} from '../../../../service/NightlifeService';
import {useAppSelector} from '../../../../hooks/hooks';
import CardCoupon from '../../Card/CardCoupon';

interface ModalBookingTablePromotion {
  show: boolean;
  hide: () => void;
  onApplied: (coupon: CouponInterface) => void;
  placeData: PlaceInterface | null;
  appliedCoupons: string[];
}

export default function ModalBookingTablePromotion({
  show,
  hide,
  onApplied,
  placeData,
  appliedCoupons,
}: ModalBookingTablePromotion) {
  const {user} = useAppSelector(state => state.user);
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [couponList, setCouponList] = useState<CouponInterface[]>([]);
  useEffect(() => {
    async function getCouponList() {
      try {
        setIsLoading(true);
        const response = await NightlifeService.getClaimedCoupon({
          customer_id: user.id,
        });
        if (!response.error) {
          setCouponList(response.data);
        }
        setIsLoading(false);
      } catch (error: any) {}
    }
    show && getCouponList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const onSuccess = (coupon: CouponInterface) => {
    hide();
    onApplied(coupon);
  };

  return (
    <Modal
      className="m-0 p-0"
      isVisible={show}
      onBackButtonPress={hide}
      onBackdropPress={hide}>
      {isLoading && <Loading />}
      <View className="absolute bottom-0 right-0 left-0 top-0 bg-container rounded-t-xl bg-neutral-800 pt-4">
        <Gap height={10} />
        <TouchableOpacity
          style={{position: 'absolute', zIndex: 999, left: 16, top: 32}}
          onPress={hide}>
          <ArrowLeft size={24} color={theme?.colors.ICON} />
        </TouchableOpacity>
        <Section isCenter padding="10px 0px">
          <Text
            color={Colors['warning-500']}
            label="Promotion"
            fontWeight="semi-bold"
            variant="base"
          />
        </Section>
        <Gap height={15} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="px-4">
            <View className="bg-[#2D2D2D] p-4 rounded-xl">
              <DefaultText
                title={`Inside ${placeData?.name}`}
                titleClassName="text-base font-inter-bold"
              />
              <Gap height={10} />
              {!couponList?.filter(el => el.source === 'club_owner')
                ?.length && (
                <Text color={Colors['gray-400']} label="There are no coupon" />
              )}
              {couponList
                ?.filter(el => el.source === 'club_owner')
                ?.map((item, idx) => (
                  <EntryAnimation index={idx} key={`internal_${idx}`}>
                    <CardCoupon
                      couponType="discount"
                      title={item.title}
                      subtitle={item.description}
                      containerClassName="mx-0"
                      contentClassName="bg-neutral-800"
                      onSuccess={onSuccess}
                      data={item}
                      appliedCoupons={appliedCoupons}
                    />
                  </EntryAnimation>
                ))}
            </View>
            <Gap height={20} />
            <View className="bg-[#2D2D2D] p-4 rounded-xl">
              <DefaultText
                title="Platform Coupon"
                titleClassName="text-base font-inter-bold"
              />
              <Gap height={10} />
              {!couponList?.filter(el => el.source === 'internal_plattform')
                ?.length && (
                <Text color={Colors['gray-400']} label="There are no coupon" />
              )}
              {couponList
                ?.filter(el => el.source === 'internal_plattform')
                ?.map((item, idx) => (
                  <EntryAnimation index={idx} key={`internal_${idx}`}>
                    <CardCoupon
                      couponType="discount"
                      title={item.title}
                      subtitle={item.description}
                      containerClassName="mx-0"
                      contentClassName="bg-neutral-800"
                      onSuccess={onSuccess}
                      data={item}
                      appliedCoupons={appliedCoupons}
                    />
                  </EntryAnimation>
                ))}
            </View>

            <Gap height={30} />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

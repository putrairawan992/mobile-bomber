import {Image, TouchableOpacity, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {images} from '../../../../utils/images';
import {DefaultText, Gap, Loading} from '../../../atoms';
import ModalPromo from '../../../organism/Modal/ModalPromo';
import ModalPromoSuccess from '../../../organism/Modal/ModalPromoSuccess';
import {CouponInterface} from '../../../../interfaces/PlaceInterface';
import {NightlifeService} from '../../../../service/NightlifeService';
import {useAppSelector} from '../../../../hooks/hooks';
import {ModalToastContext} from '../../../../context/AppModalToastContext';
import {ModalToast} from '../..';

interface CardCouponProps {
  couponType: 'free' | 'discount';
  title: string;
  subtitle: string;
  warning?: string;
  containerClassName?: string;
  contentClassName?: string;
  onPress?: () => void;
  onSuccess?: (coupon: CouponInterface) => void;
  data: CouponInterface;
  isClaim?: boolean;
  appliedCoupons: string[];
}

export default function CardCoupon({
  couponType,
  title,
  subtitle,
  warning,
  containerClassName,
  contentClassName,
  onSuccess,
  data,
  isClaim,
  appliedCoupons,
}: CardCouponProps) {
  const {user} = useAppSelector(state => state.user);
  const [showModalPromo, setShowModalPromo] = useState<boolean>(false);
  const [showModalSuccess, setShowModalSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    isShowToast,
    setIsShowToast,
    toastMessage,
    setToastMessage,
    type,
    setType,
  } = useContext(ModalToastContext);

  const openToast = (toastType: 'success' | 'error', message: string) => {
    setIsShowToast(true);
    setType(toastType);
    setToastMessage(message);
  };

  const onUse = async () => {
    try {
      setIsLoading(true);
      const response = await NightlifeService.postClaimCoupon({
        payload: {
          customer_id: user.id,
          coupon_id: data.id,
        },
      });
      if (!response.error) {
        setIsLoading(false);
        setShowModalPromo(false);
        setTimeout(() => setShowModalSuccess(true), 500);
      }
    } catch (error: any) {
      setIsLoading(false);
      setShowModalPromo(false);
      openToast('error', error.response.data.message);
    }
  };

  const onCheckAvaibility = async () => {
    try {
      setIsLoading(true);
      const response = await NightlifeService.getCouponAvaibility({
        coupon_id: data.couponId,
      });
      if (!response.error) {
        setShowModalPromo(false);
        setTimeout(() => setShowModalSuccess(true), 500);
      } else {
        setIsLoading(false);
        openToast('error', response.message);
      }
    } catch (error: any) {
      setIsLoading(false);
      openToast('error', error.response.data.message);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <TouchableOpacity
        activeOpacity={0.7}
        className={`mx-5 flex-row mb-3 ${containerClassName}`}
        onPress={() => {
          if (appliedCoupons.find(el => el === data.couponId)) {
            openToast('error', 'You already use this coupon');
          } else {
            setShowModalPromo(true);
          }
        }}>
        <Image
          className="w-[83] h-[91]"
          source={
            couponType === 'free'
              ? images.discountCocktail
              : images.discountPercent
          }
        />
        <View
          className={`bg-black flex-1 justify-center px-4 rounded-tr-lg rounded-br-lg ${contentClassName}`}>
          <DefaultText
            title={title}
            titleClassName="text-base font-inter-semibold"
          />
          <Gap height={2.5} />
          <DefaultText title={subtitle} titleClassName="text-xs" />
          {warning && (
            <DefaultText
              title={warning}
              titleClassName="text-xs text-red-500 mt-1"
            />
          )}
        </View>
      </TouchableOpacity>

      <ModalPromo
        show={showModalPromo}
        hide={() => setShowModalPromo(false)}
        onUse={() => {
          if (isClaim) {
            onUse();
          } else {
            onCheckAvaibility();
          }
        }}
        data={data}
        isClaim={isClaim}
      />

      <ModalPromoSuccess
        isClaim={isClaim}
        show={showModalSuccess}
        hide={() => setShowModalSuccess(false)}
        onBackHome={() => {
          setShowModalSuccess(false);
          onSuccess && setTimeout(() => onSuccess(data), 500);
        }}
      />

      <ModalToast
        isVisible={isShowToast}
        onCloseModal={() => {
          setIsShowToast(false);
        }}
        message={toastMessage}
        type={type}
      />
    </>
  );
}

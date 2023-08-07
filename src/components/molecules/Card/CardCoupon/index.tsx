import {Image, View} from 'react-native';
import React from 'react';
import {images} from '../../../../utils/images';
import {DefaultText, Gap} from '../../../atoms';

interface CardCouponProps {
  type: 'free' | 'discount';
  title: string;
  subtitle: string;
  warning?: string;
}

export default function CardCoupon({
  type,
  title,
  subtitle,
  warning,
}: CardCouponProps) {
  return (
    <View className="mx-5 flex-row mb-3">
      <Image
        className="w-[83] h-[91]"
        source={
          type === 'free' ? images.discountCocktail : images.discountPercent
        }
      />
      <View className="bg-black flex-1 justify-center px-4 rounded-tr-lg rounded-br-lg">
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
    </View>
  );
}

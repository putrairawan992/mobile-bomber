import {TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import {DefaultText} from '../../../atoms';
import {
  IcAmericanExpress,
  IcMasterCard,
  IcVisaLogo,
} from '../../../../theme/Images';
import {detectCreditCardType} from '../../../../utils/function';

interface CardPaymentPage {
  isDefault: boolean;
  number: string;
  noMask: string;
  onPress: () => void;
}

export default function CardPaymentPage({
  isDefault,
  number,
  noMask,
  onPress,
}: CardPaymentPage) {
  const [detectionCardType, setDetectionCardType] = useState<any>('');

  useEffect(() => {
    let imageUrl = IcMasterCard;
    switch (detectCreditCardType(noMask)) {
      case 'Visa':
        imageUrl = IcVisaLogo;
        break;
      case 'AmericanExpress':
        imageUrl = IcAmericanExpress;
    }
    setDetectionCardType(imageUrl);
  }, [noMask]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row bg-[#2f2f2f] h-[52] rounded-md justify-center items-center px-4 mb-3"
      onPress={() => onPress()}>
      <Image
        source={detectionCardType}
        resizeMode="contain"
        className="h-[16] w-[19]"
      />
      <DefaultText
        title={number}
        titleClassName="text-base font-inter-medium flex-1 ml-2"
      />
      {isDefault ? (
        <DefaultText title="default" titleClassName="text-yellow-700" />
      ) : (
        <DefaultText title="set as default" titleClassName="text-white-700" />
      )}
    </TouchableOpacity>
  );
}

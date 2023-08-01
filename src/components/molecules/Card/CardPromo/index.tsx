import {Image, ImageSourcePropType, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {images} from '../../../../utils/images';
import {DefaultText, Gap} from '../../../atoms';
import ModalPromo from '../../../organism/Modal/ModalPromo';
import ModalPromoSuccess from '../../../organism/Modal/ModalPromoSuccess';
import {colors} from '../../../../utils/colors';

interface CardPromoProps {
  image: string | ImageSourcePropType;
  title: string;
  subtitle: string;
  time: string;
}

export default function CardPromo({
  image,
  title,
  subtitle,
  time,
}: CardPromoProps) {
  const [showModalPromo, setShowModalPromo] = useState<boolean>(false);
  const [showModalSuccess, setShowModalSuccess] = useState<boolean>(false);

  const onUse = () => {
    setShowModalPromo(false);
    setTimeout(() => setShowModalSuccess(true), 500);
  };

  return (
    <>
      <LinearGradient
        className="p-3 rounded-xl w-[300] h-[178] mx-2"
        colors={[colors.primary, colors.secondary]}>
        <View className="flex-row items-center justify-between">
          <Image className="w-[50] h-[25]" source={images.logo} />
          <View className="bg-danger p-1 rounded-md">
            <DefaultText
              title={time}
              titleClassName="text-xs font-inter-bold"
            />
          </View>
        </View>
        <View className="flex-row">
          <Image
            className="h-[150] w-[50]"
            source={image as ImageSourcePropType}
          />
          <Gap width={10} />
          <View className="flex-1">
            <DefaultText
              title={title}
              titleClassName="font-inter-bold text-[28px]"
            />
            <Gap height={10} />
            <DefaultText
              title={subtitle}
              titleClassName="text-xs font-inter-medium"
            />
            <Gap height={15} />
            <TouchableOpacity
              onPress={() => setShowModalPromo(true)}
              activeOpacity={0.7}
              className="border-[1px] border-white self-start px-2 py-1 rounded-md">
              <DefaultText
                title="Grab Voucher"
                titleClassName="text-base font-inter-medium"
              />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <ModalPromo
        show={showModalPromo}
        hide={() => setShowModalPromo(false)}
        onUse={onUse}
      />

      <ModalPromoSuccess
        show={showModalSuccess}
        hide={() => setShowModalSuccess(false)}
        onBackHome={() => setShowModalSuccess(false)}
      />
    </>
  );
}

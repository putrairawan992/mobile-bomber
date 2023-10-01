import {
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {images} from '../../../../utils/images';
import {DefaultText, Gap} from '../../../atoms';
import ModalPromo from '../../../organism/Modal/ModalPromo';
import ModalPromoSuccess from '../../../organism/Modal/ModalPromoSuccess';
import {colors} from '../../../../utils/colors';
import {navigationRef} from '../../../../navigation/RootNavigation';
import {ImgPromoBackground} from '../../../../theme/Images';

interface CardPromoProps {
  image?: string | ImageSourcePropType;
  title?: string;
  subtitle?: string;
  time?: string;
  showLogo?: boolean;
  logoClassName?: string;
  headerClassName?: string;
  contentClassName?: string;
  backgroundColors?: string[];
  imageClassName?: string;
  isOther?: boolean;
  isBanner?: boolean;
}

export default function CardPromo({
  image,
  title,
  subtitle,
  time,
  showLogo = true,
  logoClassName,
  headerClassName,
  contentClassName,
  backgroundColors,
  imageClassName,
  isOther,
  isBanner,
}: CardPromoProps) {
  const [showModalPromo, setShowModalPromo] = useState<boolean>(false);
  const [showModalSuccess, setShowModalSuccess] = useState<boolean>(false);
  const [bannerActive, setBannerActive] = useState<boolean>(false);

  const {width} = useWindowDimensions();

  const onUse = () => {
    setShowModalPromo(false);
    setBannerActive(false);
    setTimeout(() => setShowModalSuccess(true), 500);
  };

  const OtherComponent = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        className="p-3 rounded-xl w-[171] h-[178] mx-2 bg-black justify-center"
        onPress={() => navigationRef.navigate('Offers' as never)}>
        <Image
          className="w-[50] h-[25] absolute top-3 left-3"
          source={images.logo}
        />
        <DefaultText
          title="Discover Other Promotion"
          titleClassName="font-inter-bold text-base"
        />
      </TouchableOpacity>
    );
  };

  const BannerComponent = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        className="p-3 rounded-xl w-[300] h-[178] mx-2 justify-end bg-black"
        onPress={() => {
          setShowModalPromo(true);
          setBannerActive(true);
        }}>
        <Image
          className="w-[50] h-[25] absolute top-3 left-4"
          source={images.logo}
        />
        <DefaultText
          title={title}
          titleClassName="font-inter-bold text-[28px]"
        />
        <DefaultText
          title={subtitle}
          titleClassName="font-inter-medium text-xs"
        />
        <Image
          className="w-[300] h-[178] absolute rounded-xl -z-10"
          source={ImgPromoBackground}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  };

  return (
    <>
      {isBanner ? (
        <BannerComponent />
      ) : isOther ? (
        <OtherComponent />
      ) : (
        <LinearGradient
          className="p-3 rounded-xl w-[300] h-[178] mx-2"
          colors={backgroundColors ?? [colors.primary, colors.secondary]}>
          <View
            className={`flex-row items-center justify-between ${headerClassName}`}>
            {showLogo && (
              <Image
                className={`w-[50] h-[25] ${logoClassName}`}
                source={images.logo}
              />
            )}
            {time && (
              <View className="bg-danger p-1 rounded-md">
                <DefaultText
                  title={time}
                  titleClassName="text-xs font-inter-bold"
                />
              </View>
            )}
          </View>
          <View className={`flex-row ${contentClassName}`}>
            <Image
              className={`h-[150] w-[50] ${imageClassName}`}
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
      )}

      <ModalPromo
        isClaim={false}
        show={showModalPromo}
        hide={() => {
          setShowModalPromo(false);
          setBannerActive(false);
        }}
        onUse={onUse}
        BannerComponent={
          bannerActive ? (
            <View
              className="p-3 rounded-xl h-[178] justify-end bg-black"
              style={{width: width - 30}}>
              <Image
                className="w-[50] h-[25] absolute top-3 left-4"
                source={images.logo}
              />
              <DefaultText
                title={title}
                titleClassName="font-inter-bold text-[28px]"
              />
              <DefaultText
                title={subtitle}
                titleClassName="font-inter-medium text-xs mr-[130px]"
              />
              <Image
                className="h-[178] absolute rounded-xl -z-10"
                source={ImgPromoBackground}
                resizeMode="cover"
                style={{width: width - 30}}
              />
            </View>
          ) : undefined
        }
      />

      <ModalPromoSuccess
        show={showModalSuccess}
        hide={() => setShowModalSuccess(false)}
        onBackHome={() => setShowModalSuccess(false)}
      />
    </>
  );
}

import {Image, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {DefaultText, Gap} from '../../../atoms';
import ModalImage from '../../Modal/ModalImage';
import {ItemProductBasedOnClubIdInterface} from '../../../../interfaces/PlaceInterface';
import {formatCurrency} from '../../../../utils/currency';

interface CardWineryOrderInterface {
  item: ItemProductBasedOnClubIdInterface;
  actionChangeGetProduct(values: any): void;
}

export default function CardWineryOrder({
  item,
  actionChangeGetProduct,
}: CardWineryOrderInterface) {
  const [showNumber, setShowNumber] = useState<boolean>(false);
  const [showImage, setShowImage] = useState<boolean>(false);
  const [value, setValue] = useState<number>(1);

  return (
    <View className="flex-row px-5 py-6">
      <View className="flex-1">
        <DefaultText
          title={item?.productName ?? ''}
          titleClassName="font-inter-medium"
        />
        <Gap height={4} />
        {/* <DefaultText
          title={'法國凱歌香檳 x 6'}
          titleClassName="font-inter-medium text-xs"
        />
        <Gap height={4} /> */}
        <DefaultText
          title={`NT ${formatCurrency(String(item?.productPrice ?? ''))}`}
          titleClassName="font-inter-medium text-xs text-[#3ca6ec]"
        />
        <Gap height={8} />
        {showNumber ? (
          <View className="flex-row items-center rounded-[5px] px-3 py-[2] self-start border-[1px] border-white">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                value > 1 ? setValue(value - 1) : setShowNumber(false);

                actionChangeGetProduct({data: item, quantity: value - 1});
              }}>
              <DefaultText
                title="-"
                titleClassName="text-xl text-neutral-400"
              />
            </TouchableOpacity>
            <DefaultText
              title={value}
              titleClassName="font-poppins-bold mx-6"
            />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setValue(value + 1);
                actionChangeGetProduct({data: item, quantity: value});
              }}>
              <DefaultText
                title="+"
                titleClassName="text-xl text-neutral-400"
              />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            className="bg-primary p-2 self-start rounded-md"
            onPress={() => {
              setShowNumber(true);
              setValue(1);
              actionChangeGetProduct({data: item, quantity: value});
            }}>
            <DefaultText title="Add to cart" />
          </TouchableOpacity>
        )}
      </View>
      <Gap width={10} />
      <TouchableOpacity activeOpacity={0.7} onPress={() => setShowImage(true)}>
        <Image
          source={{uri: item?.prodImgUrl ?? ''}}
          resizeMode="cover"
          className="w-[114] h-[114] rounded-[8px] bg-neutral-600"
        />
      </TouchableOpacity>

      <ModalImage
        show={showImage}
        hide={() => setShowImage(false)}
        image={item?.prodImgUrl ?? ''}
      />
    </View>
  );
}

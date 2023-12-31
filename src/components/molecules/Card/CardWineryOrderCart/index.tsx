import {Image, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {DefaultText, Gap} from '../../../atoms';
import {IcDelete} from '../../../../theme/Images';
import {currency} from '../../../../utils/function';
type Product = {
  chineseProductTitle: string;
  englishProductTitle: string;
  imageUrl: string;
  price: number;
  productId: string;
  quantity: number;
};

interface CardWineryOrderCart {
  onRemove: (val: number) => void;
  actionAkumulasi(plusmin: string, val: number, price: Product): void;
  data: any;
}

export default function CardWineryOrderCart({
  data,
  onRemove,
  actionAkumulasi,
}: CardWineryOrderCart) {
  const [value, setValue] = useState<number>(data?.quantity);
  const [ket, setKet] = useState<string>('');
  useEffect(() => {
    actionAkumulasi(ket, value, data); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, value, ket]);

  const changeValueMin = (values: number) => {
    setValue(values);
  };

  return (
    <View className="p-4 bg-[#2D2D2D] rounded-lg mb-4">
      <View className="flex-row items-center">
        <Image
          source={{uri: data?.imageUrl}}
          resizeMode="cover"
          className="w-[120] h-[109] rounded-[8px]"
        />
        <Gap width={10} />
        <View className="flex-1">
          <DefaultText
            title={data?.englishProductTitle}
            titleClassName="font-inter-medium"
          />
          <Gap height={5} />
          <DefaultText
            title={data?.chineseProductTitle}
            titleClassName="font-inter-medium text-xs"
          />
          <Gap height={10} />
          <DefaultText
            title={currency(data?.price)}
            titleClassName="font-inter-medium text-xs text-[#3ca6ec]"
          />
        </View>
      </View>
      <View className="w-full h-[1] bg-neutral-700 my-3" />
      <View className="flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => onRemove(value - 1)}
          activeOpacity={0.7}>
          <Image
            source={IcDelete}
            resizeMode="contain"
            className="w-[17] h-[18]"
          />
        </TouchableOpacity>
        <View className="bg-black flex-row items-center rounded-md px-3 py-[6]">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              value > 1 ? changeValueMin(value - 1) : onRemove(value - 1);
              setKet('min');
            }}>
            <DefaultText title="-" titleClassName="text-xl text-neutral-400" />
          </TouchableOpacity>
          <DefaultText title={value} titleClassName="font-inter-bold mx-6" />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              changeValueMin(value + 1);
              setKet('plus');
            }}>
            <DefaultText title="+" titleClassName="text-xl text-neutral-400" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

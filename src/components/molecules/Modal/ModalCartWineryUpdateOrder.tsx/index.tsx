import {Image, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {DefaultText, Gap} from '../../../atoms';
import {currency} from '../../../../utils/function';
import LinearGradient from 'react-native-linear-gradient';

type Product = {
  chineseProductTitle: string;
  englishProductTitle: string;
  imageUrl: string;
  price: number;
  productId: string;
  quantity: number;
};

interface CardWineryOrderCart {
  actionAkumulasi(plusmin: string, val: number, price: Product): void;
  data?: any;
  hide: () => void;
}

export default function ModalCartWineryUpdateOrder({
  data,
  actionAkumulasi,
  hide,
}: CardWineryOrderCart) {
  const [value, setValue] = useState<number>(data?.quantity);
  const [ket, setKet] = useState<string>('');
  useEffect(() => {
    actionAkumulasi(ket, value, data); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, value, ket]);

  useEffect(() => {
    setValue(data?.quantity); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const changeValueMin = (values: number) => {
    setValue(values);
  };

  return (
    <View className="bg-[#1E1E1E] rounded-lg">
      <View className="bg-[#262626] p-4 items-center">
        <Image
          source={{uri: data?.imageUrl}}
          resizeMode="cover"
          className="w-[120] h-[109] rounded-[8px]"
        />
        <Gap height={16} />
        <View className="flex-1">
          <DefaultText
            title={data?.englishProductTitle}
            titleClassName="font-inter-medium self-center"
          />
          <Gap height={4} />
          <DefaultText
            title={currency(data?.price * data?.quantity)}
            titleClassName="font-inter-medium text-xs text-[#EC7410]"
          />
        </View>
      </View>
      <View className="bg-[#262626] p-4 items-center justify-between">
        <View className="bg-[#313131] flex-row items-center rounded-md px-3 py-[6]">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              changeValueMin(value - 1);
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

      <TouchableOpacity
        className="mt-5"
        activeOpacity={0.8}
        onPress={() => {
          hide();
        }}>
        <LinearGradient
          className="py-4"
          colors={['#AA5AFA', '#C111D5']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <DefaultText
            title="Update"
            titleClassName="text-base font-inter-bold text-center"
          />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

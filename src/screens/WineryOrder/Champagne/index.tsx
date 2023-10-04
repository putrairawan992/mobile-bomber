import {ScrollView} from 'react-native';
import React from 'react';
import CardWineryOrder from '../../../components/molecules/Card/CardWineryOrder';
import {ProductBasedOnClubIdInterface} from '../../../interfaces/PlaceInterface';

interface ChampagneInterface {
  products: ProductBasedOnClubIdInterface[];
  handleQuantityChange(values: any): void;
}

export default function Champagne({
  products,
  handleQuantityChange,
}: ChampagneInterface) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {products?.map(product => {
        return product?.productData?.map(item => {
          return (
            <CardWineryOrder
              key={item?.productId}
              handleQuantityChange={handleQuantityChange}
              item={item}
            />
          );
        });
      })}
    </ScrollView>
  );
}

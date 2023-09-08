import {ScrollView} from 'react-native';
import React from 'react';
import CardWineryOrder from '../../../components/molecules/Card/CardWineryOrder';
import {ProductBasedOnClubIdInterface} from '../../../interfaces/PlaceInterface';

interface ChampagneInterface {
  products: ProductBasedOnClubIdInterface[];
  actionChangeGetProduct(index: number, newQuantity: number, values: any): void;
}

export default function Champagne({
  products,
  actionChangeGetProduct,
}: ChampagneInterface) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {products?.map(product => {
        return product?.productData?.map((item,index) => {
          return (
            <CardWineryOrder
              key={item?.productId}
              values={product?.productData}
              index={index}
              actionChangeGetProduct={actionChangeGetProduct}
              item={item}
            />
          );
        });
      })}
    </ScrollView>
  );
}

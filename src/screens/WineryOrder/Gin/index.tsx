import {ScrollView} from 'react-native';
import React from 'react';
import CardWineryOrder from '../../../components/molecules/Card/CardWineryOrder';
import {ProductBasedOnClubIdInterface} from '../../../interfaces/PlaceInterface';

interface GinInterface {
  products: ProductBasedOnClubIdInterface[];
}

export default function Gin({products}: GinInterface) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {products?.map(product => {
        return product.productData.map(item => {
          return <CardWineryOrder key={item.productId} item={item} />;
        });
      })}
    </ScrollView>
  );
}

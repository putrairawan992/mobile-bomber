import {ScrollView} from 'react-native';
import React from 'react';
import CardWineryOrder from '../../../components/molecules/Card/CardWineryOrder';
import {ProductBasedOnClubIdInterface} from '../../../interfaces/PlaceInterface';

interface ChampagneInterface {
  products: ProductBasedOnClubIdInterface[];
}

export default function Champagne({products}: ChampagneInterface) {
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

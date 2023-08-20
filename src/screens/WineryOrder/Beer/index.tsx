import {ScrollView} from 'react-native';
import React from 'react';
import CardWineryOrder from '../../../components/molecules/Card/CardWineryOrder';

interface Beer {
  onAddToCart: () => void;
}

export default function Beer({onAddToCart}: Beer) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <CardWineryOrder onAddToCart={onAddToCart} />
      <CardWineryOrder onAddToCart={onAddToCart} />
      <CardWineryOrder onAddToCart={onAddToCart} />
      <CardWineryOrder onAddToCart={onAddToCart} />
      <CardWineryOrder onAddToCart={onAddToCart} />
      <CardWineryOrder onAddToCart={onAddToCart} />
    </ScrollView>
  );
}

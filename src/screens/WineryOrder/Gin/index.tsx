import {ScrollView} from 'react-native';
import React from 'react';
import CardWineryOrder from '../../../components/molecules/Card/CardWineryOrder';

interface Gin {
  onAddToCart: () => void;
}

export default function Gin({onAddToCart}: Gin) {
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

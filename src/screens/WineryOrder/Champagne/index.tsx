import {ScrollView} from 'react-native';
import React from 'react';
import CardWineryOrder from '../../../components/molecules/Card/CardWineryOrder';

interface Champagne {
  onAddToCart: () => void;
}

export default function Champagne({onAddToCart}: Champagne) {
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

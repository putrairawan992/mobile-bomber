import {ScrollView} from 'react-native';
import React from 'react';
import CardWineryOrder from '../../../components/molecules/Card/CardWineryOrder';

interface Whiskey {
  onAddToCart: () => void;
}

export default function Whiskey({onAddToCart}: Whiskey) {
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

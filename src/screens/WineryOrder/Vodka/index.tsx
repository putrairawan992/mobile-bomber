import {ScrollView} from 'react-native';
import React from 'react';
import CardWineryOrder from '../../../components/molecules/Card/CardWineryOrder';

interface Vodka {
  onAddToCart: () => void;
}

export default function Vodka({onAddToCart}: Vodka) {
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

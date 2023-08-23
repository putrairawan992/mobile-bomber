import {ScrollView} from 'react-native';
import React from 'react';
import CardWineryOrder from '../../../components/molecules/Card/CardWineryOrder';

export default function Vodka() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <CardWineryOrder />
      <CardWineryOrder />
      <CardWineryOrder />
      <CardWineryOrder />
      <CardWineryOrder />
      <CardWineryOrder />
    </ScrollView>
  );
}

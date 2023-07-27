import React from 'react';
import {View, ViewStyle} from 'react-native';

interface GapProps {
  style?: ViewStyle;
  width?: number;
  height?: number;
}

export const Gap = ({style, width, height}: GapProps) => {
  return <View style={{width, height, ...style}} />;
};

import React from 'react';
import {View, ViewStyle} from 'react-native';

interface GapProps {
  classname?: string;
  style?: ViewStyle;
  width?: number;
  height?: number;
}

export const Gap = ({style, width, height, classname}: GapProps) => {
  return <View className={classname} style={{width, height, ...style}} />;
};

/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import React, {ReactNode} from 'react';
import {TouchableOpacity, ViewStyle} from 'react-native';

interface SectionPropsI {
  isRow?: boolean;
  isBetween?: boolean;
  isEvenly?: boolean;
  isAround?: boolean;
  children: ReactNode;
  backgroundColor?: string;
  borderRadius?: number;
  isCenter?: boolean;
  style?: ViewStyle;
  padding?: string;
  rounded?: number;
  onLayout?: any;
  isAlignStart?: boolean;
  onPress?: () => void;
}

export const TouchableSection = ({
  isRow,
  isBetween,
  isEvenly,
  isAround,
  children,
  backgroundColor,
  borderRadius,
  isCenter,
  style,
  padding,
  rounded,
  onLayout,
  isAlignStart,
  onPress,
  ...restOfProps
}: SectionPropsI) => {
  const paddingVertical = parseInt(padding?.split(' ')[0] as string);
  const paddingHorizontal = parseInt(padding?.split(' ')[1] as string);
  return (
    <TouchableOpacity
      onPress={onPress}
      onLayout={onLayout}
      style={[
        {
          flexDirection: isRow ? 'row' : 'column',
          justifyContent: isBetween ? 'space-between' : undefined,
          ...(isBetween && {justifyContent: 'space-between'}),
          ...(isEvenly && {justifyContent: 'space-evenly'}),
          ...(isAround && {justifyContent: 'space-around'}),
          ...(isRow && {alignItems: isAlignStart ? 'flex-start' : 'center'}),
          ...(padding && {
            paddingVertical: paddingVertical,
            paddingHorizontal: paddingHorizontal,
          }),
          ...(borderRadius && {borderRadius}),
          ...(backgroundColor && {backgroundColor}),
          ...(isCenter && {alignSelf: 'center', alignItems: 'center'}),
          ...(rounded && {borderRadius: rounded}),
        },
        style,
      ]}
      {...restOfProps}>
      {children as JSX.Element}
    </TouchableOpacity>
  );
};

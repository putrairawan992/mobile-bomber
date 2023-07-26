/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import React, {ReactNode} from 'react';
import {View} from 'react-native';

interface SectionPropsI {
  isRow?: boolean;
  isBetween?: boolean;
  children: ReactNode;
  backgroundColor?: string;
  borderRadius?: number;
  isCenter?: boolean;
  style?: any;
  padding?: string;
}

export const Section = ({
  isRow,
  isBetween,
  children,
  backgroundColor,
  borderRadius,
  isCenter,
  style,
  padding,
  ...restOfProps
}: SectionPropsI) => {
  const paddingVertical = parseInt(padding?.split(' ')[0] as string);
  const paddingHorizontal = parseInt(padding?.split(' ')[1] as string);
  return (
    <View
      style={[
        {
          flexDirection: isRow ? 'row' : 'column',
          justifyContent: isBetween ? 'space-between' : undefined,
          ...(isBetween && {justifyContent: 'space-between'}),
          ...(padding && {
            paddingVertical: paddingVertical,
            paddingHorizontal: paddingHorizontal,
          }),
          ...(borderRadius && {borderRadius}),
          ...(backgroundColor && {backgroundColor}),
          ...(isCenter && {alignSelf: 'center', alignItems: 'center'}),
        },
        style,
      ]}
      {...restOfProps}>
      {children}
    </View>
  );
};

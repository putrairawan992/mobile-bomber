import { ReactElement } from 'react';
import { TextProps as RNTextProps } from 'react-native';

export type FontFamilyType =
  | 'Poppins-ExtraBold'
  | 'Poppins-Bold'
  | 'Poppins-SemiBold'
  | 'Poppins-Regular'
  | 'Poppins-Light'
  | 'Poppins-Thin';

export type FontWeightType =
  | 'extra-bold'
  | 'bold'
  | 'semi-bold'
  | 'regular'
  | 'light'
  | 'thin';
export type TextAlignType = 'left' | 'center' | 'right' | 'justify';
export type TextDecorationType = 'underline' | 'none' | 'line-through';
export type TextTransformType =
  | 'none'
  | 'capitalize'
  | 'uppercase'
  | 'lowercase';
export type TextVariantType =
  | 'extra-large'
  | 'ultra-large'
  | 'x-large'
  | 'large'
  | 'base'
  | 'medium'
  | 'small'
  | 'extra-small';

export type FontStyleType = 'normal' | 'italic';

export interface TextStyleProps {
  fontWeight?: FontWeightType;
  color?: string;
  variant?: TextVariantType;
  textAlign?: TextAlignType;
  textTransform?: TextTransformType;
  textDecoration?: TextDecorationType;
  fontStyle?: FontStyleType;
}

export interface TextProps extends TextStyleProps, RNTextProps {
  label: string | ReactElement | null | undefined;
}

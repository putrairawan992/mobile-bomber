import React from 'react';
import {Text as RNText} from 'react-native';
import styled from 'styled-components';
import colors from '../../../styles/colors';

import {
  FontFamilyType,
  FontWeightType,
  TextProps,
  TextVariantType,
} from './Text.type';

type TextFontSizeType =
  | '36px'
  | '24px'
  | '16px'
  | '14px'
  | '12px'
  | '10px'
  | '18px'
  | '30px';
type TextLineHeightType =
  | '40px'
  | '28px'
  | '18px'
  | '16px'
  | '14px'
  | '22px'
  | '34px';

export const fontFamilyMapper: Record<FontWeightType, FontFamilyType> = {
  'extra-bold': 'Poppins-ExtraBold',
  bold: 'Poppins-Bold',
  'semi-bold': 'Poppins-SemiBold',
  regular: 'Poppins-Regular',
  light: 'Poppins-Light',
  thin: 'Poppins-Thin',
  'inter-regular': 'Inter',
};

const textLineHeightMapper: Record<TextVariantType, TextLineHeightType> = {
  'extra-large': '40px',
  'ultra-large': '34px',
  'x-large': '28px',
  large: '28px',
  base: '22px',
  medium: '18px',
  small: '16px',
  'extra-small': '14px',
};

const fontSizeMapper: Record<TextVariantType, TextFontSizeType> = {
  'extra-large': '36px',
  'ultra-large': '30px',
  'x-large': '24px',
  large: '18px',
  base: '16px',
  medium: '14px',
  small: '12px',
  'extra-small': '10px',
};

const StyledText = styled(RNText)<TextProps>`
  color: ${props => props.color || colors.white};
  font-family: ${props => fontFamilyMapper[props.fontWeight || 'regular']};
  font-size: ${props => fontSizeMapper[props.variant || 'medium']};
  font-style: ${({fontStyle = 'normal'}) => fontStyle};
  line-height: ${props => textLineHeightMapper[props.variant || 'medium']};
  text-align: ${({textAlign}) => textAlign || 'left'};
  text-decoration: ${({textDecoration}) => textDecoration || 'none'};
  text-transform: ${({textTransform}) => textTransform || 'none'};
`;

function Text(props: TextProps) {
  return (
    <StyledText allowFontScaling={false} {...props}>
      {props.label}
    </StyledText>
  );
}

export default Text;
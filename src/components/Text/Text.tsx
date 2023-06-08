/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { Text as RNText } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import colors from '../../styles/colors';

import {
  FontFamilyType,
  FontWeightType,
  TextProps,
  TextVariantType,
} from './Text.type';

type TextFontSizeType = '36px' | '24px' | '16px' | '14px' | '12px' | '10px';
type TextLineHeightType = '40px' | '28px' | '18px' | '16px' | '14px';

export const fontFamilyMapper: Record<FontWeightType, FontFamilyType> = {
  'extra-bold': 'Poppins-ExtraBold',
  bold: 'Poppins-Bold',
  'semi-bold': 'Poppins-SemiBold',
  regular: 'Poppins-Regular',
  light: 'Poppins-Light',
  thin: 'Poppins-Thin',
};

const textLineHeightMapper: Record<TextVariantType, TextLineHeightType> = {
  'extra-large': '40px',
  'x-large': '28px',
  large: '28px',
  medium: '18px',
  small: '16px',
  'extra-small': '14px',
};

const fontSizeMapper: Record<TextVariantType, TextFontSizeType> = {
  'extra-large': '36px',
  'x-large': '24px',
  large: '16px',
  medium: '14px',
  small: '12px',
  'extra-small': '10px',
};

const StyledText = styled(RNText)<TextProps>`
  color: ${props => props.color || colors.bermudaGrey};
  font-family: ${props => fontFamilyMapper[props.fontWeight || 'regular']};
  font-size: ${props => fontSizeMapper[props.variant || 'medium']};
  font-style: ${({ fontStyle = 'normal' }) => fontStyle};
  line-height: ${props => textLineHeightMapper[props.variant || 'medium']};
  text-align: ${({ textAlign }) => textAlign || 'left'};
  text-decoration: ${({ textDecoration }) => textDecoration || 'none'};
  text-transform: ${({ textTransform }) => textTransform || 'none'};
`;

function Text(props: TextProps) {
  // FIXME: fix eslint for destructuring-assignmen
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <StyledText allowFontScaling={false} {...props}>
      {/* eslint-disable-next-line react/destructuring-assignment */}
      {props.label}
    </StyledText>
  );
}

export default Text;

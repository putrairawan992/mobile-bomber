/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import {View, ViewStyle} from 'react-native';
import useTheme from '../../../theme/useTheme';
import Spacing from './Spacing';

type Props = {
  xxs?: boolean;
  xs?: boolean;
  sx?: boolean;
  s?: boolean;
  sm?: boolean;
  m?: boolean;
  l?: boolean;
  lx?: boolean;
  lxx?: boolean;
  llxx?: boolean;
  xl?: boolean;
  xxl?: boolean;
  height?: number;
  style?: ViewStyle;
  horizontal?: boolean;
  static?: boolean;
  width?: number;
  className?: string;
};

function Spacer(props: Props) {
  const {style = {}, horizontal = false, width, className} = props;
  const theme = useTheme();
  let space = Spacing.xxl;
  if (props.height) {
    space = props.height;
  } else if (props.xxs) {
    space = Spacing.xxs;
  } else if (props.xs) {
    space = Spacing.xs;
  } else if (props.sx) {
    space = Spacing.sx;
  } else if (props.s) {
    space = Spacing.s;
  } else if (props.sm) {
    space = Spacing.sm;
  } else if (props.m) {
    space = Spacing.m;
  } else if (props.l) {
    space = Spacing.l;
  } else if (props.lx) {
    space = Spacing.lx;
  } else if (props.lxx) {
    space = Spacing.lxx;
  } else if (props.llxx) {
    space = Spacing.llxx;
  } else if (props.xl) {
    space = Spacing.xl;
  } else if (props.xxl) {
    space = Spacing.xxl;
  }

  return (
    <View
      className={className}
      style={[
        style,
        {
          backgroundColor: props.static
            ? theme?.colors.PRIMARY
            : theme?.colors.BACKGROUND,
          height: horizontal ? '100%' : space,
          width: width ? width : horizontal ? space : '100%',
        },
      ]}
    />
  );
}

export default Spacer;

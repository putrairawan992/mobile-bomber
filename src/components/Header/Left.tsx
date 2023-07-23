
import React, { CSSProperties } from 'react';
import { View } from 'react-native';
import styles from './Styles';

function HeaderLeft({
  style,
  children,
} : {
  style?: CSSProperties,
  children?: React.ReactNode
}) {
  return <View style={[styles.left, style]}>{children}</View>;
}

export default HeaderLeft;

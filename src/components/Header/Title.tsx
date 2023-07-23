/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { View, Text } from 'react-native';
import styles from './Styles';

function HeaderTitle({
  textstyle,
  style,
  children,
} : {
  textstyle?: any,
  style: any,
  children: React.ReactNode
}) {
  return (
    <View style={[styles.title, style]}>
      <Text numberOfLines={1} style={[styles.titleTxt, textstyle]}>
        {children}
      </Text>
    </View>
  );
}

export default HeaderTitle;

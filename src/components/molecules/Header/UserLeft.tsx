/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {View} from 'react-native';
import styles from './Styles';

function UserLeft({style, children}: {style: any; children: React.ReactNode}) {
  return <View style={[styles.left, style]}>{children}</View>;
}

export default UserLeft;

import React from 'react';
import {View} from 'react-native';
import styles from './Styles';

function TitleLogo({children}: {children: React.ReactNode}) {
  return <View style={[styles.title]}>{children}</View>;
}

export default TitleLogo;

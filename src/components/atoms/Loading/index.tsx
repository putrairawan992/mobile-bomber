/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import useTheme from '../../../theme/useTheme';
import {View, ActivityIndicator} from 'react-native';

export const Loading = () => {
  const theme = useTheme();
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.60)',
        zIndex: 999,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size={'large'} color={theme?.colors.PRIMARY} />
    </View>
  );
};

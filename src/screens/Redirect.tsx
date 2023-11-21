/* eslint-disable react-native/no-inline-styles */
import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import useTheme from '../theme/useTheme';
import {MainStackParams} from '../navigation/MainScreenStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<MainStackParams, 'Redirect', 'MyStack'>;
export const Redirect = ({route, navigation}: Props) => {
  const theme = useTheme();
  useFocusEffect(
    React.useCallback(() => {
      if (route.params.screen === 'booking') {
        navigation.navigate('Event', {
          isRefetch: false,
        });
      }
    }, [navigation, route.params]),
  );

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme?.colors.BACKGROUND1,
      }}
    />
  );
};

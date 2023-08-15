/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import useTheme from '../../../../theme/useTheme';
import {Text} from '../../../atoms';

interface PillsGradientProps {
  colors: string[];
  title: string;
}

export const PillsGradient = ({colors, title}: PillsGradientProps) => {
  const theme = useTheme();
  return (
    <LinearGradient
      colors={colors}
      start={{x: 0.0, y: 1.0}}
      end={{x: 1.0, y: 1.0}}
      style={{
        paddingHorizontal: 1,
        paddingVertical: 1,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          backgroundColor: theme?.colors.BACKGROUND1,
          paddingHorizontal: 4,
          paddingVertical: 2,
          borderRadius: 3,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text variant="small" fontWeight="medium" label={title} />
      </View>
    </LinearGradient>
  );
};

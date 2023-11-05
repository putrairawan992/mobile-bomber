/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import useTheme from '../../../../theme/useTheme';
import {Gap, Text} from '../../../atoms';

interface PillsGradientProps {
  colors: string[];
  title: string;
  icon?: JSX.Element;
  onSelectOnMap:()=>void;
}

export const PillsGradient = ({colors, title, icon,onSelectOnMap}: PillsGradientProps) => {
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
          paddingHorizontal: 12,
          paddingVertical: 2,
          borderRadius: 3,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        {!!icon && (
          <>
            {icon}
            <Gap width={6} />
          </>
        )}
        <Text variant="small" fontWeight="medium" label={title} onPress={(e)=>onSelectOnMap()}/>
      </View>
    </LinearGradient>
  );
};

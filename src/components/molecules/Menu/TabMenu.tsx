/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity} from 'react-native';
import useTheme from '../../../theme/useTheme';
import {Gap, Text} from '../../atoms';

interface TabMenuProps {
  onPress: (index: number) => void;
  isSelected: boolean;
  width: number | string;
  item: string;
  index: number;
  isCenter?: boolean;
  isInActiveBorder?: boolean;
}

export const TabMenu = ({
  onPress,
  isSelected,
  item,
  index,
  width,
  isCenter = true,
  isInActiveBorder = true,
}: TabMenuProps) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      onPress={() => onPress(index)}
      activeOpacity={0.7}
      key={item}
      style={{
        width,
        paddingHorizontal: 12,
        borderBottomWidth: 2,
        borderBottomColor: isSelected
          ? theme?.colors.PRIMARY
          : isInActiveBorder
          ? theme?.colors.TEXT_PRIMARY
          : 'transparent',
      }}>
      <Text
        label={item}
        color={isSelected ? theme?.colors.PRIMARY : theme?.colors.TEXT_PRIMARY}
        textAlign={isCenter ? 'center' : 'left'}
      />
      <Gap height={12} />
    </TouchableOpacity>
  );
};

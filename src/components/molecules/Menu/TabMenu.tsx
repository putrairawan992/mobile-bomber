/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity} from 'react-native';
import useTheme from '../../../theme/useTheme';
import {WIDTH} from '../../../utils/config';
import {Gap, Text} from '../../atoms';

interface TabMenuProps {
  onPress: (index: number) => void;
  isSelected: boolean;
  width: number;
  item: string;
  index: number;
}

export const TabMenu = ({
  onPress,
  isSelected,
  item,
  index,
  width,
}: TabMenuProps) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      onPress={() => onPress(index)}
      activeOpacity={0.7}
      key={item}
      style={{
        flex: 1,
        width: WIDTH / width,
        paddingHorizontal: 12,
        borderBottomWidth: 2,
        borderBottomColor: isSelected
          ? theme?.colors.PRIMARY
          : theme?.colors.TEXT_PRIMARY,
      }}>
      <Text
        label={item}
        color={isSelected ? theme?.colors.PRIMARY : theme?.colors.TEXT_PRIMARY}
        textAlign="center"
      />
      <Gap height={12} />
    </TouchableOpacity>
  );
};

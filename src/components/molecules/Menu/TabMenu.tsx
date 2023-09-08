/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity} from 'react-native';
import useTheme from '../../../theme/useTheme';
import {Gap, Section, Text} from '../../atoms';
import {Colors} from '../../../theme';

interface TabMenuProps {
  onPress: (index: number) => void;
  isSelected: boolean;
  width: number | string;
  item: string;
  index: number;
  isCenter?: boolean;
  isInActiveBorder?: boolean;
  count?: number;
}

export const TabMenu = ({
  onPress,
  isSelected,
  item,
  index,
  width,
  isCenter = true,
  isInActiveBorder = true,
  count,
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
      {!!count && count > 0 && (
        <Section
          isCenter
          style={{
            position: 'absolute',
            width: 16,
            height: 16,
            zIndex: 999,
            right: 0,
            top: 0,
          }}
          rounded={20}
          backgroundColor={Colors['danger-400']}>
          <Text variant="small" label={count.toString()} />
        </Section>
      )}
      <Text
        label={item}
        color={isSelected ? theme?.colors.PRIMARY : theme?.colors.TEXT_PRIMARY}
        textAlign={isCenter ? 'center' : 'left'}
      />
      <Gap height={12} />
    </TouchableOpacity>
  );
};

/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import useTheme from '../../../theme/useTheme';
import { Gap, Section, Text } from '../../atoms';
import { Colors } from '../../../theme';

interface TabMenuProps {
  onPress: (index: number) => void;
  isSelected: boolean;
  width: number | string;
  item: string;
  index: number;
  count?: number;
}

export const TabMenuSecond = ({
  onPress,
  isSelected,
  item,
  index,
  width,
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
        padding: 15,
        backgroundColor: isSelected
          ? theme?.colors.PRIMARY
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
            right: 2,
            top: 0,
          }}
          rounded={20}
          backgroundColor={Colors['danger-400']}>
          <Text variant="small" label={count.toString()} />
        </Section>
      )}
      <Text
        label={item}
        fontWeight='bold'
        color={theme?.colors.TEXT_PRIMARY}
        textAlign={'center'}
      />
      <Gap height={12} />
    </TouchableOpacity>
  );
};

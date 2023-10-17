/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity} from 'react-native';
import useTheme from '../../../theme/useTheme';
import {Section, Text} from '../../atoms';
import {Colors} from '../../../theme';
import LinearGradient from 'react-native-linear-gradient';
import {gradientMapping} from '../../../utils/config';

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
    <>
      {isSelected ? (
        <TouchableOpacity onPress={() => onPress(index)}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={
              gradientMapping['textPrimary' as keyof typeof gradientMapping]
                .color
            }
            style={{
              width,
              paddingVertical: 16,
              alignItems: 'center',
            }}>
            <Text
              label={item}
              color={theme?.colors.TEXT_PRIMARY}
              textAlign={'center'}
            />
          </LinearGradient>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => onPress(index)}
          activeOpacity={0.7}
          key={item}
          style={{
            width,
            paddingVertical: 16,
            alignItems: 'center',
            backgroundColor: isSelected ? theme?.colors.PRIMARY : 'transparent',
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
            color={theme?.colors.TEXT_PRIMARY}
            textAlign={'center'}
          />
        </TouchableOpacity>
      )}
    </>
  );
};

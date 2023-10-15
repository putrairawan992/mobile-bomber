/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';

import {StyleSheet, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import useTheme from '../../../../theme/useTheme';

import {Gap, Section, Text} from '../..';
import {ArrowDown2, ArrowUp2} from 'iconsax-react-native';
import {Colors} from '../../../../theme';
import {LabelValueInterface} from '../../../../interfaces/Interface';

// type Props = NativeStackScreenProps<MainStackParams, 'Saved', 'MyStack'>;
interface Props {
  onChange: (value: string) => void;
  value: string;
  data: LabelValueInterface[];
  label?: string;
  width?: number;
}

export function DropdownPicker({onChange, value, data, label, width}: Props) {
  const theme = useTheme();

  return (
    <Section>
      {!!label && (
        <>
          {!!label && <Text label={label} color={Colors['gray-100']} />}
          <Gap height={5} />
        </>
      )}
      <Dropdown
        style={[
          s.dropdown,
          {
            width: width ?? 'auto',
            backgroundColor: theme?.colors.BACKGROUND2,
          },
        ]}
        selectedTextStyle={{
          fontSize: 14,
          fontFamily: 'Inter-Regular',
          color: theme?.colors.TEXT_PRIMARY,
        }}
        inputSearchStyle={s.inputSearchStyle}
        iconStyle={s.iconStyle}
        itemTextStyle={{
          fontSize: 14,
          color: Colors['white-100'],
          fontFamily: 'Inter-Regular',
        }}
        containerStyle={{
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          borderWidth: 0,
        }}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder=""
        value={value}
        renderItem={(item, selected) => (
          <Section
            isRow
            isBetween
            padding="10px 16px"
            backgroundColor={theme?.colors.BACKGROUND2}>
            <Text fontWeight="regular" label={item.label} />
            {selected ? (
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: theme?.colors.PRIMARY,
                }}>
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 6,
                    backgroundColor: theme?.colors.PRIMARY,
                  }}
                />
              </View>
            ) : (
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: theme?.colors.PRIMARY,
                }}
              />
            )}
          </Section>
        )}
        renderRightIcon={visible =>
          visible ? (
            <ArrowUp2 color={theme?.colors.PRIMARY} size={20} />
          ) : (
            <ArrowDown2 color={theme?.colors.PRIMARY} size={20} />
          )
        }
        onChange={item => {
          onChange(item.value);
        }}
      />
    </Section>
  );
}

const s = StyleSheet.create({
  dropdown: {
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingVertical: 9,
  },
  icon: {
    marginRight: 5,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#111827',
  },
});

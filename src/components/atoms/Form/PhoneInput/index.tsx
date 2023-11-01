/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';

import {StyleSheet, TextInput, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import useTheme from '../../../../theme/useTheme';

import {Gap, Section, Spacer, Text} from '../..';
import {ArrowDown2, ArrowUp2} from 'iconsax-react-native';
import {Colors} from '../../../../theme';
import {LabelValueInterface} from '../../../../interfaces/Interface';
import {WIDTH} from '../../../../utils/config';
import {Search} from '../../../../assets/icons/Search';

// type Props = NativeStackScreenProps<MainStackParams, 'Saved', 'MyStack'>;
interface Props {
  onChange: (value: string) => void;
  value: string;
  data: LabelValueInterface[];
  label?: string;
  textValue: string;
  onChangeText: (text: string) => void;
  errorText: string;
}

export function PhoneInput({
  onChange,
  value,
  data,
  label,
  textValue,
  onChangeText,
  errorText,
}: Props) {
  const theme = useTheme();
  const [isFocused, setIsFocused] = React.useState<boolean>(false);
  let borderColor = isFocused ? theme?.colors.PRIMARY : theme?.colors.BORDER;
  if (errorText) {
    borderColor = Colors['danger-400'];
  }
  const inputCustom = (onSearch: any) => (
    <Section
      isRow
      style={{
        borderTopColor: '#323232',
        borderTopWidth: 1,
        borderBottomColor: '#323232',
        borderBottomWidth: 1,
      }}
      padding="1px 5px"
      backgroundColor={theme?.colors.BACKGROUND2}>
      <Search size={20} color={theme?.colors.TEXT_PRIMARY} />
      <TextInput
        placeholderTextColor={theme?.colors.TEXT_PLACEHOLDER}
        placeholder="search country"
        style={{
          backgroundColor: theme?.colors.BACKGROUND2,
          color: theme?.colors.TEXT_PRIMARY,
        }}
        onChangeText={text => {
          onSearch(text);
        }}
      />
    </Section>
  );
  return (
    <Section>
      {!!label && (
        <>
          {!!label && <Text label={label} color={Colors['gray-100']} />}
          <Gap height={5} />
        </>
      )}
      <Section
        style={{
          paddingVertical: 2,
          backgroundColor: theme?.colors.BACKGROUND2,
          borderRadius: 8,
          borderColor,
          borderWidth: 1,
        }}
        isRow>
        <Dropdown
          style={[
            s.dropdown,
            {
              backgroundColor: theme?.colors.BACKGROUND2,
            },
          ]}
          selectedTextStyle={{
            fontSize: 14,
            marginRight: 4,
            textAlign: 'right',
            fontFamily: 'Inter-Regular',
            color: theme?.colors.TEXT_PRIMARY,
            bottom: 2,
          }}
          inputSearchStyle={s.inputSearchStyle}
          renderInputSearch={onSearch => inputCustom(onSearch)}
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
            width: WIDTH * 0.8,
          }}
          data={data}
          maxHeight={300}
          search
          labelField="label"
          valueField="value"
          placeholder=""
          value={value}
          renderItem={(item, selected) => (
            <View
              style={{
                borderBottomColor: '#323232',
                borderBottomWidth: 1,
              }}>
              <Section
                isRow
                isBetween
                style={{
                  width: WIDTH * 0.8,
                  flex: 1,
                }}
                padding="10px 16px"
                backgroundColor={theme?.colors.BACKGROUND2}>
                <Section isRow>
                  <Text fontWeight="regular" label={item.image} />
                  <Text fontWeight="regular" label={item.value} />
                  <Text
                    fontWeight="regular"
                    label={item.label}
                    style={{width: 50}}
                    textAlign="right"
                  />
                </Section>

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
            </View>
          )}
          renderRightIcon={visible =>
            visible ? (
              <ArrowUp2 color={Colors['white-100']} size={16} />
            ) : (
              <ArrowDown2 color={Colors['white-100']} size={16} />
            )
          }
          onChange={item => {
            onChange(item.value);
          }}
        />
        <TextInput
          onChangeText={text => onChangeText(text)}
          placeholder={'your phone number'}
          placeholderTextColor={theme?.colors.TEXT_PLACEHOLDER}
          style={{
            paddingLeft: 8,
            flex: 1,
            fontSize: 14,
            fontFamily: 'Inter-Regular',
            lineHeight: 16,
            color: Colors['white-100'],
          }}
          value={textValue}
          onBlur={() => {
            setIsFocused(false);
          }}
          onFocus={() => {
            setIsFocused(true);
          }}
          keyboardType={'number-pad'}
          maxLength={15}
        />
      </Section>
      {errorText && (
        <View>
          <Spacer xs />
          <Text
            variant="small"
            color={Colors['danger-400']}
            label={errorText}
          />
        </View>
      )}
    </Section>
  );
}

const s = StyleSheet.create({
  dropdown: {
    borderRadius: 4,
    width: 70,
  },
  icon: {
    marginRight: 5,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    width: WIDTH * 0.8,
  },
});

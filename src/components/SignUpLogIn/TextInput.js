/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from 'react';
import {useState} from 'react';
import {TextInput, Image, View, TouchableOpacity} from 'react-native';
import dayjs from 'dayjs';
import {Images, Colors} from '../../theme';
import styles from './Styles/index';

function TextInputScreen({
  defaultInput,
  passwordInput,
  datePickerInput,
  inputStyle,
  placeholder,
  type,
  passwordStyle,
  onPress,
  value,
}) {
  const [showPassword, setShowPassword] = useState(true);
  // console.log('balueeee----',value?.toString())
  return (
    <>
      {defaultInput && (
        <TextInput
          style={[styles.allInputStyle, inputStyle]}
          placeholder={placeholder}
          keyboardType={type}
          placeholderTextColor={Colors.darkGray}
        />
      )}
      {passwordInput && (
        <View style={passwordStyle}>
          <TextInput
            style={[styles.allInputStyle, inputStyle]}
            placeholder={placeholder}
            keyboardType={type}
            secureTextEntry={showPassword}
            placeholderTextColor={Colors.darkGray}
          />
          <TouchableOpacity
            style={styles.passwordEyeImgBtn}
            onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? Images.HideEye : Images.OpenEye}
              style={styles.passwordEyeImg}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      )}
      {datePickerInput && (
        <TextInput
          style={[styles.allInputStyle, inputStyle]}
          placeholder={placeholder}
          keyboardType={type}
          placeholderTextColor={Colors.darkGray}
          value={
            value
              ? dayjs().format('DD MMMM YYYY')
              : dayjs().format('DD MMMM YYYY')
          }
          onFocus={() => {
            if (onPress) {
              onPress();
            }
          }}
        />
      )}
    </>
  );
}

export default TextInputScreen;

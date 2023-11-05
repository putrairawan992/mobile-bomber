/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from 'react';
import {useState} from 'react';
import {TextInput, Image, View, TouchableOpacity} from 'react-native';
import {Images, Colors} from '../../theme';
import styles from './Styles/index';

function ResetPasswordScreen({
  passwordInput,
  inputStyle,
  placeholder,
  type,
  passwordStyle,
}) {
  const [showPassword, setShowPassword] = useState(true);
  return (
    <>
      {passwordInput && (
        <View style={passwordStyle}>
          <TextInput
            style={[styles.resetInputStyle, inputStyle]}
            placeholder={placeholder}
            keyboardType={type}
            secureTextEntry={showPassword}
            placeholderTextColor={Colors.lightBlack}
          />
          <TouchableOpacity
            style={styles.resetPasswordEyeImgBtn}
            onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? Images.HideEye : Images.OpenEye}
              style={styles.passwordEyeImg}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

export default ResetPasswordScreen;

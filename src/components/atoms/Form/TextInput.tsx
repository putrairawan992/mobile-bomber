/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';

import {
  TextInput as RNTextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  ViewStyle,
  Platform,
} from 'react-native';

import Spacer from '../Spacer/Spacer';
import {Eye, EyeSlash} from 'iconsax-react-native';
import useTheme from '../../../theme/useTheme';
import useThemedStyles from '../../../theme/useThemedStyles';
import {Text} from '..';
import {SHADOWS} from '../../../utils/config';
import {Search} from '../../../assets/icons/Search';
import {Colors} from '../../../theme';

type Props = React.ComponentProps<typeof RNTextInput> & {
  label?: string;
  errorText?: string | null;
  textArea?: boolean;
  isNumeric?: boolean;
  width?: number;
  rightIcon?: JSX.Element;
  type?: 'password' | 'search';
  style?: React.CSSProperties;
  textInputBackgroundColor?: string;
  containerStyle?: ViewStyle;
  textInputHeight?: number;
};

export const TextInput = React.forwardRef((props: Props, ref) => {
  const {
    label,
    errorText,
    value,
    style,
    type,
    onBlur,
    onFocus,
    textArea,
    placeholder,
    isNumeric,
    rightIcon,
    width,
    textInputBackgroundColor,
    containerStyle,
    textInputHeight,
    ...restOfProps
  } = props;
  const [isFocused, setIsFocused] = React.useState<boolean>(false);
  const theme = useTheme();
  const styling = useThemedStyles(styles);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  let color = isFocused ? theme?.colors.TEXT_PRIMARY : theme?.colors.TEXT_LABEL;
  let borderColor = isFocused ? theme?.colors.PRIMARY : theme?.colors.BORDER;

  const borderWidth = isFocused ? 1 : 1;
  if (errorText) {
    color = Colors['danger-400'];
  }

  if (errorText) {
    borderColor = Colors['danger-400'];
  }

  const internalInputRef = React.useRef<any>();
  React.useImperativeHandle(ref, () => ({
    blur: () => {
      internalInputRef.current.blur();
    },
  }));

  return (
    <View style={[styling.container, style]}>
      {!!label && <Text label={label} color={Colors['gray-100']} />}
      <Spacer s />
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 12,
          ...(Platform.OS === 'ios' && {paddingVertical: 12}),
          borderRadius: 8,
          borderWidth,
          borderColor,
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor:
            textInputBackgroundColor ?? theme?.colors.BACKGROUND2,
          ...(width && {width}),
          ...containerStyle,
        }}>
        <RNTextInput
          style={[
            styling.input,
            {
              color,
              height: textInputHeight
                ? textInputHeight
                : textArea
                ? 160
                : 'auto',
              textAlignVertical: textArea ? 'top' : 'center',
              width: rightIcon || type === 'password' ? '90%' : '100%',
              backgroundColor:
                textInputBackgroundColor ?? theme?.colors.BACKGROUND2,
            },
          ]}
          {...restOfProps}
          value={value}
          onBlur={event => {
            setIsFocused(false);
            onBlur?.(event);
          }}
          onFocus={event => {
            setIsFocused(true);
            onFocus?.(event);
          }}
          placeholder={placeholder}
          placeholderTextColor={theme?.colors.TEXT_PLACEHOLDER}
          multiline={!!textArea}
          numberOfLines={textArea ? 5 : 1}
          keyboardType={isNumeric ? 'number-pad' : 'default'}
          ref={internalInputRef}
          secureTextEntry={type === 'password' && !showPassword ? true : false}
        />
        {rightIcon}
        {type === 'password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <Eye size="20" color="#777682" />
            ) : (
              <EyeSlash size="20" color="#777682" />
            )}
          </TouchableOpacity>
        )}
        {type === 'search' && (
          <TouchableOpacity style={{right: 12}}>
            <Search size={20} color={theme?.colors.PRIMARY} />
          </TouchableOpacity>
        )}
      </View>
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
    </View>
  );
});

const styles = () =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
    },
    input: {
      borderRadius: 8,
      fontSize: 14,
      fontFamily: 'Inter',
      lineHeight: 16,
      ...SHADOWS.default,
    },
  });

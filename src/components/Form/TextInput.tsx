import * as React from 'react';

import {
  TextInput as RNTextInput,
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
} from 'react-native';

import Spacer from '../Spacer/Spacer';
import {Text} from '../Text';
import colors from '../../styles/colors';
import useThemedStyles from '../../theme/useThemedStyles';
import {SHADOWS} from '../../utils/config';
import useTheme from '../../theme/useTheme';
import {ThemeInterface} from '../../theme/ThemeProvider';
import {Eye, EyeSlash} from 'iconsax-react-native';

type Props = React.ComponentProps<typeof RNTextInput> & {
  label?: string;
  errorText?: string | null;
  textArea?: boolean;
  isNumeric?: boolean;
  width?: number;
  rightIcon?: JSX.Element;
  type?: string;
  style?: React.CSSProperties;
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
    ...restOfProps
  } = props;
  const [isFocused, setIsFocused] = React.useState<boolean>(false);
  const theme = useTheme();
  const styling = useThemedStyles(styles);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  let color = isFocused ? theme?.colors.TEXT_PRIMARY : theme?.colors.TEXT_LABEL;
  let borderColor = isFocused ? theme?.colors.PRIMARY : 'transparent';

  const borderWidth = isFocused ? 1 : 1;
  if (errorText) {
    color = theme?.colors.ERROR;
  }

  if (errorText) {
    borderColor = theme?.colors.ERROR;
  }

  const internalInputRef = React.useRef<any>();
  React.useImperativeHandle(ref, () => ({
    blur: () => {
      internalInputRef.current.blur();
    },
  }));

  return (
    <View style={[styling.container, style]}>
      {!!label && (
        <Text
          label={label}
          variant="medium"
          fontWeight="regular"
          color={theme?.colors.TEXT_SECONDARY}
        />
      )}
      <Spacer s />
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 22,
          borderRadius: 8,
          borderWidth,
          borderColor,
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: theme?.colors.BACKGROUND2,
          ...(width && {width}),
        }}>
        <RNTextInput
          style={[
            styling.input,
            {
              color,
              height: textArea ? 160 : 50,
              textAlignVertical: textArea ? 'top' : 'center',
              width: rightIcon || type === 'password' ? '90%' : '100%',
              backgroundColor: theme?.colors.BACKGROUND2,
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
          placeholderTextColor={'#777682'}
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
      </View>
      {errorText && (
        <View>
          <Spacer xs />
          <Text variant="small" color={colors.errorRed} label={errorText} />
        </View>
      )}
    </View>
  );
});

const styles = (theme: ThemeInterface) =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
    },
    input: {
      borderRadius: 8,
      fontSize: 14,
      fontFamily:
        Platform.OS === 'android'
          ? 'PlusJakartaDisplay-Regular'
          : 'PlusJakartaText-Regular',
      lineHeight: 16,
      backgroundColor: theme.colors.BACKGROUND2,
      ...SHADOWS.default,
    },
  });

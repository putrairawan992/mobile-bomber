/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/require-default-props */
/* eslint-disable import/prefer-default-export */
import * as React from 'react';

import { TextInput as RNTextInput, StyleSheet, View } from 'react-native';
import { SHADOWS, WIDTH } from '../../../utils/config';

import Spacer from '../Spacer/Spacer';
import { Text } from '../Text';
import { ThemeInterface } from '../../../theme/ThemeProvider';
import colors from '../../../styles/colors';
import useTheme from '../../../theme/useTheme';
import useThemedStyles from '../../../theme/useThemedStyles';

type Props = React.ComponentProps<typeof RNTextInput> & {
  label: string;
  errorText?: string | null;
  textArea?: boolean;
  isNumeric?: boolean;
  width?: number;
  rightIcon?: JSX.Element;
};

export const TextInput = React.forwardRef((props: Props, ref) => {
  const {
    label,
    errorText,
    value,
    style,
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

  let color = isFocused ? theme?.colors.TEXT_PRIMARY : theme?.colors.TEXT_LABEL;
  let borderColor = isFocused ? '#232323' : '#E8E8E8';

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
    <View style={styling.container}>
      <Text label={label} variant="medium" fontWeight="regular" />
      <Spacer s />
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 13,
          borderRadius: 8,
          borderWidth,
          borderColor,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <RNTextInput
          style={[
            styling.input,
            {
              color,
              height: textArea ? 160 : 50,
              textAlignVertical: textArea ? 'top' : 'center',
              width: width ?? WIDTH - 80,
            },
          ]}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...restOfProps}
          value={value}
          onBlur={(event) => {
            setIsFocused(false);
            onBlur?.(event);
          }}
          onFocus={(event) => {
            setIsFocused(true);
            onFocus?.(event);
          }}
          placeholder={placeholder}
          placeholderTextColor={theme?.colors.B6}
          multiline={!!textArea}
          numberOfLines={textArea ? 5 : 1}
          keyboardType={isNumeric ? 'number-pad' : 'default'}
          ref={internalInputRef}
        />
        {rightIcon}
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

const styles = (theme: ThemeInterface) => StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  input: {
    borderRadius: 8,
    fontSize: 14,
    fontFamily: 'SourceSansPro-Regular',
    lineHeight: 16,
    backgroundColor: theme.colors.BACKGROUND1,
    ...SHADOWS.default,
  },
});

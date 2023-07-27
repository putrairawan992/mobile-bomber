/* eslint-disable react-native/no-inline-styles */

import * as React from 'react';

import {ActivityIndicator, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Text} from '..';
import {ThemeInterface} from '../../../theme/ThemeProvider';
import useTheme from '../../../theme/useTheme';
import useThemedStyles from '../../../theme/useThemedStyles';
import {ScaleAnimation} from '../animations/ScaleAnimation';

interface ButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  type:
    | 'primary'
    | 'secondary'
    | 'contained'
    | 'outlined'
    | 'danger'
    | 'disabled'
    | 'secondaryOutlined'
    | 'textButton';
  style?: React.CSSProperties;
  width?: number;
  icon?: JSX.Element;
  noRound?: boolean;
}
function Button({
  title,
  onPress,
  isLoading,
  type,
  style,
  icon,
  width,
  noRound,
  ...restOfProps
}: ButtonProps) {
  const theme = useTheme();
  const s = useThemedStyles(styles);

  const mapStyling: any = {
    primary: {
      backgroundColor: theme?.colors.PRIMARY,
      borderColor: 'transparent',
    },
    secondary: {
      backgroundColor: theme?.colors.SECONDARY,
      borderColor: 'transparent',
    },
    disable: {
      backgroundColor: theme?.colors.CARD_BACKGROUND1,
      borderColor: 'transparent',
    },
    outlined: {
      backgroundColor: theme?.colors.BACKGROUND1,
      borderColor: theme?.colors.PRIMARY,
    },
    danger: {
      backgroundColor: theme?.colors.DANGER,
      borderColor: 'transparent',
    },
    disabled: {
      backgroundColor: '#d7d7d7',
      borderColor: 'transparent',
    },
    secondaryOutlined: {
      backgroundColor: theme?.colors.BACKGROUND1,
      borderColor: theme?.colors.SECONDARY,
    },
    textButton: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
  };

  return (
    <ScaleAnimation onPress={onPress} disabled={false} scaleTo={0.97}>
      <LinearGradient
        colors={['#A060FA', '#C800CC']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={[
          s.ButtonV2,
          {
            borderWidth:
              type === 'outlined' || type === 'secondaryOutlined' ? 1 : 0,
            borderColor:
              mapStyling[type as keyof typeof mapStyling].borderColor,
            width: width ?? 'auto',
            borderRadius: noRound ? 0 : 8,
          },
          style,
        ]}
        {...restOfProps}>
        {isLoading ? (
          <ActivityIndicator
            size="small"
            color={
              type === 'secondaryOutlined'
                ? theme?.colors.SECONDARY
                : type === 'outlined'
                ? theme?.colors.PRIMARY
                : theme?.colors.TEXT_PRIMARY
            }
          />
        ) : (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              variant="large"
              color={
                type === 'primary' ||
                type === 'secondary' ||
                type === 'danger' ||
                type === 'disabled'
                  ? theme?.colors.TEXT_PRIMARY
                  : type === 'outlined'
                  ? 'active'
                  : type === 'secondaryOutlined'
                  ? 'primary2'
                  : 'b1'
              }
              label={title}
              fontWeight="bold"
            />
            {icon}
          </View>
        )}
      </LinearGradient>
    </ScaleAnimation>
  );
}

export default Button;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = (theme: ThemeInterface) =>
  StyleSheet.create({
    ButtonV2: {
      paddingHorizontal: 20,
      paddingVertical: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
/* eslint-disable react-native/no-inline-styles */
import React, {ReactNode} from 'react';
import {SafeAreaView, StatusBar, View, ViewStyle} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import useTheme from '../../../theme/useTheme';

interface LayoutProps {
  children: ReactNode;
  style?: ViewStyle;
  backgroundColor?: string;
  contentContainerStyle?: ViewStyle;
  isScrollable?: boolean;
  showsVerticalScrollIndicator?: boolean;
  keyboardShouldPersistTaps?: boolean;
}

export const Layout = ({
  children,
  style,
  backgroundColor,
  contentContainerStyle,
  isScrollable = true,
  showsVerticalScrollIndicator,
  keyboardShouldPersistTaps = false,
}: LayoutProps) => {
  const theme = useTheme();
  return (
    <>
      <StatusBar
        backgroundColor={backgroundColor ?? theme?.colors.BACKGROUND1}
        barStyle={'light-content'}
      />
      <SafeAreaView
        style={{backgroundColor: backgroundColor ?? theme?.colors.BACKGROUND1}}
      />
      <KeyboardAwareScrollView
        scrollEnabled={isScrollable}
        contentContainerStyle={{...contentContainerStyle}}
        bounces={false}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps || 'handled'}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator || false}>
        <View
          style={{
            flex: 1,
            backgroundColor: backgroundColor ?? theme?.colors.BACKGROUND1,
            ...style,
          }}>
          {children as JSX.Element}
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

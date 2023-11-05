import React from 'react';
import {Pressable, ViewStyle} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useDerivedValue,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

const TimeConfigurations = {duration: 50, easing: Easing.linear};

interface ScaleAnimationI {
  onPress: () => void;
  children: JSX.Element;
  scaleTo: number;
  disabled: boolean;
  style?: ViewStyle;
}

export function ScaleAnimation({
  onPress,
  children,
  scaleTo,
  disabled,
  style,
}: ScaleAnimationI) {
  const pressed = useSharedValue(false);
  const progress = useDerivedValue(() =>
    pressed.value
      ? withTiming(1, TimeConfigurations)
      : withTiming(0, TimeConfigurations),
  );
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      progress.value,
      [0, 1],
      [1, scaleTo],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{scale}],
    };
  });

  return (
    <Pressable
      onPressIn={() => {
        pressed.value = true;
      }}
      onPressOut={() => {
        pressed.value = false;
      }}
      onPress={onPress}
      disabled={disabled}
      style={style}>
      <Animated.View style={animatedStyle}>{children}</Animated.View>
    </Pressable>
  );
}

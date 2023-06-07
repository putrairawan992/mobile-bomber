/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useDerivedValue,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

const TimeConfigurations = { duration: 50, easing: Easing.linear };

interface ScaleAnimationI {
  onPress: () => void;
  children: JSX.Element;
  scaleTo: number;
  disabled: boolean;
}

// eslint-disable-next-line import/prefer-default-export
export function ScaleAnimation({
  onPress,
  children,
  scaleTo,
  disabled,
}: ScaleAnimationI) {
  const pressed = useSharedValue(false);
  const progress = useDerivedValue(() =>
    pressed.value
      ? withTiming(1, TimeConfigurations)
      : withTiming(0, TimeConfigurations));
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      progress.value,
      [0, 1],
      [1, scaleTo],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{ scale }],
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
    >
      <Animated.View style={animatedStyle}>{children}</Animated.View>
    </Pressable>
  );
}

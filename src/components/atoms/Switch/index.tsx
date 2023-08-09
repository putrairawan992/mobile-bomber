import React from 'react';
import {
  Switch as RNSwitch,
  SwitchProps as otherProps,
} from 'react-native-switch';
import colors from '../../../styles/colors';

interface SwitchProps {
  backgroundActive?: string;
  backgroundInactive?: string;
  circleActiveColor?: string;
  circleInActiveColor?: string;
  disabled?: boolean;
  onValueChange: (value: boolean) => void;
  sizeCircle?: number;
  switchProps?: otherProps;
  value: boolean;
  width?: number;
}

export default function Switch({
  value,
  onValueChange,
  sizeCircle,
  width,
  backgroundActive,
  backgroundInactive,
  circleActiveColor,
  circleInActiveColor,
  switchProps,
  disabled,
}: SwitchProps) {
  const toggleWidth = width ?? 40;
  const circleSize = sizeCircle ?? 16;
  const switchWidthMultiplier = toggleWidth / circleSize;
  const multiplierFix =
    circleSize / ((circleSize * switchWidthMultiplier - circleSize) / 2);

  const containerStyle = {
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <RNSwitch
      backgroundActive={backgroundActive ?? '#ef9533'}
      backgroundInactive={backgroundInactive ?? '#262626'}
      barHeight={20}
      changeValueImmediately={true}
      circleActiveColor={circleActiveColor ?? colors.white}
      circleBorderWidth={0}
      circleInActiveColor={circleInActiveColor ?? colors.white}
      circleSize={circleSize}
      containerStyle={containerStyle}
      disabled={disabled}
      outerCircleStyle={{}}
      renderActiveText={false}
      renderInActiveText={false}
      switchBorderRadius={30}
      switchLeftPx={multiplierFix}
      switchRightPx={multiplierFix}
      switchWidthMultiplier={switchWidthMultiplier}
      value={value}
      onValueChange={onValueChange}
      {...switchProps}
    />
  );
}

import * as React from 'react';
import {ViewStyle} from 'react-native';
import Svg, {
  ClipPath,
  Defs,
  G,
  LinearGradient,
  Path,
  Stop,
} from 'react-native-svg';

interface Props {
  color?: string;
  size: number;
  focused?: boolean;
  style?: ViewStyle;
}

export const Star = (props: Props) => {
  return (
    <Svg
      fill="none"
      viewBox="0 0 18 16"
      width={props.size}
      height={props.size}
      style={props.style}>
      <G clipPath="url(#clip0_1211_25926)">
        <Path
          fill="url(#paint0_linear_1211_25926)"
          d="M9.642.547l1.61 4.957h5.212a.793.793 0 01.466 1.435l-4.216 3.063 1.61 4.956a.793.793 0 01-1.22.887l-4.216-3.063-4.217 3.063a.792.792 0 01-1.22-.887l1.611-4.956L.846 6.939a.794.794 0 01.466-1.435h5.213L8.134.547a.794.794 0 011.508 0z"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_1211_25926"
          x1="16.601"
          x2="0.348"
          y1="6.399"
          y2="6.399"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FFE419" />
          <Stop offset="1" stopColor="#F27611" />
        </LinearGradient>
        <ClipPath id="clip0_1211_25926">
          <Path fill="#fff" d="M0 0H16.741V16H0z" transform="translate(.517)" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

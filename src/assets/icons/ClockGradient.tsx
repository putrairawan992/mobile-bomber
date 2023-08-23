import * as React from 'react';
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
}

export const ClockGradient = (props: Props) => {
  return (
    <Svg fill="none" viewBox="0 0 16 16" width={props.size} height={props.size}>
      <G
        fillRule="evenodd"
        clipPath="url(#clip0_2833_47386)"
        clipRule="evenodd">
        <Path
          fill="url(#paint0_linear_2833_47386)"
          d="M8 3.5a.5.5 0 01.5.5v3.5H12a.5.5 0 010 1H8a.5.5 0 01-.5-.5V4a.5.5 0 01.5-.5z"
        />
        <Path
          fill="url(#paint1_linear_2833_47386)"
          d="M8 1.834a6.167 6.167 0 100 12.333A6.167 6.167 0 008 1.834zM.833 8.001a7.167 7.167 0 1114.333 0A7.167 7.167 0 01.833 8z"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_2833_47386"
          x1="7.5"
          x2="12.854"
          y1="8.5"
          y2="4.295"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#4E6AFF" />
          <Stop offset="1" stopColor="#77BAAD" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_2833_47386"
          x1="0.833"
          x2="16.181"
          y1="15.167"
          y2="3.112"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#4E6AFF" />
          <Stop offset="1" stopColor="#77BAAD" />
        </LinearGradient>
        <ClipPath id="clip0_2833_47386">
          <Path fill="#fff" d="M0 0H16V16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

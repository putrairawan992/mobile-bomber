import * as React from 'react';
import Svg, {Defs, LinearGradient, Path, Stop} from 'react-native-svg';

interface Props {
  color?: string;
  size: number;
  focused?: boolean;
}

export const User = (props: Props) => {
  return (
    <Svg fill="none" viewBox="0 0 20 20" width={props.size} height={props.size}>
      <Path
        fill={props.focused ? 'url(#paint0_linear_1018_11010)' : '#FBFDFF'}
        fillRule="evenodd"
        d="M10 10.625a5.208 5.208 0 00-5.208 5.208v.834a.625.625 0 01-1.25 0v-.834a6.458 6.458 0 0112.916 0v.834a.625.625 0 01-1.25 0v-.834A5.208 5.208 0 0010 10.625z"
        clipRule="evenodd"
      />
      <Path
        fill={props.focused ? 'url(#paint0_linear_1018_11010)' : '#FBFDFF'}
        fillRule="evenodd"
        d="M10 3.959a2.708 2.708 0 100 5.417 2.708 2.708 0 000-5.417zM6.042 6.667a3.958 3.958 0 117.916 0 3.958 3.958 0 01-7.917 0z"
        clipRule="evenodd"
      />
      {props.focused && (
        <Defs>
          <LinearGradient
            id="paint0_linear_1018_11010"
            x1="17.488"
            x2="1.708"
            y1="8.375"
            y2="8.375"
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#FEDB19" />
            <Stop offset="1" stopColor="#EF9533" />
          </LinearGradient>
        </Defs>
      )}
    </Svg>
  );
};

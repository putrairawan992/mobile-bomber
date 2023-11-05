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

export const Community = (props: Props) => {
  return (
    <Svg fill="none" viewBox="0 0 20 20" width={props.size} height={props.size}>
      <G
        fill={props.focused ? 'url(#paint0_linear_1018_11010)' : '#FBFDFF'}
        fillRule="evenodd"
        clipPath="url(#clip0_1018_11020)"
        clipRule="evenodd">
        <Path d="M10.334 10.625a3.542 3.542 0 00-3.542 3.542V15a.625.625 0 11-1.25 0v-.833a4.792 4.792 0 119.583 0V15a.625.625 0 11-1.25 0v-.833a3.542 3.542 0 00-3.541-3.542zM3.667 12.291c-1.036 0-1.875.84-1.875 1.875v.833a.625.625 0 11-1.25 0v-.833c0-1.726 1.4-3.125 3.125-3.125v1.25zM17 12.291c1.035 0 1.875.84 1.875 1.875v.833a.625.625 0 101.25 0v-.833c0-1.726-1.4-3.125-3.125-3.125v1.25z" />
        <Path d="M10.334 5.625a1.875 1.875 0 100 3.75 1.875 1.875 0 000-3.75zM7.209 7.5a3.125 3.125 0 116.25 0 3.125 3.125 0 01-6.25 0zM3.667 8.959a1.042 1.042 0 100 2.083 1.042 1.042 0 000-2.083zm-2.292 1.042a2.292 2.292 0 114.583 0 2.292 2.292 0 01-4.583 0zM17 8.959a1.042 1.042 0 100 2.083 1.042 1.042 0 000-2.083zm-2.291 1.042a2.292 2.292 0 114.583 0 2.292 2.292 0 01-4.584 0z" />
      </G>
      <Defs>
        <ClipPath id="clip0_1018_11020">
          <Path
            fill={props.focused ? 'url(#paint0_linear_1018_11010)' : '#FBFDFF'}
            d="M0 0H20V20H0z"
            transform="translate(.333)"
          />
        </ClipPath>
      </Defs>
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

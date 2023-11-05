import * as React from 'react';
import Svg, {Defs, LinearGradient, Path, Stop} from 'react-native-svg';

interface Props {
  color?: string;
  size: number;
  focused?: boolean;
}

export const HalfMoon = (props: Props) => {
  return (
    <Svg fill="none" viewBox="0 0 20 20" width={props.size} height={props.size}>
      <Path
        fill={props.focused ? 'url(#paint0_linear_1018_11010)' : '#FBFDFF'}
        fillRule="evenodd"
        d="M7.224 1.969a.625.625 0 01.296.531c0 3.45.855 5.913 2.461 7.519 1.606 1.606 4.07 2.46 7.519 2.46a.625.625 0 01.56.904A8.536 8.536 0 116.617 1.94a.625.625 0 01.607.029zm-.926 1.605a7.286 7.286 0 1010.128 10.128c-3.127-.164-5.598-1.069-7.329-2.8-1.73-1.73-2.635-4.2-2.8-7.328z"
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

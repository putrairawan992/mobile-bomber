import * as React from 'react';
import Svg, {Defs, LinearGradient, Path, Stop} from 'react-native-svg';

interface Props {
  color?: string;
  size: number;
  focused?: boolean;
}

export const Flare = (props: Props) => {
  return (
    <Svg fill="none" viewBox="0 0 20 20" width={props.size} height={props.size}>
      <Path
        fill={props.focused ? 'url(#paint0_linear_1018_11010)' : '#FBFDFF'}
        fillRule="evenodd"
        d="M10.666 2.727L8.393 7.6c-.112.24-.304.432-.544.544l-4.871 2.273 4.871 2.273c.24.112.432.305.544.544l2.273 4.872 2.274-4.872c.112-.24.304-.432.544-.544l4.871-2.273-4.871-2.273a1.125 1.125 0 01-.544-.544l-2.274-4.872zm-1.019-.771c.404-.866 1.635-.866 2.039 0l2.367 5.073 5.073 2.367c.866.404.866 1.635 0 2.04l-5.073 2.367-2.367 5.073c-.404.866-1.635.866-2.039 0L7.28 13.803l-5.074-2.368c-.865-.404-.865-1.635 0-2.039L7.28 7.03l2.367-5.073z"
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
            <Stop stopColor="#EF9533" />
            <Stop offset="1" stopColor="#EF9533" />
          </LinearGradient>
        </Defs>
      )}
    </Svg>
  );
};

import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path} from 'react-native-svg';

interface Props {
  color: string;
  size: number;
  focused?: boolean;
}

export const Clock = (props: Props) => {
  return (
    <Svg fill="none" viewBox="0 0 16 16" width={props.size} height={props.size}>
      <G
        fill={props.color}
        fillRule="evenodd"
        clipPath="url(#clip0_2833_47410)"
        clipRule="evenodd">
        <Path d="M8 3.5a.5.5 0 01.5.5v3.5H12a.5.5 0 010 1H8a.5.5 0 01-.5-.5V4a.5.5 0 01.5-.5z" />
        <Path d="M8 1.834a6.167 6.167 0 100 12.333A6.167 6.167 0 008 1.834zM.833 8.001a7.167 7.167 0 1114.333 0A7.167 7.167 0 01.833 8z" />
      </G>
      <Defs>
        <ClipPath id="clip0_2833_47410">
          <Path fill="#fff" d="M0 0H16V16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

import * as React from 'react';
import Svg, {Circle} from 'react-native-svg';

interface Props {
  color: string;
  size: number;
  focused?: boolean;
}

export const CircleDot = (props: Props) => {
  return (
    <Svg fill="none" viewBox="0 0 16 16" width={props.size} height={props.size}>
      <Circle cx="8" cy="8" r="5.25" stroke={props.color} strokeWidth="1.5" />
      <Circle cx="8" cy="8" r="3.429" fill={props.color} />
    </Svg>
  );
};

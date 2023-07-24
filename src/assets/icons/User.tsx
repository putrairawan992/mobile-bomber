import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  color: string;
  size: number;
  focused?: boolean;
}

export const User = (props: Props) => {
  return (
    <Svg fill="none" viewBox="0 0 28 29" width={props.size} height={props.size}>
      <Path
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M23.334 24.906v-2.333a4.667 4.667 0 00-4.667-4.667H9.334a4.667 4.667 0 00-4.667 4.667v2.333M14 13.24a4.667 4.667 0 100-9.334 4.667 4.667 0 000 9.334z"
      />
    </Svg>
  );
};

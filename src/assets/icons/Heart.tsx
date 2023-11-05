import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  color: string;
  size: number;
  focused?: boolean;
}

export const Heart = (props: Props) => {
  return (
    <Svg fill="none" viewBox="0 0 28 29" width={props.size} height={props.size}>
      <Path
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M24.313 5.785a6.416 6.416 0 00-9.076 0L14 7.02l-1.237-1.236a6.418 6.418 0 10-9.077 9.076l1.237 1.237L14 25.175l9.076-9.077 1.237-1.237a6.417 6.417 0 000-9.076z"
      />
    </Svg>
  );
};

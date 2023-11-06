import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  color: string;
  size: number;
  focused?: boolean;
}

export const Bookmark = (props: Props) => {
  return (
    <Svg fill="none" viewBox="0 0 28 29" width={props.size} height={props.size}>
      <Path
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M22.166 24.875L14 19.042l-8.167 5.833V6.208a2.333 2.333 0 012.333-2.333h11.667a2.333 2.333 0 012.333 2.333v18.667z"
      />
    </Svg>
  );
};

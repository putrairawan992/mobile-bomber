import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  color: string;
  size: number;
  focused?: boolean;
}

export const Search = (props: Props) => {
  return (
    <Svg fill="none" viewBox="0 0 28 28" width={props.size} height={props.size}>
      <Path
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12.833 22.167a9.333 9.333 0 100-18.667 9.333 9.333 0 000 18.667zM24.5 24.5l-5.075-5.075"
      />
    </Svg>
  );
};

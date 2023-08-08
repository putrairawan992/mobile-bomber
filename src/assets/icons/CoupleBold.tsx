import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  color: string;
  size: number;
  focused?: boolean;
}

export const CoupleBold = (props: Props) => {
  return (
    <Svg fill="none" viewBox="0 0 18 25" width={props.size} height={props.size}>
      <Path
        fill={props.color}
        d="M3.5.143a2 2 0 110 4 2 2 0 010-4zm-1.5 5h3a2 2 0 012 2v5.5H5.5v7.5h-4v-7.5H0v-5.5a2 2 0 012-2zm10.5-5a2 2 0 110 4 2 2 0 010-4zm-1.5 5h3a2 2 0 012 2v5.5h-1.5v7.5h-4v-7.5H9v-5.5a2 2 0 012-2z"
      />
    </Svg>
  );
};

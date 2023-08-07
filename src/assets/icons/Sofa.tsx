import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

interface Props {
  color: string;
  size: number;
  focused?: boolean;
}

export const Sofa = (props: Props) => {
  return (
    <Svg fill="none" viewBox="0 0 22 16" width={props.size} height={props.size}>
      <G
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5">
        <Path d="M1 12.143v3m2-10v-2a2 2 0 012-2h12a2 2 0 012 2v2" />
        <Path d="M21 12.143v3m-2-10a2 2 0 00-2 2v2H5v-2a2 2 0 10-4 0v6h20v-6a2 2 0 00-2-2z" />
      </G>
    </Svg>
  );
};

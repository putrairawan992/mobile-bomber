import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

interface Props {
  color: string;
  size: number;
  focused?: boolean;
}

export const UserGroup = (props: Props) => {
  return (
    <Svg fill="none" viewBox="0 0 20 20" width={props.size} height={props.size}>
      <G fill={props.color} fillRule="evenodd" clipRule="evenodd">
        <Path d="M6.667 10.625a5.208 5.208 0 00-5.209 5.208v.834a.625.625 0 01-1.25 0v-.834a6.458 6.458 0 0112.917 0v.834a.625.625 0 01-1.25 0v-.834a5.208 5.208 0 00-5.208-5.208z" />
        <Path d="M15 8.125a3.542 3.542 0 00-3.542 3.542h-1.25a4.792 4.792 0 119.584 0v.416a.625.625 0 11-1.25 0v-.416A3.542 3.542 0 0015 8.125z" />
        <Path d="M6.667 3.959a2.708 2.708 0 100 5.417 2.708 2.708 0 000-5.417zM2.708 6.667a3.958 3.958 0 117.917 0 3.958 3.958 0 01-7.917 0z" />
        <Path d="M15 3.125a1.875 1.875 0 100 3.75 1.875 1.875 0 000-3.75zM11.875 5a3.125 3.125 0 116.25 0 3.125 3.125 0 01-6.25 0z" />
      </G>
    </Svg>
  );
};

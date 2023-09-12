import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

interface Props {
  color: string;
  size: number;
  focused?: boolean;
}

export const Position = (props: Props) => {
  return (
    <Svg fill="none" viewBox="0 0 20 20" width={props.size} height={props.size}>
      <G fill="#FCFCFC" fillRule="evenodd" clipRule="evenodd">
        <Path d="M10 4.791a5.208 5.208 0 100 10.417A5.208 5.208 0 0010 4.79zM3.542 9.999a6.458 6.458 0 1112.917 0 6.458 6.458 0 01-12.917 0z" />
        <Path d="M10 15.209c.345 0 .625.28.625.625v1.667a.625.625 0 01-1.25 0v-1.667c0-.345.28-.625.625-.625z" />
        <Path d="M1.875 10c0-.345.28-.625.625-.625h1.667a.625.625 0 010 1.25H2.5A.625.625 0 011.875 10z" />
        <Path d="M10 1.875c.345 0 .625.28.625.625v1.667a.625.625 0 11-1.25 0V2.5c0-.345.28-.625.625-.625z" />
        <Path d="M15.208 10c0-.345.28-.625.625-.625H17.5a.625.625 0 110 1.25h-1.667a.625.625 0 01-.625-.625z" />
      </G>
    </Svg>
  );
};

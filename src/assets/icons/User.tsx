import * as React from 'react';
import Svg, {Defs, LinearGradient, Path, Stop} from 'react-native-svg';

interface Props {
  color?: string;
  size: number;
  focused?: boolean;
}

export const User = (props: Props) => {
  return (
    <Svg fill="none" viewBox="0 0 20 20" width={props.size} height={props.size}>
      <Path
        fill={props.focused ? 'url(#paint0_linear_1018_11010)' : '#FBFDFF'}
        fillRule="evenodd"
        d="M9.9987 10.625C8.04269 10.625 6.45703 12.2107 6.45703 14.1667V15C6.45703 15.3452 6.17721 15.625 5.83203 15.625C5.48685 15.625 5.20703 15.3452 5.20703 15V14.1667C5.20703 11.5203 7.35233 9.375 9.9987 9.375C12.6451 9.375 14.7904 11.5203 14.7904 14.1667V15C14.7904 15.3452 14.5105 15.625 14.1654 15.625C13.8202 15.625 13.5404 15.3452 13.5404 15V14.1667C13.5404 12.2107 11.9547 10.625 9.9987 10.625Z"
        clipRule="evenodd"
      />
      <Path
        fill={props.focused ? 'url(#paint0_linear_1018_11010)' : '#FBFDFF'}
        fillRule="evenodd"
        d="M10 5.625C8.96447 5.625 8.125 6.46447 8.125 7.5C8.125 8.53553 8.96447 9.375 10 9.375C11.0355 9.375 11.875 8.53553 11.875 7.5C11.875 6.46447 11.0355 5.625 10 5.625ZM6.875 7.5C6.875 5.77411 8.27411 4.375 10 4.375C11.7259 4.375 13.125 5.77411 13.125 7.5C13.125 9.22589 11.7259 10.625 10 10.625C8.27411 10.625 6.875 9.22589 6.875 7.5Z"
        clipRule="evenodd"
      />
      <Path
        fill={props.focused ? 'url(#paint0_linear_1018_11010)' : '#FBFDFF'}
        fillRule="evenodd"
        d="M10.0013 2.29102C5.74411 2.29102 2.29297 5.74215 2.29297 9.99935C2.29297 14.2565 5.74411 17.7077 10.0013 17.7077C14.2585 17.7077 17.7096 14.2565 17.7096 9.99935C17.7096 5.74215 14.2585 2.29102 10.0013 2.29102ZM1.04297 9.99935C1.04297 5.0518 5.05375 1.04102 10.0013 1.04102C14.9489 1.04102 18.9596 5.0518 18.9596 9.99935C18.9596 14.9469 14.9489 18.9577 10.0013 18.9577C5.05375 18.9577 1.04297 14.9469 1.04297 9.99935Z"
        clipRule="evenodd"
      />
      {props.focused && (
        <Defs>
          <LinearGradient
            id="paint0_linear_1018_11010"
            x1="17.488"
            x2="1.708"
            y1="8.375"
            y2="8.375"
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#FEDB19" />
            <Stop offset="1" stopColor="#EF9533" />
          </LinearGradient>
        </Defs>
      )}
    </Svg>
  );
};

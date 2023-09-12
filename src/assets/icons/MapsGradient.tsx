import * as React from 'react';
import Svg, {Defs, G, LinearGradient, Path, Stop} from 'react-native-svg';

interface Props {
  color?: string;
  size: number;
  focused?: boolean;
}

export const MapsGradient = (props: Props) => {
  return (
    <Svg fill="none" viewBox="0 0 20 20" width={props.size} height={props.size}>
      <G>
        <Path
          fill="url(#paint0_linear_3900_49586)"
          fillRule="evenodd"
          d="M16.644 2.126c.729-.242 1.481.3 1.481 1.068v12.279c0 .484-.31.914-.77 1.067l-4.657 1.553a.624.624 0 01-.396 0l-4.802-1.6-4.144 1.38c-.729.243-1.481-.299-1.481-1.067V4.527c0-.484.31-.914.77-1.067l4.657-1.553a.625.625 0 01.396 0l4.802 1.6 4.144-1.38zm-4.769 2.491l-3.75-1.25v12.016l3.75 1.25V4.617zm1.25 12.016V4.617l3.75-1.25v12.016l-3.75 1.25zm-6.25-1.25V3.367l-3.75 1.25v12.016l3.75-1.25z"
          clipRule="evenodd"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_3900_49586"
          x1="4.922"
          x2="4.848"
          y1="5.425"
          y2="15.15"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#A060FA" />
          <Stop offset="1" stopColor="#C800CC" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

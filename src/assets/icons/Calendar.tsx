import * as React from 'react';
import Svg, {Defs, G, LinearGradient, Path, Stop} from 'react-native-svg';

interface Props {
  color?: string;
  size: number;
  focused?: boolean;
}

export const Calendar = (props: Props) => {
  return (
    <Svg fill="none" viewBox="0 0 16 16" width={props.size} height={props.size}>
      <G fillRule="evenodd" clipRule="evenodd">
        <Path
          fill="url(#paint0_linear_1660_9486)"
          d="M10 .834a.5.5 0 01.5.5v2.667a.5.5 0 01-1 0v-.834H7a.5.5 0 010-1h2.5v-.833a.5.5 0 01.5-.5zM1.5 6.667a.5.5 0 01.5-.5h12a.5.5 0 01.5.5v6c0 1.013-.82 1.834-1.833 1.834H3.333A1.833 1.833 0 011.5 12.667v-6zm1 .5v5.5c0 .46.373.834.833.834h9.334c.46 0 .833-.373.833-.834v-5.5h-11z"
        />
        <Path
          fill="url(#paint1_linear_1660_9486)"
          d="M3.333 3.166a.833.833 0 00-.833.833v2.667a.5.5 0 01-1 0V3.999c0-1.012.82-1.833 1.833-1.833h1.334a.5.5 0 110 1H3.333z"
        />
        <Path
          fill="url(#paint2_linear_1660_9486)"
          d="M4.667.834a.5.5 0 01.5.5v2.667a.5.5 0 11-1 0V1.334a.5.5 0 01.5-.5z"
        />
        <Path
          fill="url(#paint3_linear_1660_9486)"
          d="M11.834 2.666a.5.5 0 01.5-.5h.333c1.012 0 1.833.82 1.833 1.833v2.667a.5.5 0 01-1 0V3.999a.833.833 0 00-.833-.833h-.333a.5.5 0 01-.5-.5z"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_1660_9486"
          x1="1.5"
          x2="15.945"
          y1="14.501"
          y2="3.708"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#4E6AFF" />
          <Stop offset="1" stopColor="#77BAAD" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_1660_9486"
          x1="1.5"
          x2="6.267"
          y1="7.166"
          y2="4.42"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#4E6AFF" />
          <Stop offset="1" stopColor="#77BAAD" />
        </LinearGradient>
        <LinearGradient
          id="paint2_linear_1660_9486"
          x1="4.167"
          x2="5.822"
          y1="4.501"
          y2="4.146"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#4E6AFF" />
          <Stop offset="1" stopColor="#77BAAD" />
        </LinearGradient>
        <LinearGradient
          id="paint3_linear_1660_9486"
          x1="11.834"
          x2="15.761"
          y1="7.166"
          y2="5.521"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#4E6AFF" />
          <Stop offset="1" stopColor="#77BAAD" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

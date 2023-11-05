import * as React from 'react';
import Svg, {Defs, G, LinearGradient, Path, Stop} from 'react-native-svg';

interface Props {
  color?: string;
  size: number;
  focused?: boolean;
}

export const Building = (props: Props) => {
  return (
    <Svg fill="none" viewBox="0 0 16 16" width={props.size} height={props.size}>
      <G fillRule="evenodd" clipRule="evenodd">
        <Path
          fill="url(#paint0_linear_1660_9475)"
          d="M7.333 14.5a.5.5 0 01-.5-.5v-1.333a.5.5 0 111 0V14a.5.5 0 01-.5.5z"
        />
        <Path
          fill="url(#paint1_linear_1660_9475)"
          d="M7.333 11.166a.5.5 0 01-.5-.5V7.999a.5.5 0 111 0v2.667a.5.5 0 01-.5.5z"
        />
        <Path
          fill="url(#paint2_linear_1660_9475)"
          d="M8.834 10.666a.5.5 0 01.5-.5h.833V7.999a.5.5 0 011 0v2.667a.5.5 0 01-.5.5H9.334a.5.5 0 01-.5-.5z"
        />
        <Path
          fill="url(#paint3_linear_1660_9475)"
          d="M4.833 8a.5.5 0 01.5-.5H14a.5.5 0 010 1H5.334a.5.5 0 01-.5-.5z"
        />
        <Path
          fill="url(#paint4_linear_1660_9475)"
          d="M1.5 8a.5.5 0 01.5-.5h1.333a.5.5 0 110 1H2a.5.5 0 01-.5-.5z"
        />
        <Path
          fill="url(#paint5_linear_1660_9475)"
          d="M14.488 3.442a.5.5 0 00-.38-.596l-6-1.334a.5.5 0 00-.217 0l-6 1.334a.5.5 0 10.217.976L8 2.512l5.891 1.31a.5.5 0 00.597-.38z"
        />
        <Path
          fill="url(#paint6_linear_1660_9475)"
          d="M13.5 13.5V5.833h-11V13.5h11zm1 .1a.9.9 0 01-.9.9H2.4a.9.9 0 01-.9-.9V5.733a.9.9 0 01.9-.9h11.2a.9.9 0 01.9.9V13.6z"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_1660_9475"
          x1="7.833"
          x2="6.135"
          y1="14.5"
          y2="13.573"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#4E6AFF" />
          <Stop offset="1" stopColor="#77BAAD" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_1660_9475"
          x1="7.833"
          x2="5.866"
          y1="11.166"
          y2="10.483"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#4E6AFF" />
          <Stop offset="1" stopColor="#77BAAD" />
        </LinearGradient>
        <LinearGradient
          id="paint2_linear_1660_9475"
          x1="11.167"
          x2="8.062"
          y1="11.166"
          y2="8.65"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#4E6AFF" />
          <Stop offset="1" stopColor="#77BAAD" />
        </LinearGradient>
        <LinearGradient
          id="paint3_linear_1660_9475"
          x1="4.833"
          x2="5.119"
          y1="8.5"
          y2="6.333"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#4E6AFF" />
          <Stop offset="1" stopColor="#77BAAD" />
        </LinearGradient>
        <LinearGradient
          id="paint4_linear_1660_9475"
          x1="1.5"
          x2="2.427"
          y1="8.5"
          y2="6.801"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#4E6AFF" />
          <Stop offset="1" stopColor="#77BAAD" />
        </LinearGradient>
        <LinearGradient
          id="paint5_linear_1660_9475"
          x1="1.5"
          x2="2.058"
          y1="3.834"
          y2="-0.128"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#4E6AFF" />
          <Stop offset="1" stopColor="#77BAAD" />
        </LinearGradient>
        <LinearGradient
          id="paint6_linear_1660_9475"
          x1="14.5"
          x2="3.861"
          y1="4.833"
          y2="16.071"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#4E6AFF" />
          <Stop offset="1" stopColor="#77BAAD" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

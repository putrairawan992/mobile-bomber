import * as React from 'react';
import Svg, {Defs, G, LinearGradient, Path, Stop} from 'react-native-svg';

interface Props {
  color?: string;
  size: number;
  focused?: boolean;
}

export const HouseGradient = (props: Props) => {
  return (
    <Svg fill="none" viewBox="0 0 21 20" width={props.size} height={props.size}>
      <G fillRule="evenodd" clipRule="evenodd">
        <Path
          fill="url(#paint0_Linear_1920_25261)"
          d="M9.667 18.125a.625.625 0 01-.625-.625v-1.667a.625.625 0 011.25 0V17.5c0 .345-.28.625-.625.625z"
        />
        <Path
          fill="url(#paint1_Linear_1920_25261)"
          d="M9.667 13.959a.625.625 0 01-.625-.625v-3.333a.625.625 0 111.25 0v3.333c0 .345-.28.625-.625.625z"
        />
        <Path
          fill="url(#paint2_Linear_1920_25261)"
          d="M11.542 13.334c0-.345.28-.625.625-.625h1.041v-2.708a.625.625 0 111.25 0v3.333a.625.625 0 01-.625.625h-1.666a.625.625 0 01-.625-.625z"
        />
        <Path
          fill="url(#paint3_Linear_1920_25261)"
          d="M6.542 10c0-.345.28-.625.625-.625H18a.625.625 0 110 1.25H7.167A.625.625 0 016.542 10z"
        />
        <Path
          fill="url(#paint4_Linear_1920_25261)"
          d="M2.375 10c0-.345.28-.625.625-.625h1.667a.625.625 0 010 1.25H3A.625.625 0 012.375 10z"
        />
        <Path
          fill="url(#paint5_Linear_1920_25261)"
          d="M18.61 4.301a.625.625 0 00-.474-.745l-7.5-1.667a.625.625 0 00-.271 0l-7.5 1.667a.625.625 0 00.27 1.22L10.5 3.139l7.364 1.637a.625.625 0 00.746-.475z"
        />
        <Path
          fill="url(#paint6_Linear_1920_25261)"
          d="M17.375 16.875V7.292H3.625v9.583h13.75zm1.25.125c0 .621-.504 1.125-1.125 1.125h-14A1.125 1.125 0 012.375 17V7.167c0-.622.504-1.125 1.125-1.125h14c.621 0 1.125.503 1.125 1.125V17z"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_Linear_1920_25261"
          x1="10.292"
          x2="8.168"
          y1="18.125"
          y2="16.966"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#4E6AFF" />
          <Stop offset="1" stopColor="#77BAAD" />
        </LinearGradient>
        <LinearGradient
          id="paint1_Linear_1920_25261"
          x1="10.292"
          x2="7.833"
          y1="13.959"
          y2="13.105"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#4E6AFF" />
          <Stop offset="1" stopColor="#77BAAD" />
        </LinearGradient>
        <LinearGradient
          id="paint2_Linear_1920_25261"
          x1="14.458"
          x2="10.577"
          y1="13.959"
          y2="10.814"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#4E6AFF" />
          <Stop offset="1" stopColor="#77BAAD" />
        </LinearGradient>
        <LinearGradient
          id="paint3_Linear_1920_25261"
          x1="6.542"
          x2="6.898"
          y1="10.625"
          y2="7.917"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#4E6AFF" />
          <Stop offset="1" stopColor="#77BAAD" />
        </LinearGradient>
        <LinearGradient
          id="paint4_Linear_1920_25261"
          x1="2.375"
          x2="3.534"
          y1="10.625"
          y2="8.502"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#4E6AFF" />
          <Stop offset="1" stopColor="#77BAAD" />
        </LinearGradient>
        <LinearGradient
          id="paint5_Linear_1920_25261"
          x1="2.375"
          x2="3.073"
          y1="4.791"
          y2="-0.161"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#4E6AFF" />
          <Stop offset="1" stopColor="#77BAAD" />
        </LinearGradient>
        <LinearGradient
          id="paint6_Linear_1920_25261"
          x1="18.625"
          x2="5.327"
          y1="6.042"
          y2="20.089"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#4E6AFF" />
          <Stop offset="1" stopColor="#77BAAD" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

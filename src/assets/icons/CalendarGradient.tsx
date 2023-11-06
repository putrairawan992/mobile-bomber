import * as React from 'react';
import Svg, {Defs, G, LinearGradient, Path, Stop} from 'react-native-svg';

interface Props {
  color?: string;
  size: number;
  focused?: boolean;
}

export const CalendarGradient = (props: Props) => {
  return (
    <Svg fill="none" viewBox="0 0 21 20" width={props.size} height={props.size}>
      <G fillRule="evenodd" clipRule="evenodd">
        <Path
          fill="url(#paint0_Linear_1920_19252)"
          d="M13 1.041c.345 0 .625.28.625.625v3.333a.625.625 0 11-1.25 0V3.958H9.25a.625.625 0 110-1.25h3.125V1.666c0-.345.28-.625.625-.625zM2.375 8.333c0-.346.28-.625.625-.625h15c.345 0 .625.28.625.625v7.5a2.292 2.292 0 01-2.292 2.291H4.667a2.292 2.292 0 01-2.292-2.291v-7.5zm1.25.625v6.875c0 .575.466 1.041 1.042 1.041h11.666c.576 0 1.042-.466 1.042-1.041V8.958H3.625z"
        />
        <Path
          fill="url(#paint1_Linear_1920_19252)"
          d="M4.667 3.959c-.576 0-1.042.466-1.042 1.042v3.333a.625.625 0 11-1.25 0V5.001a2.292 2.292 0 012.292-2.292h1.666a.625.625 0 010 1.25H4.667z"
        />
        <Path
          fill="url(#paint2_Linear_1920_19252)"
          d="M6.333 1.041c.345 0 .625.28.625.625v3.333a.625.625 0 11-1.25 0V1.666c0-.345.28-.625.625-.625z"
        />
        <Path
          fill="url(#paint3_Linear_1920_19252)"
          d="M15.292 3.334c0-.345.28-.625.625-.625h.416a2.292 2.292 0 012.292 2.292v3.333a.625.625 0 11-1.25 0V5.001c0-.576-.466-1.042-1.042-1.042h-.416a.625.625 0 01-.625-.625z"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_Linear_1920_19252"
          x1="2.375"
          x2="20.432"
          y1="18.124"
          y2="4.633"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#4E6AFF" />
          <Stop offset="1" stopColor="#77BAAD" />
        </LinearGradient>
        <LinearGradient
          id="paint1_Linear_1920_19252"
          x1="2.375"
          x2="8.334"
          y1="8.959"
          y2="5.527"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#4E6AFF" />
          <Stop offset="1" stopColor="#77BAAD" />
        </LinearGradient>
        <LinearGradient
          id="paint2_Linear_1920_19252"
          x1="5.708"
          x2="7.778"
          y1="5.624"
          y2="5.181"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#4E6AFF" />
          <Stop offset="1" stopColor="#77BAAD" />
        </LinearGradient>
        <LinearGradient
          id="paint3_Linear_1920_19252"
          x1="15.292"
          x2="20.202"
          y1="8.959"
          y2="6.902"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#4E6AFF" />
          <Stop offset="1" stopColor="#77BAAD" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

import * as React from 'react';
import Svg, {
  ClipPath,
  Defs,
  G,
  LinearGradient,
  Path,
  Stop,
} from 'react-native-svg';

interface Props {
  color?: string;
  size: number;
  focused?: boolean;
}

export const DoorGradient = (props: Props) => {
  return (
    <Svg fill="none" viewBox="0 0 21 20" width={props.size} height={props.size}>
      <G clipPath="url(#clip0_496_33161)">
        <Path
          stroke="url(#paint0_Linear_496_33161)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="0.938"
          d="M2.375 17.5h16.25"
        />
        <Path
          stroke="url(#paint1_Linear_496_33161)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="0.938"
          d="M4.875 17.5V3.125A.625.625 0 015.5 2.5h10a.625.625 0 01.625.625V17.5"
        />
        <Path
          fill="url(#paint2_Linear_496_33161)"
          d="M12.688 10.781a.781.781 0 100-1.562.781.781 0 000 1.562z"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_Linear_496_33161"
          x1="2.375"
          x2="2.547"
          y1="18.5"
          y2="16.309"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#4E6AFF" />
          <Stop offset="1" stopColor="#77BAAD" />
        </LinearGradient>
        <LinearGradient
          id="paint1_Linear_496_33161"
          x1="4.875"
          x2="19.336"
          y1="17.5"
          y2="8.981"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#4E6AFF" />
          <Stop offset="1" stopColor="#77BAAD" />
        </LinearGradient>
        <LinearGradient
          id="paint2_Linear_496_33161"
          x1="11.906"
          x2="13.579"
          y1="10.781"
          y2="9.467"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#4E6AFF" />
          <Stop offset="1" stopColor="#77BAAD" />
        </LinearGradient>
        <ClipPath id="clip0_496_33161">
          <Path fill="#fff" d="M0 0H20V20H0z" transform="translate(.5)" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

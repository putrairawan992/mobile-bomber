import * as React from 'react';
import {ViewStyle} from 'react-native';
import Svg, {Defs, LinearGradient, Path, Stop} from 'react-native-svg';

interface Props {
  color?: string;
  size: number;
  focused?: boolean;
  style?: ViewStyle;
}

export const UserCrown = (props: Props) => {
  return (
    <Svg width={props.size} height={props.size} viewBox="0 0 21 20" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.5001 3.9585C9.00431 3.9585 7.79175 5.17106 7.79175 6.66683C7.79175 8.1626 9.00431 9.37516 10.5001 9.37516C11.9959 9.37516 13.2084 8.1626 13.2084 6.66683C13.2084 5.17106 11.9959 3.9585 10.5001 3.9585ZM6.54175 6.66683C6.54175 4.4807 8.31395 2.7085 10.5001 2.7085C12.6862 2.7085 14.4584 4.4807 14.4584 6.66683C14.4584 8.85296 12.6862 10.6252 10.5001 10.6252C8.31395 10.6252 6.54175 8.85296 6.54175 6.66683Z"
        fill="url(#paint0_Linear_2265_23488)"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.5001 10.625C7.6236 10.625 5.29175 12.9569 5.29175 15.8333V16.6667C5.29175 17.0118 5.01193 17.2917 4.66675 17.2917C4.32157 17.2917 4.04175 17.0118 4.04175 16.6667V15.8333C4.04175 12.2665 6.93324 9.375 10.5001 9.375C11.4895 9.375 12.4285 9.5979 13.2683 9.99682C13.58 10.1449 13.7127 10.5178 13.5646 10.8295C13.4165 11.1413 13.0437 11.274 12.7319 11.1259C12.0562 10.8049 11.3 10.625 10.5001 10.625Z"
        fill="url(#paint1_Linear_2265_23488)"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.1316 12.8287C9.94065 12.968 9.84466 13.2031 9.88352 13.4362L10.7169 18.4362C10.7671 18.7376 11.0278 18.9585 11.3334 18.9585H18C18.3055 18.9585 18.5663 18.7376 18.6165 18.4362L19.4498 13.4362C19.4887 13.2031 19.3927 12.968 19.2018 12.8287C19.0109 12.6893 18.7577 12.6696 18.5475 12.7777L16.0762 14.0486L15.1468 12.9334C15.0281 12.7909 14.8522 12.7085 14.6667 12.7085C14.4812 12.7085 14.3053 12.7909 14.1865 12.9334L13.2572 14.0486L10.7859 12.7777C10.5757 12.6696 10.3225 12.6893 10.1316 12.8287ZM11.3212 14.4586L13.1308 15.3893C13.3911 15.5232 13.7094 15.4585 13.8968 15.2336L14.6667 14.3098L15.4365 15.2336C15.6239 15.4585 15.9422 15.5232 16.2025 15.3893L18.0122 14.4586L17.4706 17.7085H11.8628L11.3212 14.4586Z"
        fill="url(#paint2_Linear_2265_23488)"
      />
      <Defs>
        <LinearGradient
          id="paint0_Linear_2265_23488"
          x1="6.54175"
          y1="10.6252"
          x2="15.0191"
          y2="3.9665"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#4E6AFF" />
          <Stop offset="1" stopColor="#77BAAD" />
        </LinearGradient>
        <LinearGradient
          id="paint1_Linear_2265_23488"
          x1="4.04175"
          y1="17.2917"
          x2="12.7564"
          y2="9.00543"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#4E6AFF" />
          <Stop offset="1" stopColor="#77BAAD" />
        </LinearGradient>
        <LinearGradient
          id="paint2_Linear_2265_23488"
          x1="19.4584"
          y1="12.7085"
          x2="15.0672"
          y2="21.2808"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#4E6AFF" />
          <Stop offset="1" stopColor="#77BAAD" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

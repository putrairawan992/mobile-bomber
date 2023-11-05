import * as React from 'react';
import Svg, {Defs, G, LinearGradient, Path, Stop} from 'react-native-svg';

interface Props {
  color?: string;
  size: number;
  focused?: boolean;
}

export const GlassGradient = (props: Props) => {
  return (
    <Svg fill="none" viewBox="0 0 21 20" width={props.size} height={props.size}>
      <G fillRule="evenodd" clipRule="evenodd">
        <Path
          fill="url(#paint0_Linear_1920_13264)"
          d="M3.668 3.612l1.4 10.503a2.708 2.708 0 001.341 1.993l.267.153a7.708 7.708 0 007.648 0l.267-.152a2.708 2.708 0 001.34-1.994l1.401-10.503c-.604-.387-2.508-1.321-6.832-1.321s-6.228.934-6.832 1.32zm-.838-.943c.71-.505 2.835-1.628 7.67-1.628s6.96 1.123 7.67 1.628c.346.247.463.648.417.991L17.17 14.28a3.958 3.958 0 01-1.96 2.914l-.267.152a8.958 8.958 0 01-8.889 0l-.266-.152a3.958 3.958 0 01-1.96-2.914L2.413 3.66c-.046-.343.07-.744.417-.99z"
        />
        <Path
          fill="url(#paint1_Linear_1920_13264)"
          d="M4.411 4.32c-.462-.193-.777-.395-.961-.587l-.9.868c.351.364.84.648 1.382.873.55.228 1.192.411 1.887.555 1.391.289 3.042.43 4.681.43 1.639 0 3.29-.141 4.68-.43a10.622 10.622 0 001.887-.555c.543-.225 1.032-.509 1.383-.873l-.9-.868c-.185.192-.5.394-.961.586a9.396 9.396 0 01-1.662.486c-1.288.267-2.852.404-4.427.404-1.575 0-3.139-.136-4.427-.404a9.395 9.395 0 01-1.662-.486z"
        />
        <Path
          fill="url(#paint2_Linear_1920_13264)"
          d="M14.069 11.548c-1.298.264-2.86.37-4.378.312-1.249-.048-2.444-.206-3.418-.466-1.003-.267-1.664-.616-1.965-.967l-.95.813c.559.651 1.534 1.08 2.592 1.362 1.087.29 2.379.457 3.693.507 1.598.06 3.262-.05 4.675-.336.706-.143 1.363-.334 1.923-.577.554-.241 1.053-.551 1.4-.956l-.949-.813c-.175.205-.485.42-.95.622-.456.199-1.024.367-1.673.5z"
        />
        <Path
          fill="url(#paint3_Linear_1920_13264)"
          d="M13.625 17.084v-4.73h-1.25v4.73h1.25z"
        />
        <Path
          fill="url(#paint4_Linear_1920_13264)"
          d="M6.594 10.191c-1.169.273-1.948.654-2.286 1.048l-.95-.813c.615-.717 1.74-1.17 2.952-1.452 1.248-.291 2.726-.433 4.19-.433 1.464 0 2.942.142 4.19.433 1.211.283 2.337.735 2.951 1.452l-.949.813c-.338-.394-1.117-.775-2.286-1.048-1.134-.264-2.513-.4-3.906-.4-1.393 0-2.772.136-3.906.4z"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_Linear_1920_13264"
          x1="2.404"
          x2="20.739"
          y1="18.526"
          y2="5.189"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#4E6AFF" />
          <Stop offset="1" stopColor="#77BAAD" />
        </LinearGradient>
        <LinearGradient
          id="paint1_Linear_1920_13264"
          x1="2.55"
          x2="3.802"
          y1="3.733"
          y2="9.468"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#4E6AFF" />
          <Stop offset="1" stopColor="#77BAAD" />
        </LinearGradient>
        <LinearGradient
          id="paint2_Linear_1920_13264"
          x1="3.359"
          x2="4.711"
          y1="10.427"
          y2="16.05"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#4E6AFF" />
          <Stop offset="1" stopColor="#77BAAD" />
        </LinearGradient>
        <LinearGradient
          id="paint3_Linear_1920_13264"
          x1="12.375"
          x2="14.45"
          y1="12.353"
          y2="12.784"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#4E6AFF" />
          <Stop offset="1" stopColor="#77BAAD" />
        </LinearGradient>
        <LinearGradient
          id="paint4_Linear_1920_13264"
          x1="3.359"
          x2="4.711"
          y1="11.239"
          y2="5.616"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#4E6AFF" />
          <Stop offset="1" stopColor="#77BAAD" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

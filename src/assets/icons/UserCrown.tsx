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
    <Svg
      fill="none"
      viewBox="0 0 16 16"
      width={props.size}
      height={props.size}
      style={props.style}>
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.00016 3.16602C6.80355 3.16602 5.8335 4.13607 5.8335 5.33268C5.8335 6.5293 6.80355 7.49935 8.00016 7.49935C9.19678 7.49935 10.1668 6.5293 10.1668 5.33268C10.1668 4.13607 9.19678 3.16602 8.00016 3.16602ZM4.8335 5.33268C4.8335 3.58378 6.25126 2.16602 8.00016 2.16602C9.74906 2.16602 11.1668 3.58378 11.1668 5.33268C11.1668 7.08158 9.74906 8.49935 8.00016 8.49935C6.25126 8.49935 4.8335 7.08158 4.8335 5.33268Z"
        fill="url(#paint0_linear_1593_9467)"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.00016 8.5C5.69898 8.5 3.8335 10.3655 3.8335 12.6667V13.3333C3.8335 13.6095 3.60964 13.8333 3.3335 13.8333C3.05735 13.8333 2.8335 13.6095 2.8335 13.3333V12.6667C2.8335 9.8132 5.14669 7.5 8.00016 7.5C8.79167 7.5 9.54292 7.67832 10.2147 7.99746C10.4641 8.11595 10.5703 8.4142 10.4518 8.66363C10.3333 8.91306 10.035 9.01921 9.78562 8.90072C9.24507 8.64393 8.64012 8.5 8.00016 8.5Z"
        fill="url(#paint1_linear_1593_9467)"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.70525 10.2621C7.55252 10.3736 7.47573 10.5617 7.50682 10.7482L8.17348 14.7482C8.21367 14.9893 8.42226 15.166 8.66668 15.166H14C14.2444 15.166 14.453 14.9893 14.4932 14.7482L15.1599 10.7482C15.191 10.5617 15.1142 10.3736 14.9614 10.2621C14.8087 10.1507 14.6062 10.1349 14.438 10.2214L12.461 11.2381L11.7175 10.3459C11.6225 10.2319 11.4817 10.166 11.3333 10.166C11.185 10.166 11.0442 10.2319 10.9492 10.3459L10.2057 11.2381L8.22869 10.2214C8.06054 10.1349 7.85799 10.1507 7.70525 10.2621ZM8.65693 11.5661L10.1047 12.3107C10.3129 12.4178 10.5676 12.366 10.7175 12.1861L11.3333 11.447L11.9492 12.1861C12.0991 12.366 12.3538 12.4178 12.562 12.3107L14.0098 11.5661L13.5764 14.166H9.09024L8.65693 11.5661Z"
        fill="url(#paint2_linear_1593_9467)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_1593_9467"
          x1="4.8335"
          y1="8.49935"
          x2="11.6154"
          y2="3.17242"
          gradientUnits="userSpaceOnUse">
          <Stop Stop-color="#4E6AFF" />
          <Stop offset="1" Stop-color="#77BAAD" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_1593_9467"
          x1="2.8335"
          y1="13.8333"
          x2="9.8052"
          y2="7.20435"
          gradientUnits="userSpaceOnUse">
          <Stop Stop-color="#4E6AFF" />
          <Stop offset="1" Stop-color="#77BAAD" />
        </LinearGradient>
        <LinearGradient
          id="paint2_linear_1593_9467"
          x1="15.1667"
          y1="10.166"
          x2="11.6537"
          y2="17.0238"
          gradientUnits="userSpaceOnUse">
          <Stop Stop-color="#4E6AFF" />
          <Stop offset="1" Stop-color="#77BAAD" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

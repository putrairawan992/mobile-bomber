import * as React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';

interface Props {
  color?: string;
  size: number;
  focused?: boolean;
  style?: any;
}

export const Checklist = (props: Props) => {
  return (
    <Svg
      fill="none"
      viewBox="0 0 12 13"
      width={props.size}
      height={props.size}
      style={props.style}>
      <Rect width="11" height="11" x="0.5" y="0.998" fill="#0A824C" rx="2.5" />
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M8.805 4.207a.75.75 0 010 1.01L5.47 8.79a.636.636 0 01-.942 0L3.195 7.36a.75.75 0 010-1.01.636.636 0 01.943 0L5 7.274l2.862-3.067a.636.636 0 01.943 0z"
        clipRule="evenodd"
      />
      <Rect
        width="11"
        height="11"
        x="0.5"
        y="0.998"
        stroke="#0A824C"
        rx="2.5"
      />
    </Svg>
  );
};

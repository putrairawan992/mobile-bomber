import * as React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';

interface Props {
  size: number;
}

export const MapBorder = (props: Props) => {
  return (
    <Svg width={props.size} height={props.size} viewBox="0 0 36 37" fill="none">
      <Rect x="0.5" y="1" width="35" height="35" rx="17.5" stroke="#FCFCFC" />
      <Path
        fill="#ffffff"
        fillRule="evenodd"
        d="M24.6442 10.6264C25.3727 10.3836 26.125 10.9258 26.125 11.6937L26.125 23.973C26.125 24.4572 25.8151 24.8871 25.3558 25.0402L20.6976 26.5929C20.5694 26.6357 20.4306 26.6357 20.3024 26.5929L15.5 24.9921L11.3558 26.3736C10.6273 26.6164 9.875 26.0742 9.875 25.3063L9.875 13.027C9.875 12.5428 10.1849 12.1129 10.6442 11.9598L15.3024 10.4071C15.4306 10.3643 15.5694 10.3643 15.6976 10.4071L20.5 12.0079L24.6442 10.6264ZM19.875 13.1171L16.125 11.8671L16.125 23.8829L19.875 25.1329L19.875 13.1171ZM21.125 25.1329L21.125 13.1171L24.875 11.8671L24.875 23.8829L21.125 25.1329ZM14.875 23.8829L14.875 11.8671L11.125 13.1171L11.125 25.1329L14.875 23.8829Z"
        clipRule="evenodd"
      />
    </Svg>
  );
};
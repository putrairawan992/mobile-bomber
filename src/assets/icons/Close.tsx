import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  color: string;
  size: number;
  focused?: boolean;
}

export const Close = (props: Props) => {
  return (
    <Svg fill="none" viewBox="0 0 20 21" width={props.size} height={props.size}>
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.18923 5.68919C5.4333 5.44511 5.82903 5.44511 6.07311 5.68919L10 9.61612L13.927 5.68919C14.171 5.44511 14.5668 5.44511 14.8108 5.68919C15.0549 5.93327 15.0549 6.329 14.8108 6.57307L10.8839 10.5L14.8108 14.4269C15.0549 14.671 15.0549 15.0667 14.8108 15.3108C14.5668 15.5549 14.171 15.5549 13.927 15.3108L10 11.3839L6.07311 15.3108C5.82903 15.5549 5.4333 15.5549 5.18923 15.3108C4.94515 15.0667 4.94515 14.671 5.18923 14.4269L9.11615 10.5L5.18923 6.57307C4.94515 6.329 4.94515 5.93327 5.18923 5.68919Z"
        fill={props.color}
      />
    </Svg>
  );
};

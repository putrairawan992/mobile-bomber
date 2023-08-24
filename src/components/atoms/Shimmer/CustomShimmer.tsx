import * as React from 'react';

import {ViewStyle} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

interface CustomShimmer {
  height: number;
  width: number;
  style?: ViewStyle;
}

const CustomShimmer = ({height, width, style}: CustomShimmer) => {
  return (
    <ShimmerPlaceHolder
      LinearGradient={LinearGradient}
      // eslint-disable-next-line no-sparse-arrays
      style={[
        // eslint-disable-next-line react-native/no-inline-styles
        {
          opacity: 0.2,
          height,
          width,
        },
        style,
        ,
      ]}
    />
  );
};

export default CustomShimmer;

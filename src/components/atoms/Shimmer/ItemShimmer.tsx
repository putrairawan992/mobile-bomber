import * as React from 'react';

import {ViewStyle} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import {Section} from '../Section';

interface ItemShimmerProps {
  row: number;
  height: number;
  width: number | string;
  style?: ViewStyle;
  isVertical?: boolean;
}

const ItemShimmer = ({
  height,
  width,
  style,
  row = 1,
  isVertical = true,
}: ItemShimmerProps) => {
  return (
    <Section isRow={!isVertical}>
      {[...Array(row).keys()].map(item => (
        <ShimmerPlaceHolder
          key={item}
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
      ))}
    </Section>
  );
};

export default ItemShimmer;

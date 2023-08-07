import React from 'react';
import Svg, {Path} from 'react-native-svg';
import Animated from 'react-native-reanimated';
// import { View } from 'react-native';

const AnimatedPath = Animated.createAnimatedComponent(Path);

Animated.addWhitelistedNativeProps({
  stroke: true,
});

const MessageSVG = ({color}) => {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20">
      <AnimatedPath
        d="M19.9971 0.981708L9.97406 11.0048C9.87712 11.1017 9.75858 11.1639 9.63393 11.1913C10.2349 13.8098 12.5523 22.9507 14.8089 19.0415C16.8092 15.576 20.1109 4.44359 19.9971 0.981708Z"
        fill={color}
      />
      <AnimatedPath
        d="M8.80841 10.366C6.18956 9.76492 -2.95054 7.44767 0.958518 5.19111C4.42383 3.19085 15.5555 -0.110593 19.0179 0.00284834L8.99499 10.0257C8.89801 10.1227 8.83581 10.2413 8.80841 10.366Z"
        fill={color}
      />
    </Svg>
  );
};
export default MessageSVG;

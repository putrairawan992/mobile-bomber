/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';

interface GradientTextProps {
  colors: string[];
  [x: string]: any;
  xAxis?: number;
}

const GradientText = ({colors, xAxis, ...rest}: GradientTextProps) => {
  return (
    <MaskedView maskElement={<Text {...rest} />}>
      <LinearGradient
        colors={colors}
        start={{x: 1, y: 0}}
        end={{x: xAxis ?? 0.5, y: 0}}>
        <Text {...rest} style={[rest.style, {opacity: 0}]} />
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;
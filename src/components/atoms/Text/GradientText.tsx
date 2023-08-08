/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';

interface GradientTextProps {
  colors: string[];
  [x: string]: any;
  xAxis?: number;
  width?: number;
}

const GradientText = ({colors, xAxis, width, ...rest}: GradientTextProps) => {
  return (
    <MaskedView maskElement={<Text {...rest} />}>
      <LinearGradient
        colors={colors}
        start={{x: 0.0, y: 1.0}}
        end={{x: xAxis ?? 1.0, y: 1.0}}
        style={{width: width ?? '100%'}}>
        <Text {...rest} style={[rest.style, {opacity: 0}]} />
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;

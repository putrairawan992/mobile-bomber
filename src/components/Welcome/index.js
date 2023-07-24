/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from 'react';
import {Image} from 'react-native';
import {Text} from '../Text';
import styles from './Styles/index';

function Welcome(props) {
  return (
    <>
      <Text label={props.heading} />
      {/* <Text style={styles.welcomeScreenHeading}>{props.heading}</Text>
      <Text style={styles.welcomeScreenPeregraph}>{props.peregraph}</Text>
      <Image
        source={props.image}
        resizeMode="contain"
        style={[styles.welcomeScreenImages, props.welcomeSlideImgStyle]}
      /> */}
    </>
  );
}

export default Welcome;

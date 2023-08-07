import * as React from 'react';
import Text from '../../atoms';

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

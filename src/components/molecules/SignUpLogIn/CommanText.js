import * as React from 'react';
import {Text} from 'react-native';
import styles from './Styles/index';

function CommanText(props) {
  return (
    <>
      <Text style={[styles.commanText, props.commanTextstyle]}>
        {props.commanText}
      </Text>
    </>
  );
}

export default CommanText;

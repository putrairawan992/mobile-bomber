/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from 'react';
import {Text, Image, TouchableOpacity} from 'react-native';
import {Colors} from '../../theme';
import styles from './Styles/index';

function GoogleFaceBookBtn(props) {
  return (
    <>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingVertical: 12,
          backgroundColor: Colors.gray,
          borderRadius: 12,
          paddingHorizontal: 18,
        }}>
        <Image
          source={props.btnImage}
          resizeMode="contain"
          style={props.googleImg ? styles.googleImg : styles.facebookImg}
        />
        <Text style={[styles.commanText, styles.googleFaceBookBtnText]}>
          {props.btnText}
        </Text>
      </TouchableOpacity>
    </>
  );
}

export default GoogleFaceBookBtn;

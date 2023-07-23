/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import { Images } from '../../theme';
import styles from './Styles';

function HeaderRight({
  onProfilePress,
  userImage,
  filterBtn,
  onFilterBtnPress,
  clearText,
  onclearTextPress
}: any) {
  return (
    <>
      {/* // <View style={[styles.right, style]}>
    //   <Text numberOfLines={1} style={styles.txtChildren}>
    //     {children}
    //   </Text>
    //   <Text numberOfLines={1} style={styles.textSubChild}>
    //     of 4
    //   </Text>
    // </View> */}
      {userImage && (
        <TouchableOpacity
          style={styles.userRightImageBtn}
          onPress={() => {
            if (onProfilePress) {
              onProfilePress();
            }
          }}
        >
          <Image
            source={Images.UserImage}
            resizeMode="contain"
            style={styles.userRightImage}
          />
        </TouchableOpacity>
      )}
      {filterBtn && (
        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => {
            if (onFilterBtnPress) {
              onFilterBtnPress();
            }
          }}
        >
          <Image
            source={Images.FilterIcon}
            resizeMode="contain"
            style={styles.filterBtnIcon}
          />
        </TouchableOpacity>
      )}
      {clearText && (
        <TouchableOpacity
          style={styles.clearTextBtn}
          onPress={() => {
            if (onclearTextPress) {
              onclearTextPress();
            }
          }}
        >
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      )}
    </>
  );
}

export default HeaderRight;

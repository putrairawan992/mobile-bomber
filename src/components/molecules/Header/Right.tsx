/* eslint-disable react-native/no-inline-styles */
import {Notification} from 'iconsax-react-native';
import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {Pin} from '../../../assets/icons';
import {useAppSelector} from '../../../hooks/hooks';
import {Images} from '../../../theme';
import useTheme from '../../../theme/useTheme';
import {Text} from '../../atoms';
import styles from './Styles';

function HeaderRight({
  hasLocation,
  onProfilePress,
  userImage,
  filterBtn,
  onFilterBtnPress,
  clearText,
  onclearTextPress,
  onLocationPress,
  hasNotification,
  onNotificationPress,
  rightCustomComponent,
  onRightCustomComponentPress,
}: any) {
  const theme = useTheme();
  const {userLocation} = useAppSelector(state => state.user);
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
      {hasLocation && (
        <TouchableOpacity
          style={[
            styles.userRightImageBtn,
            {
              flexDirection: 'row',
              alignItems: 'center',
            },
          ]}
          onPress={() => {
            if (onLocationPress) {
              onLocationPress();
            }
          }}>
          <Pin color={theme?.colors.ICON} size={16} style={{marginRight: 4}} />
          <Text
            label={
              userLocation.address
                ? `${userLocation.city}, ${userLocation.country}`
                : 'Unknown'
            }
          />
          {hasNotification && (
            <TouchableOpacity
              onPress={() => {
                if (onNotificationPress) {
                  onNotificationPress();
                }
              }}>
              <Notification
                size={16}
                color={theme?.colors.ICON}
                style={{marginLeft: 12, top: 2}}
              />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      )}
      {userImage && (
        <TouchableOpacity
          style={[
            styles.userRightImageBtn,
            {
              flexDirection: 'row',
              alignItems: 'center',
            },
          ]}
          onPress={() => {
            if (onProfilePress) {
              onProfilePress();
            }
          }}>
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
          }}>
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
          }}>
          <Text label="Clear" />
        </TouchableOpacity>
      )}
      {!!rightCustomComponent && (
        <TouchableOpacity
          style={{position: 'absolute', right: 16, top: 16}}
          onPress={() => {
            if (onRightCustomComponentPress) {
              onRightCustomComponentPress();
            }
          }}>
          {rightCustomComponent}
        </TouchableOpacity>
      )}
    </>
  );
}

export default HeaderRight;

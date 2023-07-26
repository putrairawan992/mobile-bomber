/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import styles from './Styles';
import HeaderLeftLoaction from './LeftLocation';
import HeaderRight from './Right';
import HeaderLeft from './Left';
import {useNavigation} from '@react-navigation/native';
import useTheme from '../../../theme/useTheme';
import {Text} from '../../atoms';
import {Images} from '../../../theme';

function Header({
  style,
  children,
  transparent,
  hasBackBtn,
  hasLocation,
  title,
  titleStyle,
  onBackPress,
  onLocationPress,
  onProfilePress,
  clearText,
  onclearTextPress,
  filterBtn,
  onFilterBtnPress,
}: any) {
  const theme = useTheme();
  const navigation = useNavigation();
  return (
    <View style={[styles.header, style, transparent && styles.transparent]}>
      {hasBackBtn && (
        <HeaderLeft>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={Images.LeftArrowBlack}
              style={styles.leftArrow}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </HeaderLeft>
      )}

      {hasLocation && (
        <HeaderLeftLoaction
          onLocationPress={() => {
            if (onLocationPress) {
              onLocationPress();
            }
          }}
        />
      )}

      {/* {userIcon && (
          <UserLeft>
            <View style={styles.userIcon}>
              <TouchableOpacity>
                <Image
                  source={Images.coin}
                  style={styles.userIconImg}
                  // resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </UserLeft>
        )} */}

      {title && (
        <Text
          variant="large"
          fontWeight="bold"
          label={title}
          color={theme?.colors.TEXT_PRIMARY}
          style={[
            {
              paddingHorizontal: 10,
              marginLeft: 'auto',
              marginRight: 'auto',
            },
            titleStyle,
          ]}
        />
      )}
      {/* {centerLogo && (
          <TitleLogo>
            <Image
              source={Images.efftTitleWhite}
              style={styles.flaseTitle}
              resizeMode="contain"
            />
          </TitleLogo>
        )} */}
      {children && (
        <HeaderRight
          userImage
          onProfilePress={() => {
            if (onProfilePress) {
              onProfilePress();
            }
          }}>
          {/* {children} */}
        </HeaderRight>
      )}
      {clearText && (
        <HeaderRight
          clearText
          onFilterBtnPress={() => {
            if (onclearTextPress) {
              onclearTextPress();
            }
          }}
        />
      )}
      {filterBtn && (
        <HeaderRight
          filterBtn
          onFilterBtnPress={() => {
            if (onFilterBtnPress) {
              onFilterBtnPress();
            }
          }}
        />
      )}
    </View>
  );
}

export default Header;

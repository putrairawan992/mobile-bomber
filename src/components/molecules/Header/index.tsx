/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {CSSProperties} from 'react';
import {View, Image, TouchableOpacity, TextStyle} from 'react-native';
import styles from './Styles';
import HeaderLeftLoaction from './LeftLocation';
import HeaderRight from './Right';
import HeaderLeft from './Left';
import {useNavigation} from '@react-navigation/native';
import useTheme from '../../../theme/useTheme';
import {Text} from '../../atoms';
import {Images} from '../../../theme';
import {Logo, LogoText} from '../../../assets/icons';
import {ArrowLeft} from 'iconsax-react-native';

interface HeaderPropsI {
  style?: CSSProperties;
  children?: boolean;
  transparent?: boolean;
  hasBackBtn?: boolean;
  hasLocation?: boolean;
  title?: string;
  titleStyle?: TextStyle;
  onBackPress?: () => void;
  onLocationPress?: () => void;
  onProfilePress?: () => void;
  clearText?: boolean;
  onclearTextPress?: () => void;
  filterBtn?: boolean;
  onFilterBtnPress?: () => void;
  hasNotification?: boolean;
  onNotificationPress?: () => void;
  rightCustomComponent?: JSX.Element;
  onRightCustomComponentPress?: () => void;
  hasLogo?: boolean;
}

function Header({
  style,
  children,
  transparent,
  hasBackBtn,
  hasLocation,
  title,
  onBackPress,
  onLocationPress,
  onProfilePress,
  clearText,
  onclearTextPress,
  filterBtn,
  onFilterBtnPress,
  hasLogo,
  onNotificationPress,
  titleStyle,
  rightCustomComponent,
  onRightCustomComponentPress,
}: HeaderPropsI) {
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
            <ArrowLeft size={24} color={theme?.colors.ICON} />
          </TouchableOpacity>
        </HeaderLeft>
      )}

      {hasLogo && (
        <HeaderLeft>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Logo size={23} style={{marginRight: 4}} />
            <LogoText />
          </View>
        </HeaderLeft>
      )}

      {/* {hasLocation && (
        <HeaderLeftLoaction
          onLocationPress={() => {
            if (onLocationPress) {
              onLocationPress();
            }
          }}
        />
      )} */}

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
          color={theme?.colors.WARNING}
          style={[
            {
              paddingHorizontal: 10,
              marginLeft: 'auto',
              marginRight: 'auto',
              ...titleStyle,
            },
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
      {hasLocation && (
        <HeaderRight
          hasLocation
          hasNotification
          rightCustomComponent={rightCustomComponent}
          onRightCustomComponentPress={() => {
            if (onRightCustomComponentPress) {
              onRightCustomComponentPress();
            }
          }}
          onLocationPress={() => {
            if (onLocationPress) {
              onLocationPress();
            }
          }}
          onNotificationPress={() => {
            if (onNotificationPress) {
              onNotificationPress();
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

      {!!rightCustomComponent && (
        <HeaderRight
          rightCustomComponent={rightCustomComponent}
          onRightCustomComponentPress={() => {
            if (onRightCustomComponentPress) {
              onRightCustomComponentPress();
            }
          }}>
          {/* {children} */}
        </HeaderRight>
      )}
    </View>
  );
}

export default Header;

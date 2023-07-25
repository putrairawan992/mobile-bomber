import React from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
// import { colors } from '../../theme';
import Colors from '../../theme/Color';
import useTheme from '../../theme/useTheme';
import styles from './Styles';

export default class Container extends React.Component {
  render() {
    const {
      children,
      transparentStatusBar,
      statusBarColor,
      lightContent,
      safeAreaView,
      safeAreaViewHeader,
      conatinerStyle,
    } = this.props;
    const style = {
      flex: 0,
      alignItems: 'center',
      backgroundColor: !transparentStatusBar
        ? statusBarColor || Colors.lighterGray
        : Colors.transparent,
    };
    return (
      <>
        <StatusBar
          backgroundColor={'#1E1E1E'}
          //   statusBarColor ?? lightContent
          //     ? Colors.darkGray
          //     : Colors.lighterGray
          // }
          // barStyle={lightContent ? 'light-content' : 'dark-content'}
          barStyle={'light-content'}
        />
        {safeAreaView !== false && <SafeAreaView style={style} />}
        {safeAreaView !== false && safeAreaViewHeader !== false && (
          <SafeAreaView style={[styles.safeViewcontainer, conatinerStyle]}>
            {children}
          </SafeAreaView>
        )}
        {(safeAreaView === false || safeAreaViewHeader === false) && (
          <View
            style={[
              styles.container,
              safeAreaViewHeader === false && styles.statusBarMarginTop,
            ]}>
            {children}
          </View>
        )}
      </>
    );
  }
}

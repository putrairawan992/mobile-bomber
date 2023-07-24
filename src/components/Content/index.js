/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import {Keyboard} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './Styles';

class Content extends React.Component {
  keyboardWillShowSub;

  keyboardWillHideSub;

  rootRef;

  scrollviewRef;

  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
    };
  }

  componentDidMount = () => {
    this.keyboardWillShowSub = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardWillShow,
    );
    this.keyboardWillHideSub = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardWillHide,
    );
  };

  componentWillUnmount = () => {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  };

  keyboardWillShow = () => {
    this.setState({isVisible: false});
  };

  keyboardWillHide = () => {
    this.setState({isVisible: true});
  };

  getStyle = () => {
    const {style} = this.props;
    const tmpStyle = [styles.content];
    if (style) {
      tmpStyle.push(style);
    }
    return tmpStyle;
  };

  getContentContainerStyle = () => {
    const {contentContainerStyle, hasHeader} = this.props;
    const style = [styles.contentContainerStyle];
    if (contentContainerStyle) {
      style.push(contentContainerStyle);
    }
    if (hasHeader === false) {
      style.push({paddingTop: 0});
    }
    return style;
  };

  render = () => {
    const {
      children,
      extraScrollHeight,
      showsVerticalScrollIndicator,
      disableKBDismissScroll,
      keyboardShouldPersistTaps,
      scrollEnabled,
      isBottomSheet,
    } = this.props;

    const style = this.getStyle();
    const contentContainerStyle = this.getContentContainerStyle();
    const ScrollComponent = isBottomSheet
      ? ScrollView
      : KeyboardAwareScrollView;
    return (
      <ScrollComponent
        enableResetScrollToCoords
        scrollEnabled={scrollEnabled}
        bounces={false}
        automaticallyAdjustContentInsets={false}
        resetScrollToCoords={disableKBDismissScroll ? undefined : {x: 0, y: 0}}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps || 'handled'}
        ref={c => {
          this.scrollviewRef = c;
          this.rootRef = c;
        }}
        style={style}
        contentContainerStyle={contentContainerStyle}
        extraScrollHeight={extraScrollHeight || 81}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator || false}>
        {children}
      </ScrollComponent>
    );
  };
}

export default Content;

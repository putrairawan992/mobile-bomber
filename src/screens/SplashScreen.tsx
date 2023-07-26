/* eslint-disable react-native/no-inline-styles */
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {LogoLabel} from '../assets/icons/LogoLabel';
import {Container} from '../components/atoms';
import useTheme from '../theme/useTheme';

export const SplashScreen = () => {
  const navigation = useNavigation<any>();
  const theme = useTheme();
  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
        navigation.navigate('SignUp');
      }, 2000);
    }, [navigation]),
  );

  return (
    <Container>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme?.colors.BACKGROUND1,
        }}>
        <LogoLabel size={228} color={theme?.colors.PRIMARY} />
      </View>
    </Container>
  );
};

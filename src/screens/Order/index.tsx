import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParams} from '../../navigation/MainScreenStack';
import {useFocusEffect} from '@react-navigation/native';

type Props = NativeStackScreenProps<MainStackParams, 'Order', 'MyStack'>;

const Order = ({navigation}: Props) => {
  useFocusEffect(
    React.useCallback(() => {
      navigation.navigate('Nightlife', {isOrder: true});
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );
  return '';
};

export default Order;

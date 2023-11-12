import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParams} from '../../navigation/MainScreenStack';
import {useFocusEffect} from '@react-navigation/native';
import {NightlifeService} from '../../service/NightlifeService';

type Props = NativeStackScreenProps<MainStackParams, 'Order', 'MyStack'>;

const Order = ({navigation}: Props) => {
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await NightlifeService.getInvitedOrder()
        .then(response => {
          console.log('response: ' + response);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {});
    } catch (error: any) {
      console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      navigation.navigate('Nightlife', {isOrder: true});
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigation]),
  );

  return '';
};

export default Order;

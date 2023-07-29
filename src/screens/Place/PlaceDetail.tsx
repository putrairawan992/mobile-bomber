import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Layout} from '../../components/atoms';
import {Header} from '../../components/molecules';
import {NightlifeStackParams} from '../../navigation/MainScreenStack';
import styles from './Styles';

type Props = NativeStackScreenProps<
  NightlifeStackParams,
  'PlaceDetail',
  'MyStack'
>;

export const PlaceDetail = ({route}: Props) => {
  console.log('route :', route);
  return (
    <Layout contentContainerStyle={styles.container}>
      <Header transparent hasBackBtn />
    </Layout>
  );
};

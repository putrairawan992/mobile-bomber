import React, {createRef, useState} from 'react';
import {Layout, Spacer} from '../../components/atoms';
import {Header} from '../../components/molecules';
import styles from '../Styles';
import PagerView from 'react-native-pager-view';
import {TouchableOpacity, View} from 'react-native';
import DefaultText from '../../components/atoms/Text/DefaultText';
import Ticket from './Ticket';
import Order from './Order';
import Friends from './Friends';
import Request from './Request';

export default function MyBookingDetail() {
  const [menu] = useState<string[]>([
    'Ticket',
    'F&B Order',
    'Friends',
    'Request',
  ]);
  const [initialPage, setInitialPage] = useState<number>(0);
  const ref = createRef<PagerView>();

  return (
    <Layout contentContainerStyle={styles.container}>
      <Header transparent title="Booking Detail" hasBackBtn />
      <Spacer height={10} />
      <View className="flex-row">
        {menu.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => ref.current?.setPage(index)}
              activeOpacity={0.7}
              key={item}
              className={`flex-1 py-3 border-b-[2px] ${
                index === initialPage ? 'border-b-secondary' : 'border-b-white'
              }`}>
              <DefaultText
                title={item}
                titleClassName={`text-center font-inter-medium ${
                  index === initialPage ? 'text-secondary' : 'text-white'
                }`}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      <PagerView
        className="flex-1"
        initialPage={initialPage}
        ref={ref}
        onPageSelected={e => setInitialPage(e.nativeEvent.position)}>
        <View key="1">
          <Ticket />
        </View>
        <View key="2">
          <Order />
        </View>
        <View key="3">
          <Friends />
        </View>
        <View key="4">
          <Request />
        </View>
      </PagerView>
    </Layout>
  );
}

/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {createRef, useState} from 'react';
import {View} from 'react-native';
import PagerView from 'react-native-pager-view';
import {Gap, Layout, Section} from '../../components/atoms';
import {Header, TabMenu} from '../../components/molecules';
import {WIDTH} from '../../utils/config';
import NotificationApps from './NotificationApps';
import NotificationBill from './NotificationBill';
import NotificationFriends from './NotificationFriends';
import NotificationInvitation from './NotificationInvitation';
import styles from './Styles';

// type Props = NativeStackScreenProps<MainStackParams, 'Saved', 'MyStack'>;

function NotificationScreen() {
  const [menu] = useState<string[]>(['Apps', 'Invitation', 'Bill', 'Friends']);
  const [initialPage, setInitialPage] = useState<number>(0);
  const ref = createRef<PagerView>();
  return (
    <Layout contentContainerStyle={styles.container}>
      <Header transparent hasBackBtn title="Notification" />
      <Gap height={24} />
      <Section isRow isCenter>
        {menu.map((item, index) => {
          const isSelected = index === initialPage;
          return (
            <TabMenu
              onPress={idx => ref.current?.setPage(idx)}
              isSelected={isSelected}
              width={WIDTH / menu.length}
              item={item}
              index={index}
            />
          );
        })}
      </Section>
      <Gap height={30} />
      <Section style={{flex: 1}} padding="0px 16px">
        <PagerView
          style={styles.container}
          initialPage={initialPage}
          ref={ref}
          onPageSelected={e => setInitialPage(e.nativeEvent.position)}>
          <View key="1">
            <NotificationApps />
          </View>
          <View key="2">
            <NotificationInvitation />
          </View>
          <View key="3">
            <NotificationBill />
          </View>
          <View key="4">
            <NotificationFriends />
          </View>
        </PagerView>
      </Section>
    </Layout>
  );
}

export default NotificationScreen;

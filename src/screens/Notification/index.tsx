/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {createRef, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import PagerView from 'react-native-pager-view';
import {Gap, Layout, Section, Text} from '../../components/atoms';
import {Header} from '../../components/molecules';
import useTheme from '../../theme/useTheme';
import {WIDTH} from '../../utils/config';
import NotificationApps from './NotificationApps';
import styles from './Styles';

// type Props = NativeStackScreenProps<MainStackParams, 'Saved', 'MyStack'>;

function NotificationScreen() {
  const [menu] = useState<string[]>(['Apps', 'Invitation', 'Bill', 'Friends']);
  const [initialPage, setInitialPage] = useState<number>(0);
  const theme = useTheme();
  const ref = createRef<PagerView>();
  return (
    <Layout contentContainerStyle={styles.container}>
      <Header transparent hasBackBtn title="Notification" />
      <Gap height={24} />
      <Section isRow isCenter>
        {menu.map((item, index) => {
          const isSelected = index === initialPage;
          return (
            <TouchableOpacity
              onPress={() => ref.current?.setPage(index)}
              activeOpacity={0.7}
              key={item}
              style={{
                width: WIDTH / menu.length,
                paddingHorizontal: 12,
                borderBottomWidth: 2,
                borderBottomColor: isSelected
                  ? theme?.colors.PRIMARY
                  : theme?.colors.TEXT_PRIMARY,
              }}>
              <Text
                label={item}
                color={
                  isSelected
                    ? theme?.colors.PRIMARY
                    : theme?.colors.TEXT_PRIMARY
                }
                textAlign="center"
              />
              <Gap height={12} />
            </TouchableOpacity>
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
            <NotificationApps />
          </View>
          <View key="3">
            <NotificationApps />
          </View>
          <View key="4">
            <NotificationApps />
          </View>
        </PagerView>
      </Section>
    </Layout>
  );
}

export default NotificationScreen;

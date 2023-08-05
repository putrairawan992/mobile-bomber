import React, {createRef, useState} from 'react';
import {Layout, Spacer} from '../../components/atoms';
import {Header} from '../../components/molecules';
import styles from '../Styles';
import PagerView from 'react-native-pager-view';
import {FlatList, TouchableOpacity, View} from 'react-native';
import DefaultText from '../../components/atoms/Text/DefaultText';
import Paid from './Paid';
import Unpaid from './Unpaid';
import Canceled from './Canceled';
import Finished from './Finished';
import LinearGradient from 'react-native-linear-gradient';

export default function EventScreen() {
  const [menu] = useState<string[]>(['Paid', 'Unpaid', 'Canceled', 'Finished']);
  const [theme] = useState<string[]>([
    'Table Booking',
    'Walk in',
    'Group Walk in',
    'Auction',
  ]);
  const [activeTheme, setActiveTheme] = useState<string>('Table Booking');
  const [initialPage, setInitialPage] = useState<number>(0);
  const ref = createRef<PagerView>();

  return (
    <Layout contentContainerStyle={styles.container}>
      <Header
        transparent
        title="My Booking"
        titleStyle={styles.eventHeaderTitle}
      />
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

      <Spacer height={15} />
      <View>
        <FlatList
          horizontal={true}
          data={theme}
          keyExtractor={(_, key) => key.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setActiveTheme(item)}>
                {item === activeTheme ? (
                  <LinearGradient
                    className="rounded-lg p-2 mx-2"
                    colors={['#AA5AFA', '#C111D5']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <DefaultText title={item} />
                  </LinearGradient>
                ) : (
                  <View className="border-[1px] border-white rounded-lg p-2 mx-2">
                    <DefaultText title={item} />
                  </View>
                )}
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={styles.eventThemeContainer}
        />
      </View>

      <PagerView
        className="flex-1"
        initialPage={initialPage}
        ref={ref}
        onPageSelected={e => setInitialPage(e.nativeEvent.position)}>
        <View key="1">
          <Paid activeTheme={activeTheme} />
        </View>
        <View key="2">
          <Unpaid activeTheme={activeTheme} />
        </View>
        <View key="3">
          <Canceled activeTheme={activeTheme} />
        </View>
        <View key="4">
          <Finished activeTheme={activeTheme} />
        </View>
      </PagerView>
    </Layout>
  );
}

/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Layout, Spacer} from '../../components/atoms';
import {Header} from '../../components/molecules';
import styles from '../Styles';
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import DefaultText from '../../components/atoms/Text/DefaultText';
import Paid from './Paid';
import Unpaid from './Unpaid';
import Canceled from './Canceled';
import Finished from './Finished';
import LinearGradient from 'react-native-linear-gradient';
import {MyEventService} from '../../service/MyEventService';
import {BookingInterface} from '../../interfaces/BookingInterface';
import {MainStackParams} from '../../navigation/MainScreenStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import useTheme from '../../theme/useTheme';
import {useAppSelector} from '../../hooks/hooks';
import {useFocusEffect} from '@react-navigation/native';
import {TabView, SceneMap} from 'react-native-tab-view';
import {WINDOW_WIDTH} from '@gorhom/bottom-sheet';

type Props = NativeStackScreenProps<MainStackParams, 'Event', 'MyStack'>;

export default function EventScreen({navigation}: Props) {
  const {user} = useAppSelector(state => state.user);
  const [menu] = useState<string[]>([
    'Booking Table',
    'Walk In Ticket',
    'Direct Order',
  ]);
  const [theme] = useState<string[]>([
    'Paid',
    'Unpaid',
    'Finished',
    'Canceled',
    // 'Group Walk in',
    // 'Auction',
  ]);
  const [activeTheme, setActiveTheme] = useState<string>('Paid');
  const [status, setStatus] = useState<any>('Booking Table');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataEvents, setDataEvents] = useState<BookingInterface[]>([]);
  const themes = useTheme();
  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    {key: 'booking_table', title: 'Booking Table'},
    {key: 'walk_in_ticket', title: 'Walk In Ticket'},
    {key: 'direct_order', title: 'Direct Order'},
  ]);

  useFocusEffect(
    React.useCallback(() => {
      let statuss = 'Booking Table';
      if (index === 1) {
        statuss = 'Walk In';
      }
      if (index === 2) {
        statuss = 'Direct Order';
      }
      !!user && fetchData(statuss);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigation, activeTheme, index]),
  );

  const fetchData = async (statuss: string) => {
    try {
      setIsLoading(true);
      await MyEventService.getEventAllBookingHistory({
        user_id: 'FQ5OvkolZtSBZEMlG1R3gtowbQv1',
        tab: statuss,
        status: activeTheme,
      })
        .then(response => {
          setDataEvents(response?.data);
        })
        .catch(error => {
          console.log(error.response.data.message);
        })
        .finally(() => setIsLoading(false));
    } catch (error: any) {}
  };
  const FirstRoute = () => (
    <>
      <Spacer height={15} />
      <View>
        <FlatList
          horizontal={true}
          className="text-center"
          data={theme}
          onScroll={e => {
            console.log(e);
          }}
          keyExtractor={(_, key) => key.toString()}
          showsHorizontalScrollIndicator={true}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setActiveTheme(item)}>
                {item === activeTheme ? (
                  <LinearGradient
                    className="rounded-xl px-[10px] py-2 mx-2"
                    colors={['#AA5AFA', '#C111D5']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <DefaultText title={item} />
                  </LinearGradient>
                ) : (
                  <View className="border-[1px] border-white rounded-xl px-2 py-[6px] mx-2">
                    <DefaultText title={item} />
                  </View>
                )}
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={styles.eventThemeContainer}
        />
        <Spacer height={12} />
      </View>
      <View className="flex-1">
        {activeTheme === 'Paid' && (
          <View key="1">
            {isLoading ? (
              <ActivityIndicator
                style={{position: 'absolute', top: 150, left: 0, right: 0}}
                size={'large'}
                color={themes?.colors.PRIMARY}
              />
            ) : (
              <Paid
                status={status}
                dataEvents={dataEvents}
                onSelect={handleBookingSelect}
              />
            )}
          </View>
        )}
        <View key="2">
          {activeTheme === 'Unpaid' && (
            <Unpaid
              activeTheme={activeTheme}
              dataEvents={dataEvents}
              onSelect={handleBookingSelect}
            />
          )}
        </View>
        <View key="3">
          {activeTheme === 'Canceled' && (
            <Canceled
              activeTheme={activeTheme}
              dataEvents={dataEvents}
              onSelect={handleBookingSelect}
            />
          )}
        </View>
        <View key="4">
          {activeTheme === 'Finished' && (
            <Finished
              activeTheme={activeTheme}
              dataEvents={dataEvents}
              onSelect={handleBookingSelect}
            />
          )}
        </View>
      </View>
    </>
  );

  const handleBookingSelect = (data: BookingInterface) =>
    navigation.navigate('MyBookingDetail', {
      bookingId: data.bookingId,
      status,
      club_id: data?.club_id,
    });

  const renderTabBar = (e: any) => {
    return (
      <View className="flex-row">
        {menu.map((item, indexs) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setIndex(indexs);
                setStatus(item);
              }}
              activeOpacity={0.7}
              key={item}
              className={`flex-1 py-3 border-b-[2px] ${
                indexs === e.navigationState.index
                  ? 'border-b-primary'
                  : 'border-b-white'
              }`}>
              <DefaultText
                title={item}
                titleClassName={`text-center font-inter-medium ${
                  indexs === e.navigationState.index
                    ? 'text-primary'
                    : 'text-white'
                }`}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderScene = SceneMap({
    booking_table: FirstRoute,
    walk_in_ticket: FirstRoute,
    direct_order: FirstRoute,
  });

  return (
    <Layout contentContainerStyle={styles.container}>
      <Header
        transparent
        title="My Booking"
        titleStyle={styles.eventHeaderTitle}
      />
      <Spacer height={10} />
      <TabView
        lazy
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{width: WINDOW_WIDTH}}
      />
    </Layout>
  );
}

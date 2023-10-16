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
  const [initialPage, setInitialPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataEvents, setDataEvents] = useState<BookingInterface[]>([]);
  const themes = useTheme();

  useFocusEffect(
    React.useCallback(() => {
      !!user && fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigation, status, activeTheme]),
  );

  const convertString = (inputArray: string): string => {
    return inputArray?.replace('Ticket', '').replace(/\s/g, '');
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      await MyEventService.getEventAllBookingHistory({
        user_id: 'FQ5OvkolZtSBZEMlG1R3gtowbQv1',
        tab: convertString(status),
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

  const handleBookingSelect = (data: BookingInterface) =>
    navigation.navigate('MyBookingDetail', {
      bookingId: data.bookingId,
      status,
      club_id: data?.club_id,
    });

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
              onPress={() => {
                setInitialPage(index);
                setStatus(item);
              }}
              activeOpacity={0.7}
              key={item}
              className={`flex-1 py-3 border-b-[2px] ${
                index === initialPage ? 'border-b-primary' : 'border-b-white'
              }`}>
              <DefaultText
                title={item}
                titleClassName={`text-center font-inter-medium ${
                  index === initialPage ? 'text-primary' : 'text-white'
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
          className="text-center"
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
    </Layout>
  );
}

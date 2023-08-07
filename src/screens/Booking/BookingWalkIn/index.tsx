/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  LayoutAnimation,
  Platform,
  TouchableOpacity,
  UIManager,
} from 'react-native';
import {
  Button,
  Gap,
  Layout,
  Section,
  Text,
  TouchableSection,
} from '../../../components/atoms';
import {Header} from '../../../components/molecules';
import {
  EventInterface,
  PlaceEventsInterface,
} from '../../../interfaces/PlaceInterface';
import useTheme from '../../../theme/useTheme';
import {PLACE_EVENTS} from '../../../utils/data';
import {dateFormatter} from '../../../utils/dateFormatter';
import {generateCalendarEvents} from '../../../utils/function';
import {BookingCalendar} from '../BookingCalendar';
import styles from '../../Styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParams} from '../../../navigation/MainScreenStack';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

type Props = NativeStackScreenProps<
  MainStackParams,
  'BookingWalkIn',
  'MyStack'
>;

export const BookingWalkInScreen = ({route, navigation}: Props) => {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedEvent, setSelectedEvent] = useState<EventInterface[]>([]);
  const [isShowCalendar, setIsShowCalendar] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [isShowEvents, setIsShowEvents] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      step === 0 && onShowCalendar(true);
    }, 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const MarkedDate = {
    [selectedDate]: {
      selected: true,
      disableTouchEvent: true,
      selectedColor: '#2C437B',
      selectedTextColor: 'white',
      customStyles: {
        container: {
          borderWidth: 1,
          borderColor: 'red',
        },
      },
    },
  };

  const onShowCalendar = useCallback((isShow: boolean) => {
    LayoutAnimation.configureNext({
      duration: 500,
      update: {
        type: 'easeInEaseOut',
      },
    });
    setIsShowCalendar(isShow);
  }, []);

  const onShowEvents = useCallback((isShow: boolean) => {
    LayoutAnimation.configureNext({
      duration: 300,
      update: {
        type: 'easeInEaseOut',
      },
    });
    setIsShowEvents(isShow);
  }, []);

  const onSelectDate = (day: string) => {
    setSelectedDate(day);
    const events =
      PLACE_EVENTS.find((item: PlaceEventsInterface) => item.date === day)
        ?.events ?? [];
    setSelectedEvent(events);
    if (events.length) {
      onShowEvents(false);
      setTimeout(() => {
        onShowEvents(true);
      }, 200);
    } else {
      onShowEvents(false);
    }
  };

  const onConfirmDate = () => {
    setStep(1);
    onShowCalendar(false);
    // setTimeout(() => {
    //   onShowTable(true);
    // }, 500);
  };

  return (
    <Layout contentContainerStyle={styles.container} isScrollable={false}>
      <Header transparent hasBackBtn title="Walk In" />
      <Section padding="0px 16px" style={{flex: 1}}>
        <Gap height={12} />
        <TouchableSection
          onPress={() => {
            onShowCalendar(!isShowCalendar);
          }}
          padding="12px 16px"
          rounded={4}
          backgroundColor={theme?.colors.SECTION}>
          <Text
            fontWeight="semi-bold"
            label={
              selectedDate && step > 0 && !isShowCalendar
                ? dateFormatter(new Date(selectedDate), 'EEEE, dd MMMM yyy')
                : 'Select Date'
            }
          />
        </TouchableSection>
        {isShowCalendar && (
          <BookingCalendar
            onSelectDate={onSelectDate}
            data={Object.assign(
              MarkedDate,
              generateCalendarEvents(PLACE_EVENTS, selectedDate),
            )}
            isShowEvents={isShowEvents}
            selectedEvent={selectedEvent}
            selectedDate={selectedDate}
            onConfirmDate={onConfirmDate}
          />
        )}
        <Gap height={12} />
      </Section>
      {step === 1 && !!selectedDate ? (
        <Button
          type="primary"
          onPress={() =>
            navigation.navigate('WalkInTicket', {
              placeId: route.params.placeId,
              date: selectedDate,
            })
          }
          title="Book Now"
          noRound
          style={{
            paddingVertical: 16,
          }}
        />
      ) : (
        <TouchableOpacity style={styles.bookingButton}>
          <Text variant="base" fontWeight="bold" label="Book Now" />
        </TouchableOpacity>
      )}
    </Layout>
  );
};

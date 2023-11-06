/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Button,
  EntryAnimation,
  Gap,
  GradientText,
  Layout,
  Loading,
  Spacer,
} from '../../components/atoms';
import {Header, ModalToast} from '../../components/molecules';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import DefaultText from '../../components/atoms/Text/DefaultText';
import CardBookingOrder from '../../components/molecules/Card/CardBookingOrder';
import {navigationRef} from '../../navigation/RootNavigation';
import {Image} from 'react-native';
import {
  IcCalendarPlus,
  IcChevronRight,
  IcDetailBooking,
  IcPeopleThree,
  MusicDjImg,
} from '../../theme/Images';
import QRCode from 'react-native-qrcode-svg';
import LinearGradient from 'react-native-linear-gradient';
import ModalDetailTicket from '../../components/molecules/Modal/ModalDetailTicket';
import ModalInviteFriends from '../../components/molecules/Modal/ModalInviteFriends';
import RNCalendarEvents from 'react-native-calendar-events';
import {FriendshipService} from '../../service/FriendshipService';
import {FriendInterface} from '../../interfaces/UserInterface';
import {useAppSelector} from '../../hooks/hooks';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParams} from '../../navigation/MainScreenStack';
import {dateFormatter} from '../../utils/dateFormatter';
import {currency} from '../../utils/function';
import {MyEventService} from '../../service/MyEventService';
import {BookingDetailInterface} from '../../interfaces/BookingInterface';
import {ModalToastContext} from '../../context/AppModalToastContext';

type Props = NativeStackScreenProps<
  MainStackParams,
  'MyBookingDetail',
  'MyStack'
>;

export default function MyBookingDetail({route, navigation}: Props) {
  const [menu] = useState<string[]>([
    'Ticket',
    'F&B Order',
    'Friends',
    'Request',
  ]);
  const bookingId = route.params.bookingId;
  const clubId = route.params.club_id;
  const [initialPage, setInitialPage] = useState<number>(0);
  const [base64Qr, setBase64Qr] = useState<any>();
  const [showDetailTicket, setShowDetailTicket] = useState<boolean>(false);
  const [showInviteFriends, setShowInviteFriends] = useState<boolean>(false);
  const [content2, setContent2] = useState<number>();
  const [content3, setContent3] = useState<number>();
  const [content4, setContent4] = useState<number>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [friendshipData, setFriendshipData] = useState<FriendInterface[]>([]);
  const [booking, setBooking] = useState<BookingDetailInterface | null>(null);
  const [memberInvited, setMemberInvited] = useState<FriendInterface[]>([]);
  const [selectedInvitation, setSelectedInvitation] = useState<
    FriendInterface[]
  >([]);

  const {
    isShowToast,
    setIsShowToast,
    toastMessage,
    setToastMessage,
    type,
    setType,
  } = useContext(ModalToastContext);

  const {user} = useAppSelector(state => state.user);
  const ref = useRef<ScrollView>(null);

  useEffect(() => {
    fethData();
  }, []);

  const onFriendInvited = (data: FriendInterface) => {
    setShowInviteFriends(false);
    memberInvited.push({...data});
    handleInvite(data);
  };

  const handleInvite = (data: FriendInterface) => {
    let findItem: any = Boolean(
      selectedInvitation.find(
        (el: FriendInterface) => el.customerId === data.customerId,
      ),
    );
    if (!findItem) {
      setSelectedInvitation([...selectedInvitation, data]);
    } else {
      setSelectedInvitation(
        selectedInvitation.filter(
          (el: FriendInterface) => el.customerId !== data.customerId,
        ),
      );
    }
  };

  const onSaveCalendar = () => {
    RNCalendarEvents.requestPermissions()
      .then(() => {
        RNCalendarEvents.saveEvent('Booking Detail - Bomber | Event', {
          calendarId: '1',
          location: 'Taiwan',
          startDate: new Date(booking?.bookingDate as string).toISOString(),
          endDate: new Date(booking?.bookingDate as string).toISOString(),
        })
          .then(() => openToast('success', 'Success save to calendar'))
          .catch(err => console.log('save event error: ', err));
      })
      .catch(err => console.log('err request permission calendar: ', err));
  };

  const fethData = async () => {
    try {
      setIsLoading(true);
      await Promise.all([
        FriendshipService.getFriendship({
          userId: user.id,
        }),
        MyEventService.getBookingDetail({
          booking_id: bookingId,
        }),
        MyEventService.getGenerateQrCode({
          club_id: clubId,
        }),
      ])
        .then(response => {
          setFriendshipData(response[0].data);
          setBooking(response[1].data.bookingDetail[0]);
          setMemberInvited(response[1].data.memberInvited);
          setBase64Qr(response[2]?.data);
        })
        .catch(() => {
          openToast('error', 'Failed get booking detail');
          setTimeout(() => {
            navigation.goBack();
          }, 1000);
        })
        .finally(() => setIsLoading(false));
    } catch (error: any) {
      console.log(error.response);
    }
  };

  const currentSpend =
    booking?.currentSpend === null ? 0 : Number(booking?.currentSpend);
  const spendPercetage =
    !!currentSpend && !!booking?.currentSpend
      ? currentSpend / Number(booking?.currentSpend)
      : 0;

  const openToast = (toastType: 'success' | 'error', message: string) => {
    setIsShowToast(true);
    setType(toastType);
    setToastMessage(message);
  };
  return (
    <Layout contentContainerStyle={styles.parent}>
      <Header transparent title="Booking Detail" hasBackBtn />
      {isLoading && <Loading />}
      <Spacer height={10} />
      <View className="flex-row">
        {menu.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setInitialPage(index);
                ref.current?.scrollTo({
                  y:
                    index === 0
                      ? 0
                      : index === 1
                      ? content2
                      : index === 2
                      ? Number(content2) + Number(content3)
                      : Number(content2) + Number(content3) + Number(content4),
                });
              }}
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

      <ScrollView
        ref={ref}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <View
          className="bg-neutral-800 p-4 rounded-lg mb-[20px]"
          onLayout={e => setContent2(e.nativeEvent.layout.height)}>
          <View className="w-[50] h-[50] bg-screen rounded-full absolute self-center -top-[26]" />
          <View className="flex-row items-center">
            <View className="bg-screen py-2 px-3 rounded-lg">
              <Image
                source={{uri: booking?.clubLogo}}
                className="w-[30] h-[17] self-center"
                resizeMode="contain"
              />
              <Spacer height={2.5} />
              <DefaultText
                title={booking?.clubName}
                titleClassName="font-inter-medium text-xs text-center"
              />
            </View>
            <Spacer className="flex-1" />
            <View className="items-end">
              <DefaultText
                title={route.params.status}
                titleClassName="font-inter-bold text-base text-green-700"
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setShowDetailTicket(true)}>
                <DefaultText
                  title="Detail click here"
                  titleClassName="text-xs text-neutral-500"
                />
              </TouchableOpacity>
            </View>
          </View>
          <Spacer height={10} />
          <DefaultText
            title="Hosted by you"
            titleClassName="text-center text-neutral-400"
          />
          <Spacer height={2.5} />
          <View className="flex-row items-center justify-center">
            <DefaultText
              title={
                booking?.bookingDate
                  ? dateFormatter(
                      new Date(booking.bookingDate),
                      'EEEE, dd MMMM yyy',
                    )
                  : ''
              }
              titleClassName="text-base font-inter-medium mr-3"
            />
            <Image
              source={IcCalendarPlus}
              resizeMode="contain"
              className="w-[20] h-[20]"
            />
          </View>
          <Spacer height={10} />
          <View className="items-center bg-black rounded-lg p-2 w-full">
            <QRCode logo={{uri: base64Qr}} size={300} />
          </View>
          <Spacer height={15} />
          <View className="w-[200] h-[5] bg-white rounded-full self-center">
            {spendPercetage > 0 && (
              <View
                className={`w-[${spendPercetage}%] h-[5] bg-yellow-600 rounded-full"`}
              />
            )}
          </View>
          <Spacer height={10} />
          <DefaultText
            title={
              booking?.paidTotal
                ? `Spent ${
                    booking?.currentSpend === null
                      ? 0
                      : currency(booking?.paidTotal)
                  } / ${currency(booking?.paidTotal)}`
                : ''
            }
            titleClassName="text-center font-inter-medium text-neutral-400"
          />
          <View className="w-full h-[0.5] bg-neutral-700 my-4" />
          <View className="flex-row items-center">
            {memberInvited.length > 0 ? (
              <View className="flex-row items-center flex-1">
                {memberInvited.map((el, idx) => (
                  <EntryAnimation index={idx} key={`invited_${idx}`}>
                    <Image
                      source={{
                        uri: el.photoUrl,
                      }}
                      resizeMode="cover"
                      className="w-[27] h-[27] rounded-full bg-neutral-700 border-[1px] border-white"
                    />
                  </EntryAnimation>
                ))}

                <Gap width={10} />
                <DefaultText
                  title={`${memberInvited.length} Invited ${
                    memberInvited.filter(el => el.status === 'approved').length
                  } Accepted`}
                  titleClassName="font-inter-medium text-neutral-300"
                />
              </View>
            ) : (
              <>
                <Image
                  source={IcPeopleThree}
                  resizeMode="contain"
                  className="w-[20] h-[20]"
                />
                <DefaultText
                  title={
                    booking?.joinedTotal === 0
                      ? 'No one invited'
                      : booking?.joinedTotal + ' members invited'
                  }
                  titleClassName="flex-1 font-inter-medium text-neutral-400 mx-1"
                />
              </>
            )}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setShowInviteFriends(true)}>
              <LinearGradient
                className="p-[1] rounded-sm"
                colors={['#AA5AFA', '#C111D5']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <View className="px-3 py-[5] bg-neutral-800 rounded-sm">
                  <DefaultText
                    title={
                      memberInvited.length > 0 ? 'Check' : 'Invite friends'
                    }
                  />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View className="w-full h-[0.5] bg-neutral-700 my-4" />
          <Button
            TextComponent={<DefaultText title="Save to calendar" />}
            type="primary"
            onPress={onSaveCalendar}
            LeftComponent={
              <Image
                source={IcCalendarPlus}
                resizeMode="contain"
                className="w-[16] h-[16] mr-1"
              />
            }
          />
          <Spacer height={10} />
          <TouchableOpacity
            activeOpacity={0.7}
            className="border-[1px] border-white px-3 py-[10px] rounded-md flex-row justify-center items-center"
            onPress={() => {}}>
            <Image
              source={IcDetailBooking}
              resizeMode="contain"
              className="w-[16] h-[16] mr-1"
            />
            <DefaultText title="Detail Booking" titleClassName="text-center" />
          </TouchableOpacity>
        </View>

        <View
          className="bg-neutral-800 py-4 rounded-lg mb-[20px]"
          onLayout={e => setContent3(e.nativeEvent.layout.height)}>
          <DefaultText
            title="F&B Order"
            titleClassName="text-base font-inter-semibold ml-4"
          />
          <Spacer height={10} />
          <FlatList
            data={[1, 2, 3]}
            keyExtractor={(_, key) => key.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={() => <CardBookingOrder />}
            contentContainerStyle={styles.orderContainer}
          />
          <View className="px-4">
            <Spacer height={15} />
            <Button
              TextComponent={<DefaultText title="Add new order" />}
              type="primary"
              onPress={() => navigationRef.navigate('WineryOrder' as never)}
              style={styles.button}
            />
          </View>
        </View>

        <View
          className="bg-neutral-800 px-5 py-5 rounded-lg overflow-hidden mb-[20px]"
          onLayout={e => setContent4(e.nativeEvent.layout.height)}>
          <Image
            source={MusicDjImg}
            resizeMode="cover"
            className="absolute z-0 opacity-[0.4]"
          />
          <View className="z-10">
            <GradientText
              colors={['#A060FA', '#C800CC']}
              style={styles.titleSong}>
              Play your favourites song in stage
            </GradientText>
            <Spacer height={10} />
            <DefaultText
              title="Take control of the night and set the vibe. Request your favorite tracks and make the dancefloor come alive!"
              titleClassName="font-inter-medium text-center leading-5"
            />
            <Spacer height={10} />
            <Button
              TextComponent={<DefaultText title="Try now" />}
              type="primary"
              buttonPrimaryColors={['#F37B12', '#FFE419']}
              onPress={() => navigationRef.navigate('SongPlaylist' as never)}
              style={styles.button}
            />
          </View>
        </View>

        <View className="bg-neutral-800 p-4 rounded-lg">
          <DefaultText
            title="Friends"
            titleClassName="text-base font-inter-semibold"
          />
          <Spacer height={10} />
          {memberInvited.length > 0 ? (
            <TouchableOpacity
              activeOpacity={0.7}
              className="flex-row items-center my-1">
              {memberInvited.map((el, idx) => (
                <EntryAnimation index={idx} key={`invited_${idx}`}>
                  <Image
                    source={{
                      uri: el.photoUrl,
                    }}
                    resizeMode="cover"
                    className="w-[27] h-[27] rounded-full bg-neutral-700 border-[1px] border-white"
                  />
                </EntryAnimation>
              ))}
              <Gap width={10} />
              <DefaultText
                title={`${memberInvited.length} Invited ${
                  memberInvited.filter(el => el.status === 'approved').length
                } Accepted`}
                titleClassName="font-inter-medium text-neutral-300"
              />
              <Image
                source={IcChevronRight}
                resizeMode="contain"
                className="w-[5] h-[9]"
              />
            </TouchableOpacity>
          ) : (
            <DefaultText
              title="Oops you will go alone, invite them and shake the party"
              titleClassName="text-center font-inter-medium text-neutral-400"
            />
          )}
          <Spacer height={15} />
          <Button
            TextComponent={
              <DefaultText
                title={
                  memberInvited.length > 0 ? 'Check them out' : 'Invite Friend'
                }
                titleClassName="font-inter-bold"
              />
            }
            type="primary"
            onPress={() => setShowInviteFriends(true)}
          />
        </View>

        <ModalDetailTicket
          show={showDetailTicket}
          hide={() => setShowDetailTicket(false)}
        />

        <ModalInviteFriends
          bookingId={bookingId}
          show={showInviteFriends}
          selectedInvitation={selectedInvitation}
          setSelectedInvitation={setSelectedInvitation}
          isLoading={isLoading}
          friendshipData={friendshipData}
          hide={() => setShowInviteFriends(false)}
          onFriendInvited={data => (data ? onFriendInvited(data) : undefined)}
          memberInvited={memberInvited}
        />

        <ModalToast
          isVisible={isShowToast}
          onCloseModal={() => {
            setIsShowToast(false);
          }}
          message={toastMessage}
          type={type}
        />
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  orderContainer: {
    paddingHorizontal: 10,
  },
  titleSong: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  button: {
    borderRadius: 5,
  },
  container: {
    padding: 20,
  },
  parent: {
    flex: 1,
  },
});

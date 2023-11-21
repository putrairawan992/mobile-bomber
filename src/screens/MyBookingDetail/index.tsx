/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Button,
  EntryAnimation,
  Gap,
  GradientText,
  Layout,
  Loading,
  Section,
  Spacer,
  Text,
  TouchableSection,
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
import {IcCalendarPlus, MusicDjImg} from '../../theme/Images';
import ModalDetailTicket from '../../components/molecules/Modal/ModalDetailTicket';
import RNCalendarEvents from 'react-native-calendar-events';
import {FriendshipService} from '../../service/FriendshipService';
import {FriendInterface} from '../../interfaces/UserInterface';
import {useAppSelector} from '../../hooks/hooks';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParams} from '../../navigation/MainScreenStack';
import {dateFormatter} from '../../utils/dateFormatter';
import {currency, generateQr} from '../../utils/function';
import {MyEventService} from '../../service/MyEventService';
import {BookingDetailInterface} from '../../interfaces/BookingInterface';
import {ModalToastContext} from '../../context/AppModalToastContext';
import axios from 'axios';
import config from '../../config';
import {useImageAspectRatio} from '../../hooks/useImageAspectRatio';
import {Add} from 'iconsax-react-native';
import {Colors} from '../../theme';
import InviteFriendsScreen from '../../components/molecules/Modal/InviteFriendsScreen';
import {UserGroup} from '../../assets/icons';

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [base64Qr, setBase64Qr] = useState<any>();
  const [uriQr, setUriQr] = useState<null | string>(null);
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

  const aspectRatio = useImageAspectRatio(booking?.clubLogo as string);

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

  const onGenerateQr = async () => {
    const response = await generateQr(`${bookingId},${user.id}`);
    setUriQr(response as string);
  };

  useEffect(() => {
    fethData();
    actionSpentOrder();
  }, []);

  useEffect(() => {
    if (booking) {
      onGenerateQr();
    }
  }, [booking]);

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
        RNCalendarEvents.saveEvent(`${booking?.clubName}-Bomber`, {
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

  const actionSpentOrder = async () => {
    try {
      const res = await axios.get(
        `${config.apiService}/pos/crud/get_list_table_order/?club_id=${clubId}&booking_id=${bookingId}`,
      );
      console.log('actionSpentOrder', res.data?.data);
      return res.data;
    } catch {
      openToast('error', 'Failed get booking detail');
    }
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
          setMemberInvited(
            response[1].data.memberInvited.map(item => {
              return {
                customerId: item.customerId as string,
                fullName: item.memberName ?? item.customerName ?? '',
                userName: item.memberName ?? item.customerName ?? '',
                photoUrl: item.photoUrl,
                age: item?.memberAge ? Number(item.memberAge) : 0,
                bio: '',
                status: item.status,
              };
            }),
          );
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

      <ScrollView
        ref={ref}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <View
          className="bg-[#323232] p-4 rounded-lg mb-[20px]"
          onLayout={e => setContent2(e.nativeEvent.layout.height)}>
          <View className="w-[50] h-[50] bg-screen rounded-full absolute self-center -top-[26]" />
          <View className="flex-row items-center">
            <Section isRow>
              <View className="bg-screen py-2 px-2 rounded-lg">
                <Image
                  style={{width: 34, aspectRatio, alignSelf: 'center'}}
                  source={{
                    uri: booking?.clubLogo as string,
                  }}
                  resizeMode="contain"
                />
                <Spacer height={2.5} />
                <DefaultText
                  title={booking?.clubName}
                  titleClassName="font-inter-medium text-xs text-center"
                />
              </View>
              <Gap width={8} />
              <Text
                variant="base"
                fontWeight="semi-bold"
                label={booking?.clubName}
              />
            </Section>
            <Spacer className="flex-1" />
            <Section padding="4px 8px" rounded={4} backgroundColor="#06B971">
              <Text fontWeight="bold" label={booking?.type} />
            </Section>
          </View>
          <Spacer height={16} />
          <View className="items-center bg-black rounded-lg p-2 w-full">
            {uriQr ? (
              // eslint-disable-next-line react-native/no-inline-styles
              <Image source={{uri: uriQr}} style={{width: 300, height: 300}} />
            ) : null}
          </View>
          <Gap height={30} />
          <Section isRow isBetween>
            <Section>
              <Text
                variant="large"
                fontWeight="bold"
                label={booking?.tableName}
              />
              <Section isRow>
                <Text
                  label={
                    booking?.bookingDate
                      ? dateFormatter(
                          new Date(booking.bookingDate),
                          'EEEE, dd MMMM yyy',
                        )
                      : ''
                  }
                />
                <Gap width={8} />
                <TouchableOpacity onPress={onSaveCalendar}>
                  <Image
                    source={IcCalendarPlus}
                    resizeMode="contain"
                    className="w-[16] h-[16]"
                  />
                </TouchableOpacity>
              </Section>
            </Section>
            <TouchableSection
              onPress={() => setShowInviteFriends(true)}
              isRow
              padding="16px 8px"
              backgroundColor="#262626"
              rounded={8}>
              <UserGroup size={16} color={Colors['black-20']} />
              <Gap width={4} />
              <Text label={memberInvited.length.toString()} />
            </TouchableSection>
          </Section>
          <Spacer height={12} />
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#4D4D4D',
              marginHorizontal: 16,
            }}
          />
          <Spacer height={12} />
          <Section isRow isBetween>
            <View className="w-[185] h-[5] bg-white rounded-full self-center">
              {spendPercetage > 0 && (
                <View
                  className={`w-[${spendPercetage}%] h-[5] bg-yellow-600 rounded-full"`}
                />
              )}
            </View>
            <DefaultText
              title={
                booking?.paidTotal
                  ? `${
                      booking?.currentSpend === null
                        ? 0
                        : currency(booking?.paidTotal)
                    } / ${currency(booking?.paidTotal)}`
                  : ''
              }
              titleClassName="text-center font-inter-medium text-neutral-400"
            />
          </Section>
          <Gap height={30} />
          <Button
            type="primary"
            onPress={() => setShowDetailTicket(true)}
            title="Detail Booking"
          />
          <Spacer height={10} />
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
            <Section
              padding="8px 36px"
              rounded={4}
              style={{borderWidth: 1, borderColor: '#EEE'}}
              isRow
              isCenter>
              <Text fontWeight="regular" label="Add new order" />
              <Gap width={8} />
              <Add size={16} color={Colors['white-100']} />
            </Section>
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
                    className={`w-[40] h-[40] rounded-full ${
                      idx > 0 ? 'right-5' : ''
                    }`}
                  />
                </EntryAnimation>
              ))}
              <Gap width={10} />
              <Text
                label={`${memberInvited[0].fullName} and ${
                  memberInvited.length - 1
                } other`}
                style={{right: 16}}
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
                title={'Invite Friend'}
                titleClassName="font-inter-bold"
              />
            }
            type="primary"
            onPress={() => setShowInviteFriends(true)}
          />
        </View>

        <ModalDetailTicket
          booking={booking}
          memberLength={memberInvited.length + 1}
          show={showDetailTicket}
          hide={() => setShowDetailTicket(false)}
        />

        <InviteFriendsScreen
          booking={booking}
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

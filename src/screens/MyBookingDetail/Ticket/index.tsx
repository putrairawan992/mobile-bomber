import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  IcCalendarPlus,
  IcChevronRight,
  IcDetailBooking,
  IcPeopleThree,
  MusicDjImg,
  WaveLogoImg,
} from '../../../theme/Images';
import DefaultText from '../../../components/atoms/Text/DefaultText';
import {Button, Gap, GradientText, Spacer} from '../../../components/atoms';
import QRCode from 'react-native-qrcode-svg';
import LinearGradient from 'react-native-linear-gradient';
import CardBookingOrder from '../../../components/molecules/Card/CardBookingOrder';
import ModalDetailTicket from '../../../components/molecules/Modal/ModalDetailTicket';
import ModalInviteFriends from '../../../components/molecules/Modal/ModalInviteFriends';

export default function Ticket() {
  const [showDetailTicket, setShowDetailTicket] = useState<boolean>(false);
  const [showInviteFriends, setShowInviteFriends] = useState<boolean>(false);
  const [friendInvited, setFriendInvited] = useState<string[]>([]);

  const onFriendInvited = (value: string[]) => {
    setFriendInvited(value);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="px-5 py-8">
        <View className="bg-neutral-800 p-4 rounded-lg">
          <View className="w-[50] h-[50] bg-screen rounded-full absolute self-center -top-[26]" />
          <View className="flex-row items-center">
            <View className="bg-screen py-2 px-3 rounded-lg">
              <Image
                source={WaveLogoImg}
                className="w-[30] h-[17] self-center"
                resizeMode="contain"
              />
              <Spacer height={2.5} />
              <DefaultText
                title="WAVE"
                titleClassName="font-raleway-medium text-xs text-center"
              />
            </View>
            <Spacer className="flex-1" />
            <View className="items-end">
              <DefaultText
                title="PAID"
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
              title="Monday, 14 June 2023"
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
            <QRCode value="http://awesome.link.qr" size={300} />
          </View>
          <Spacer height={15} />
          <View className="w-[200] h-[5] bg-white rounded-full self-center">
            <View className="w-[30%] h-[5] bg-yellow-600 rounded-full" />
          </View>
          <Spacer height={10} />
          <DefaultText
            title="Spent 14.000 / 350.000 NT"
            titleClassName="text-center font-inter-medium text-neutral-400"
          />
          <View className="w-full h-[0.5] bg-neutral-700 my-4" />
          <View className="flex-row items-center">
            {friendInvited.length > 0 ? (
              <View className="flex-row items-center flex-1">
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60',
                  }}
                  resizeMode="cover"
                  className="w-[27] h-[27] rounded-full bg-neutral-700 border-[1px] border-white"
                />
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60',
                  }}
                  resizeMode="cover"
                  className="w-[27] h-[27] rounded-full bg-neutral-700 border-[1px] border-white -ml-2"
                />
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60',
                  }}
                  resizeMode="cover"
                  className="w-[27] h-[27] rounded-full bg-neutral-700 border-[1px] border-white -ml-2"
                />
                <Gap width={10} />
                <DefaultText
                  title="15 Invited 3 Accepted"
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
                  title="No one invited"
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
                      friendInvited.length > 0 ? 'Check' : 'Invite friends'
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
            onPress={() => {}}
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
            className="border-[1px] border-white px-3 py-[10px] rounded-md flex-row justify-center">
            <Image
              source={IcDetailBooking}
              resizeMode="contain"
              className="w-[16] h-[16] mr-1"
            />
            <DefaultText title="Detail Booking" titleClassName="text-center" />
          </TouchableOpacity>
        </View>

        <Spacer height={20} />
        <View className="bg-neutral-800 py-4 rounded-lg">
          <DefaultText
            title="Your Order"
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
              onPress={() => {}}
              style={styles.button}
            />
          </View>
        </View>

        <Spacer height={20} />
        <View className="bg-neutral-800 px-5 py-5 rounded-lg overflow-hidden">
          <Image
            source={MusicDjImg}
            resizeMode="cover"
            className="absolute z-0"
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
              onPress={() => {}}
              style={styles.button}
            />
          </View>
        </View>

        <Spacer height={20} />
        <View className="bg-neutral-800 p-4 rounded-lg">
          <DefaultText
            title="Friends"
            titleClassName="text-base font-inter-semibold"
          />
          <Spacer height={10} />
          {friendInvited.length > 0 ? (
            <TouchableOpacity
              activeOpacity={0.7}
              className="flex-row items-center my-1">
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60',
                }}
                resizeMode="cover"
                className="w-[27] h-[27] rounded-full bg-neutral-700 border-[1px] border-white"
              />
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60',
                }}
                resizeMode="cover"
                className="w-[27] h-[27] rounded-full bg-neutral-700 border-[1px] border-white -ml-2"
              />
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60',
                }}
                resizeMode="cover"
                className="w-[27] h-[27] rounded-full bg-neutral-700 border-[1px] border-white -ml-2"
              />
              <Gap width={10} />
              <DefaultText
                title="15 Invited 3 Accepted"
                titleClassName="font-inter-medium text-neutral-300 flex-1"
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
                  friendInvited.length > 0 ? 'Check them out' : 'Invite Friend'
                }
                titleClassName="font-raleway-bold"
              />
            }
            type="primary"
            onPress={() => setShowInviteFriends(true)}
          />
        </View>
      </View>

      <ModalDetailTicket
        show={showDetailTicket}
        hide={() => setShowDetailTicket(false)}
      />

      <ModalInviteFriends
        show={showInviteFriends}
        hide={() => setShowInviteFriends(false)}
        onFriendInvited={onFriendInvited}
      />
    </ScrollView>
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
});

import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {WaveLogoImg} from '../../../theme/Images';
import DefaultText from '../../../components/atoms/Text/DefaultText';
import {Button, Spacer} from '../../../components/atoms';
import {CalendarAdd, Profile2User, ArchiveAdd} from 'iconsax-react-native';
import colors from '../../../styles/colors';
import QRCode from 'react-native-qrcode-svg';
import LinearGradient from 'react-native-linear-gradient';

export default function Ticket() {
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
              <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
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
            <CalendarAdd color={colors.white} size={18} />
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
            <Profile2User size={16} color={colors.silver} />
            <DefaultText
              title="No one invited"
              titleClassName="flex-1 font-inter-medium text-neutral-400 mx-1"
            />
            <TouchableOpacity activeOpacity={0.7}>
              <LinearGradient
                className="p-[1] rounded-sm"
                colors={['#AA5AFA', '#C111D5']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <View className="px-3 py-[5] bg-neutral-800 rounded-sm">
                  <DefaultText title="Invite friends" />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View className="w-full h-[0.5] bg-neutral-700 my-4" />
          <Button
            type="primary"
            onPress={() => {}}
            title="Save to calendar"
            LeftComponent={
              <CalendarAdd className="mr-1" color={colors.white} size={18} />
            }
          />
          <Spacer height={10} />
          <TouchableOpacity
            activeOpacity={0.7}
            className="border-[1px] border-white p-3 rounded-md flex-row justify-center">
            <ArchiveAdd className="mr-1" color={colors.white} size={18} />
            <DefaultText title="Detail Booking" titleClassName="text-center" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

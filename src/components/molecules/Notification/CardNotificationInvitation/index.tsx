/* eslint-disable react-native/no-inline-styles */
import {Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {DefaultText, EntryAnimation, Gap} from '../../../atoms';
import {images} from '../../../../utils/images';
import {ArrowRight2} from 'iconsax-react-native';
import {colors} from '../../../../utils/colors';
import {InviteNotificationInterface} from '../../../../interfaces/NotificationInterface';
import moment from 'moment';
import {dateFormatter} from '../../../../utils/dateFormatter';
import {useImageAspectRatio} from '../../../../hooks/useImageAspectRatio';

interface CardNotificationInvitation {
  data: InviteNotificationInterface;
  index: number;
  showBorder?: boolean;
  onOpenInvitation: (data: InviteNotificationInterface) => void;
}

export default function CardNotificationInvitation({
  data,
  showBorder = true,
  index,
  onOpenInvitation,
}: CardNotificationInvitation) {
  const aspectRatio = useImageAspectRatio(data.logo);
  return (
    <EntryAnimation index={index}>
      <TouchableOpacity
        onPress={() => onOpenInvitation(data)}
        activeOpacity={0.7}
        className={`flex-row items-start mx-3 py-4 border-b-[1px] ${
          showBorder ? 'border-b-neutral-700' : 'border-b-transparent'
        }`}>
        <Image
          className="w-[32] h-[32] bg-container rounded-full"
          source={{
            uri: data.hostPhotoUrl as string,
          }}
          resizeMode="cover"
        />
        <Gap width={10} />
        <View className="flex-1">
          <DefaultText
            title={data.hostUsername}
            subtitle="inviting you to party"
            subtitleClassName="text-neutral-400"
          />
          <Gap height={8} />
          <View className="bg-[#383838] px-3 py-2 rounded-md">
            {!!data.message && (
              <DefaultText
                title={
                  data.message.length > 30
                    ? data?.message.substring(0, 30) + '...'
                    : data?.message
                }
              />
            )}
          </View>
          <Gap height={8} />
          <View className="flex-row items-center">
            <Image style={{width: 16, aspectRatio}} source={{uri: data.logo}} />
            <Gap width={5} />
            <View style={{width: 66}}>
              <DefaultText
                title={
                  data.clubName.length > 7
                    ? data.clubName.substring(0, 7) + '...'
                    : data.clubName
                }
                titleClassName="text-xs"
              />
            </View>
            <Gap width={6} />
            <Image className="w-[16] h-[16]" source={images.calendar} />
            <Gap width={5} />
            <View style={{width: 70}}>
              <DefaultText
                title={dateFormatter(new Date(data.bookingDate), 'EEE dd MMM')}
                titleClassName="text-xs"
              />
            </View>
            <Gap width={6} />
            <Image className="w-[16] h-[16]" source={images.table} />
            <Gap width={5} />
            <View style={{width: 60}}>
              <DefaultText title={data.tableName} titleClassName="text-xs" />
            </View>
            <Gap width={6} />
            <View>
              <View className="w-[20] h-[20] rounded-full bg-white" />
              <View className="w-[20] h-[20] rounded-full bg-[#838383] absolute left-2" />
            </View>
            <Gap width={12} />
            <DefaultText title={data.totalGuest} titleClassName="text-xs" />
          </View>
          <Gap height={5} />
          <DefaultText
            title={moment(new Date()).startOf('hour').fromNow()}
            titleClassName="text-xs text-neutral-400"
          />
        </View>
        <Gap width={10} />
        <ArrowRight2 color={colors.white} size={24} />
      </TouchableOpacity>
    </EntryAnimation>
  );
}

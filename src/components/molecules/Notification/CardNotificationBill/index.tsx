import {Image, View} from 'react-native';
import React from 'react';
import {Button, DefaultText, EntryAnimation, Gap} from '../../../atoms';
import {images} from '../../../../utils/images';
import {BillNotificationInterface} from '../../../../interfaces/NotificationInterface';
import {currency} from '../../../../utils/function';
import {dateFormatter} from '../../../../utils/dateFormatter';
import {PillsGradient} from '../../Pills/PillsGradient';
import {gradientMapping} from '../../../../utils/config';
import moment from 'moment';

interface CardNotificationBill {
  data: BillNotificationInterface;
  index: number;
  onSelect: (billId: string) => void;
}

export default function CardNotificationBill({
  data,
  index,
  onSelect,
}: CardNotificationBill) {
  return (
    <EntryAnimation index={index}>
      <View className="mx-4 py-4">
        <View className="flex-row items-center">
          {data?.isSplitBill && (
            <PillsGradient
              colors={
                gradientMapping['Split bill' as keyof typeof gradientMapping]
                  .color
              }
              title="Split bill"
            />
          )}

          {data?.isFoodOrder && (
            <>
              {data?.isSplitBill && <Gap width={10} />}
              <PillsGradient
                colors={
                  gradientMapping['Food order' as keyof typeof gradientMapping]
                    .color
                }
                title="Food order"
              />
            </>
          )}
          <Gap classname="flex-1" />
          <View className="bg-[#383838] rounded-md p-2">
            <DefaultText
              title={currency(data?.price)}
              titleClassName="font-inter-bold text-warning"
            />
          </View>
        </View>
        <Gap height={10} />
        <DefaultText
          title={data?.booking.name}
          titleClassName="font-inter-semibold text-base"
        />
        <Gap height={8} />
        <View className="flex-row">
          <DefaultText
            title={'#' + data?.billNumber}
            titleClassName="text-xs font-inter-semibold"
            subtitle={'| Hosted by '}
          />
          <DefaultText
            title={data?.hosted}
            titleClassName="text-xs text-warning"
            subtitle={`in ${data?.booking.table}`}
          />
        </View>
        <Gap height={8} />
        <View className="flex-row items-center">
          <Image className="w-[16] h-[16]" source={{uri: data?.booking.logo}} />
          <Gap width={5} />
          <DefaultText title={data?.hosted} titleClassName="text-xs" />
          <Gap width={15} />
          <Image className="w-[16] h-[16]" source={images.building} />
          <Gap width={5} />
          <DefaultText title={data?.booking.table} titleClassName="text-xs" />
          <Gap width={15} />
          <Image className="w-[16] h-[16]" source={images.calendar} />
          <Gap width={5} />
          <DefaultText
            title={dateFormatter(new Date(data?.booking.date), 'EEE, dd MMM')}
            titleClassName="text-xs"
          />
        </View>
        <Gap height={8} />
        <DefaultText
          title="WAITING PAYMENT"
          titleClassName="text-red-500 text-xs font-inter-bold"
        />
        <View className="w-full h-[1px] bg-neutral-600 my-3" />
        <Button title="Pay" type="primary" onPress={() => onSelect(data?.id)} />
        <Gap height={8} />
        <DefaultText
          title={moment(new Date(data.date)).startOf('hour').fromNow()}
          titleClassName="text-xs text-neutral-400"
        />
      </View>
    </EntryAnimation>
  );
}

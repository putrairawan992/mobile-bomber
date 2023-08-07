/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, View} from 'react-native';
import {EntryAnimation, Gap, Section, Text} from '../../atoms';

export interface CardNotificationAppsInterface {
  image: string;
  text: string;
  time: string;
}

export interface CardNotificationAppsProps {
  data: CardNotificationAppsInterface;
  index: number;
  isShowBorder: boolean;
}

export default function CardNotificationApps({
  data,
  index,
  isShowBorder,
}: CardNotificationAppsProps) {
  return (
    <EntryAnimation index={index}>
      <View
        style={{
          marginBottom: 12,
          borderBottomColor: isShowBorder ? '#292929' : 'transparent',
          borderBottomWidth: 1,
        }}>
        <Section isRow isAlignStart>
          <Image
            style={{width: 30, height: 30, borderRadius: 50}}
            source={{
              uri: data.image,
            }}
            resizeMode="cover"
          />
          <Gap width={10} />
          <Section style={{flex: 1}}>
            <Text label={data.text} />
            <Gap height={4} />
            <Text variant="small" label={data.time} color="#4E4D4F" />
          </Section>
        </Section>

        <Gap height={12} />
      </View>
    </EntryAnimation>
  );
}

/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import React from 'react';
import {Image, View, Text as RNText} from 'react-native';
import {useImageAspectRatio} from '../../../hooks/useImageAspectRatio';
import {getWordStr} from '../../../utils/function';
import {EntryAnimation, Gap, Section, Text} from '../../atoms';
import styles from './Styles';

export interface CardNotificationAppsInterface {
  image: string;
  name: string;
  ticket: string;
  description: string;
  date: string;
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
  const aspectRatio = useImageAspectRatio(data.image);
  return (
    <EntryAnimation index={index}>
      <View
        style={{
          marginBottom: 12,
          borderBottomColor: isShowBorder ? '#292929' : 'transparent',
          borderBottomWidth: 1,
        }}>
        <Section isRow isAlignStart>
          <Section
            style={{
              width: 30,
              height: 30,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            backgroundColor="#292929">
            <Image
              style={{width: 24, aspectRatio}}
              source={{
                uri: data.image,
              }}
            />
          </Section>

          <Gap width={10} />
          <Section style={{flex: 1}}>
            <RNText style={styles.bold}>
              {data.name}{' '}
              <RNText style={styles.regular}>
                {getWordStr(data.description, 0, 4)}
              </RNText>
              <RNText style={styles.bold}> {`${data.ticket} Ticket.`}</RNText>
              <RNText style={styles.regular}>
                {` ${getWordStr(data.description, 4, 30)}`}
              </RNText>
            </RNText>
            <Gap height={4} />
            <Text
              variant="small"
              label={moment(new Date(data.date)).startOf('hour').fromNow()}
              color="#4E4D4F"
            />
          </Section>
        </Section>

        <Gap height={12} />
      </View>
    </EntryAnimation>
  );
}

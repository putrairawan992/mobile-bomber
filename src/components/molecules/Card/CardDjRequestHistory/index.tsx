/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import React from 'react';
import {Image, View, Text as RNText} from 'react-native';

import {DjRequestSongInterface} from '../../../../interfaces/SongInterface';
import {useImageAspectRatio} from '../../../../hooks/useImageAspectRatio';
import {EntryAnimation, Gap, Section, Text} from '../../../atoms';
import styles from '../Styles';
import {currency} from '../../../../utils/function';

export interface CardDjRequestHistoryProps {
  data: DjRequestSongInterface;
  index: number;
  isShowBorder: boolean;
}

export default function CardDjRequestHistory({
  data,
  index,
  isShowBorder,
}: CardDjRequestHistoryProps) {
  const aspectRatio = useImageAspectRatio(data.requestedPhotoUrl);
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
                uri: data.requestedPhotoUrl,
              }}
            />
          </Section>

          <Gap width={10} />
          <Section style={{flex: 1}}>
            <RNText style={styles.bold}>
              You accept
              <RNText style={styles.regular}>{' song'}</RNText>
              <RNText style={styles.bold}>
                {` ${data.title} by ${data.artis} from @${data.requestedName}`}
              </RNText>
              <RNText style={styles.regular}>{' for'}</RNText>
              <RNText style={styles.bold}>{` ${currency(data.fee)}`}</RNText>
            </RNText>
            <Gap height={4} />
            <Text
              variant="small"
              label={moment(new Date()).startOf('hour').fromNow()}
              color="#4E4D4F"
            />
          </Section>
        </Section>

        <Gap height={12} />
      </View>
    </EntryAnimation>
  );
}

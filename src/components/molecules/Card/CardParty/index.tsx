/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, View} from 'react-native';
import {useImageAspectRatio} from '../../../../hooks/useImageAspectRatio';
import {PartyInterface} from '../../../../interfaces/BookingInterface';
import {Colors} from '../../../../theme';
import {
  EntryAnimation,
  Gap,
  Section,
  Text,
  TouchableSection,
} from '../../../atoms';

interface CardPartyProps {
  data: PartyInterface;
  onPress: (item: PartyInterface) => void;
  index: number;
  isShowBorder: boolean;
}

export const CardParty = ({
  data,
  onPress,
  index,
  isShowBorder,
}: CardPartyProps) => {
  const aspectRatio = useImageAspectRatio(data.logo);
  return (
    <EntryAnimation index={index}>
      <TouchableSection
        onPress={() => onPress(data)}
        style={{
          ...(isShowBorder && {
            borderBottomColor: '#484848',
            borderBottomWidth: 1,
          }),
          marginBottom: 10,
        }}>
        <Section isRow>
          <View
            style={{
              width: 80,
              height: 80,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#2F2F2F',
              borderRadius: 8,
            }}>
            <Image source={{uri: data.logo}} style={{width: 45, aspectRatio}} />
          </View>
          <Gap width={16} />
          <Section>
            <Text variant="base" fontWeight="semi-bold" label={data.name} />
            <Gap height={4} />
            <Section isRow>
              <Text
                variant="small"
                fontWeight="semi-bold"
                label={data.ticket}
              />
              <Gap width={8} />
              <Text
                variant="small"
                label={data.date}
                color={Colors['black-20']}
              />
            </Section>
            <Gap height={12} />
            <Text
              variant="small"
              fontWeight="semi-bold"
              label={`${data.joined}/${data.quota} Joined`}
            />
          </Section>
        </Section>
        <Gap height={10} />
      </TouchableSection>
    </EntryAnimation>
  );
};

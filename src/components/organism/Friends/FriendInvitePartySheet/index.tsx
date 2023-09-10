/* eslint-disable react-native/no-inline-styles */
import {ArrowLeft} from 'iconsax-react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {PartyInterface} from '../../../../interfaces/BookingInterface';
import {FriendInterface} from '../../../../interfaces/UserInterface';
import useTheme from '../../../../theme/useTheme';
import {gradientMapping} from '../../../../utils/config';
import {Gap, GradientText, Section} from '../../../atoms';
import {CardParty} from '../../../molecules/Card/CardParty';

interface FriendInvitePartySheetProps {
  data: FriendInterface | null;
  partyData: PartyInterface[];
  onBackPress: () => void;
  onInviteConfirmation: (
    party: PartyInterface,
    user: FriendInterface | null,
  ) => void;
}

export const FriendInvitePartySheet = ({
  data,
  partyData,
  onBackPress,
  onInviteConfirmation,
}: FriendInvitePartySheetProps) => {
  const theme = useTheme();
  return (
    <Section
      padding="0px 16px"
      style={{flex: 1}}
      backgroundColor={theme?.colors.BACKGROUND1}>
      <TouchableOpacity
        style={{position: 'absolute', left: 16, top: 16}}
        onPress={onBackPress}>
        <ArrowLeft size={20} color={theme?.colors.ICON} />
      </TouchableOpacity>
      <Section isCenter>
        <Gap height={15} />
        <GradientText
          xAxis={0.5}
          colors={
            gradientMapping['textPrimary' as keyof typeof gradientMapping].color
          }
          style={{
            fontSize: 16,
            fontFamily: 'Inter-Bold',
          }}>
          Invite Party
        </GradientText>
      </Section>
      <Gap height={16} />
      <Section
        padding="12px 12px"
        backgroundColor={theme?.colors.SECTION3}
        rounded={8}>
        {partyData.map((item: PartyInterface, idx: number) => (
          <CardParty
            data={item}
            index={idx}
            onPress={value => onInviteConfirmation(value, data)}
            isShowBorder={partyData.length === idx + 1 ? false : true}
            key={`party_${idx}`}
          />
        ))}
      </Section>
    </Section>
  );
};

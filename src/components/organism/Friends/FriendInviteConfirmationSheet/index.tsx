/* eslint-disable react-native/no-inline-styles */
import {ArrowLeft} from 'iconsax-react-native';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {
  CalendarGradient,
  DoorGradient,
  GlassGradient,
  HouseGradient,
} from '../../../../assets/icons';
import {useImageAspectRatio} from '../../../../hooks/useImageAspectRatio';
import {PartyInterface} from '../../../../interfaces/BookingInterface';
import {UserInterface} from '../../../../interfaces/UserInterface';
import {Colors} from '../../../../theme';
import useTheme from '../../../../theme/useTheme';
import {gradientMapping, WIDTH} from '../../../../utils/config';
import {dateFormatter} from '../../../../utils/dateFormatter';
import {Avatar, Button, Gap, GradientText, Section, Text} from '../../../atoms';

interface FriendInviteConfirmationSheetProps {
  user: UserInterface | null;
  party: PartyInterface | null;
  onBackPress?: () => void;
  type: 'invite' | 'approve';
  invitationMessage?: string;
}

export const FriendInviteConfirmationSheet = ({
  user,
  party,
  onBackPress,
  type,
  invitationMessage,
}: FriendInviteConfirmationSheetProps) => {
  const theme = useTheme();
  const aspectRatio = useImageAspectRatio(party?.logo as string);
  const isInvite = type === 'invite';
  return (
    <Section
      padding="0px 16px"
      style={{flex: 1}}
      backgroundColor={theme?.colors.SECTION}>
      {isInvite && (
        <TouchableOpacity
          style={{position: 'absolute', left: 16, top: 16}}
          onPress={onBackPress}>
          <ArrowLeft size={20} color={theme?.colors.ICON} />
        </TouchableOpacity>
      )}
      <Section isCenter>
        <Gap height={15} />
        {isInvite ? (
          <GradientText
            width={WIDTH - 96}
            xAxis={0.5}
            colors={
              gradientMapping['textPrimary' as keyof typeof gradientMapping]
                .color
            }
            style={{
              fontSize: 16,
              fontFamily: 'Inter-Bold',
              textAlign: 'center',
            }}>
            {`Are you sure invite ${user?.fullName} to party ?`}
          </GradientText>
        ) : (
          <Section isRow>
            <Text
              variant="base"
              fontWeight="bold"
              color={Colors['warning-500']}
              label={user?.fullName}
            />
            <Text
              variant="base"
              fontWeight="bold"
              label=" Inviting you to party"
            />
          </Section>
        )}

        <Gap height={6} />
        <Avatar
          size="ultra-large"
          url={user?.photo_url ?? ''}
          alt={user?.fullName as string}
        />
        <Gap height={4} />
        <Text variant="extra-small" fontWeight="medium" label="at" />
        <Gap height={4} />
        <Image source={{uri: party?.logo}} style={{width: 52, aspectRatio}} />
        <Gap height={4} />
        <Text fontWeight="medium" label={party?.name} />
      </Section>
      <Gap height={16} />
      <Section
        padding="12px 12px"
        backgroundColor={theme?.colors.SECTION2}
        rounded={8}>
        <Text
          label={isInvite ? user?.bio : invitationMessage}
          fontWeight="medium"
          color={Colors['black-20']}
        />
      </Section>
      <Gap height={12} />
      <Section
        padding="12px 12px"
        backgroundColor={theme?.colors.SECTION2}
        rounded={8}
        isRow>
        <View
          style={{
            height: 28,
            width: 28,
            borderRadius: 28,
            backgroundColor: '#D9D9D9',
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: 26,
            height: 28,
            width: 28,
            borderRadius: 28,
            backgroundColor: '#838383',
          }}
        />
        <Text
          label={'Michi and 3 other also in her friendship'}
          fontWeight="medium"
          color={Colors['black-20']}
          style={{marginLeft: 18}}
        />
      </Section>
      <Gap height={12} />
      <Section
        padding="12px 12px"
        backgroundColor={theme?.colors.SECTION2}
        rounded={8}>
        <Section isRow isCenter>
          <Section isRow>
            <CalendarGradient size={20} />
            <Gap width={12} />
            <Text
              variant="small"
              fontWeight="medium"
              label={dateFormatter(new Date(party?.date ?? ''), 'EEE dd MMM')}
            />
          </Section>
          <Gap width={24} />
          <Section isRow>
            <HouseGradient size={20} />
            <Gap width={12} />
            <Text variant="small" fontWeight="medium" label={party?.table} />
          </Section>
        </Section>
        <Gap height={20} />
        <Section isRow isCenter>
          <Section isRow>
            <DoorGradient size={20} />
            <Gap width={12} />
            <Text variant="small" fontWeight="medium" label={party?.ticket} />
          </Section>
          <Gap width={24} />
          <Section isRow>
            <GlassGradient size={20} />
            <Gap width={12} />
            <Text
              variant="small"
              fontWeight="medium"
              label={'All you can drink'}
            />
          </Section>
        </Section>
      </Section>
      <Section
        style={{
          position: 'absolute',
          bottom: 24,
          width: '100%',
          alignSelf: 'center',
        }}>
        <Button
          type="primary"
          onPress={() => undefined}
          title={isInvite ? 'Invite' : 'Approve'}
        />
        <Gap height={8} />
        <Button
          type="secondary"
          onPress={() => undefined}
          title={isInvite ? 'Cancel' : 'Reject'}
        />
      </Section>
    </Section>
  );
};

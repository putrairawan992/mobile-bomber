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
import {
  FriendInterface,
  UserInterface,
} from '../../../../interfaces/UserInterface';
import {Colors} from '../../../../theme';
import useTheme from '../../../../theme/useTheme';
import {gradientMapping, WIDTH} from '../../../../utils/config';
import {Avatar, Button, Gap, GradientText, Section, Text} from '../../../atoms';
import {InviteNotificationInterface} from '../../../../interfaces/NotificationInterface';
import moment from 'moment';
import {PartyInterface} from '../../../../interfaces/BookingInterface';

interface FriendInviteConfirmationSheetProps {
  data: InviteNotificationInterface | null;
  user: UserInterface | null | FriendInterface;
  onBackPress?: () => void;
  type: 'invite' | 'approve';
  onConfirm: (action: string) => void;
  party?: PartyInterface | null;
}

export const FriendInviteConfirmationSheet = ({
  data,
  user,
  onBackPress,
  type,
  onConfirm,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  party,
}: FriendInviteConfirmationSheetProps) => {
  const theme = useTheme();
  const aspectRatio = useImageAspectRatio(data?.logo as string);
  const isInvite = type === 'invite';

  return (
    <Section
      padding="0px 16px"
      style={{
        flex: 1,
        borderTopColor: theme?.colors.SECTION,
        borderTopWidth: 1,
      }}
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
              label={data?.hostUsername}
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
          url={
            isInvite
              ? (user?.photoUrl as string)
              : (data?.hostPhotoUrl as string)
          }
          alt={
            isInvite
              ? (user?.fullName as string)
              : (data?.hostUsername as string)
          }
        />
        <Gap height={4} />
        <Text variant="extra-small" fontWeight="medium" label="at" />
        <Gap height={4} />
        <Image
          source={{uri: isInvite ? party?.logo : data?.logo}}
          style={{width: 52, aspectRatio}}
        />
        <Gap height={4} />
        <Text
          fontWeight="medium"
          label={isInvite ? party?.name : data?.clubName}
        />
      </Section>
      <Gap height={16} />
      <Section
        padding="12px 12px"
        backgroundColor={theme?.colors.SECTION2}
        rounded={8}>
        <Text
          label={isInvite ? user?.bio : data?.message}
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
            {(data?.bookingDate || party?.date) && (
              <Text
                variant="small"
                fontWeight="medium"
                label={
                  isInvite
                    ? moment(party?.date).format('ll')
                    : moment(new Date(data?.bookingDate ?? '')).format('ll')
                }
              />
            )}
          </Section>
          <Gap width={24} />
          <Section isRow>
            <HouseGradient size={20} />
            <Gap width={12} />
            <Text
              variant="small"
              fontWeight="medium"
              label={isInvite ? party?.table : data?.tableName}
            />
          </Section>
        </Section>
        <Gap height={20} />
        <Section isRow isCenter>
          <Section isRow>
            <DoorGradient size={20} />
            <Gap width={12} />
            <Text variant="small" fontWeight="medium" label={'VIP Ticket'} />
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
      {(isInvite || (!isInvite && data?.status === 'waiting_for_response')) && (
        <Section
          style={{
            position: 'absolute',
            bottom: 24,
            width: '100%',
            alignSelf: 'center',
          }}>
          <Button
            type="primary"
            onPress={() => (isInvite ? undefined : onConfirm('approved'))}
            title={isInvite ? 'Invite' : 'Approve'}
          />
          <Gap height={8} />
          <Button
            type="secondary"
            onPress={() => (isInvite ? undefined : onConfirm('rejected'))}
            title={isInvite ? 'Cancel' : 'Reject'}
          />
        </Section>
      )}
      {!isInvite && data?.status !== 'waiting_for_response' && (
        <Section
          style={{
            position: 'absolute',
            bottom: 36,
            width: '100%',
            alignSelf: 'center',
          }}>
          <Text
            variant="base"
            color={theme?.colors.PRIMARY}
            fontWeight="semi-bold"
            label={`You ${data?.status} this invitation`}
            textAlign="center"
          />
        </Section>
      )}
    </Section>
  );
};

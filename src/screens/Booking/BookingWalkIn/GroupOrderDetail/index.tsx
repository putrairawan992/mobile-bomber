/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {ArrowLeft} from 'iconsax-react-native';
import {Button, Gap, Section, Text} from '../../../../components/atoms';
import {
  LayoutAnimation,
  Platform,
  TouchableOpacity,
  UIManager,
  View,
  Text as RNText,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {TicketInterface} from '../../../../interfaces/BookingInterface';
import {INVITE_FRIENDS_TEXT} from '../../../../utils/data';
import {FriendInterface} from '../../../../interfaces/UserInterface';
import useTheme from '../../../../theme/useTheme';
import {FriendsInvitation} from '../../../../components/organism';
import {Colors} from '../../../../theme';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface GroupOrderDetailProps {
  selectedTicket: TicketInterface | null;
  isFirstStep: boolean;
  isSecondStep: boolean;
  onChangeStep: (step: number) => void;
  handleInvite: (data: FriendInterface) => void;
  selectedInvitation: FriendInterface[];
  onOrderDetail: () => void;
  friendshipData: FriendInterface[];
  onOnboardingInviteFriends: () => void;
}

export const GroupOrderDetail = ({
  selectedTicket,
  isFirstStep,
  isSecondStep,
  onChangeStep,
  handleInvite,
  selectedInvitation,
  onOrderDetail,
  friendshipData,
  onOnboardingInviteFriends,
}: GroupOrderDetailProps) => {
  const theme = useTheme();
  const [people, setPeople] = useState<number>(4);
  const onNextStep = useCallback((step: number) => {
    LayoutAnimation.configureNext({
      duration: 500,
      update: {
        type: 'easeInEaseOut',
      },
    });
    onChangeStep(step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BottomSheetScrollView
      contentContainerStyle={{
        backgroundColor: theme?.colors.BACKGROUND1,
        paddingHorizontal: 16,
        height: '100%',
        flex: 1,
        borderTopWidth: 1,
        borderTopColor: theme?.colors.BACKGROUND1,
      }}>
      {isFirstStep && (
        <Section padding="10px 0px">
          <Text
            variant="base"
            fontWeight="bold"
            label="Invite Friends"
            color={theme?.colors.WARNING}
            textAlign="center"
          />
          <Gap height={30} />
          <Text
            variant="base"
            label="WHAT IS GROUP TICKET ?"
            fontWeight="poppins-regular"
            textAlign="center"
          />
          <Gap height={20} />
          <Text
            label={INVITE_FRIENDS_TEXT[0]}
            textAlign="center"
            color={Colors['black-10']}
          />
          <Gap height={16} />
          <RNText
            style={{
              fontFamily: 'Inter',
              fontWeight: '500',
              fontSize: 14,
              color: Colors['black-10'],
              textAlign: 'center',
            }}>
            {INVITE_FRIENDS_TEXT[1] + ' '}
            <RNText
              style={{
                fontFamily: 'Inter-Italic',
                fontWeight: '500',
                fontSize: 14,
                color: Colors['black-10'],
                textAlign: 'center',
                fontStyle: 'italic',
              }}>
              {INVITE_FRIENDS_TEXT[2]}
            </RNText>
          </RNText>
          <Gap height={16} />
          <Text
            label={INVITE_FRIENDS_TEXT[3]}
            textAlign="center"
            color={Colors['black-10']}
          />
          <Gap height={16} />
        </Section>
      )}

      {isSecondStep && (
        <Section style={{flex: 1}}>
          <TouchableOpacity
            style={{position: 'absolute', zIndex: 999}}
            onPress={() => onNextStep(1)}>
            <ArrowLeft size={24} color={theme?.colors.ICON} />
          </TouchableOpacity>
          <Text
            variant="base"
            label="Invite friends"
            fontWeight="bold"
            color={theme?.colors.WARNING}
            textAlign="center"
          />
          <Gap height={12} />
          <Text
            variant="small"
            label={`${selectedInvitation.length}/${people} invited`}
            textAlign="center"
          />
          <Section style={{flex: 1}}>
            <FriendsInvitation
              data={friendshipData}
              onInvite={handleInvite}
              selectedInvitation={selectedInvitation}
            />
            <Gap height={12} />
          </Section>
        </Section>
      )}

      <View
        style={{
          position: 'absolute',
          width: '100%',
          bottom: 32,
          alignSelf: 'center',
        }}>
        {isFirstStep ? (
          <>
            <Button
              type="primary"
              onPress={() => onNextStep(2)}
              title="Continue"
            />
            <Gap height={4} />
            <Button
              type="textButton"
              onPress={onOnboardingInviteFriends}
              title="Dive deeper with group ticket"
            />
          </>
        ) : (
          <Button type="primary" onPress={onOrderDetail} title="Book now" />
        )}
      </View>
    </BottomSheetScrollView>
  );
};

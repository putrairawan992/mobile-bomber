/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import useTheme from '../../../../theme/useTheme';
import {Button, Gap, Section, Text} from '../../../atoms';
import {ArrowLeft} from 'iconsax-react-native';
import {Colors} from '../../../../theme';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';

interface InviteFriendsOnboardingProps {
  hasBackNavigation?: boolean;
  onBackNavigation?: () => void;
  step: number;
  onNextStep: (step: number) => void;
  onFinish: () => void;
}

export const InviteFriendsOnboardingSheet = ({
  hasBackNavigation,
  onBackNavigation,
  step,
  onNextStep,
  onFinish,
}: InviteFriendsOnboardingProps) => {
  const theme = useTheme();
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
      {hasBackNavigation && (
        <TouchableOpacity
          style={{position: 'absolute', zIndex: 999, left: 16, top: 16}}
          onPress={onBackNavigation}>
          <ArrowLeft size={24} color={theme?.colors.ICON} />
        </TouchableOpacity>
      )}
      <Section isCenter>
        <Gap height={15} />
        <Text
          variant="base"
          fontWeight="bold"
          label="Invite Friends"
          color={theme?.colors.WARNING}
          textAlign="center"
        />
      </Section>
      <Gap height={30} />
      <Text
        variant="base"
        color={Colors['black-10']}
        label={
          step === 1
            ? 'Step 1: Group Up'
            : step === 2
            ? 'Step 2: Secure Discount'
            : 'Step 3: Invite & Pay'
        }
        textAlign="center"
      />
      <Gap height={20} />
      <Text
        color={Colors['black-10']}
        label={
          step === 1
            ? 'Gather your friends for an exciting night out.'
            : step === 2
            ? 'Select the best date for your group then choose the group ticket option and pay upfront for your crew. Enjoy a discounted rate.'
            : "Invite friends to join your group. We'll send them invites and handle payments. Get ready to party!"
        }
        textAlign="center"
      />
      <View
        style={{
          position: 'absolute',
          width: '100%',
          bottom: 32,
          alignSelf: 'center',
        }}>
        {step === 1 || step === 2 ? (
          <>
            <Button
              type="primary"
              onPress={() => onNextStep(step === 1 ? 2 : 3)}
              title="Next"
            />
            <Button
              type="textButton"
              onPress={() => onNextStep(step === 1 ? 2 : 3)}
              title="Skip it"
            />
          </>
        ) : (
          <Button type="primary" onPress={onFinish} title="Finish it" />
        )}
      </View>
    </BottomSheetScrollView>
  );
};

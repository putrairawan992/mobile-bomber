import {Add, ArrowLeft, Minus} from 'iconsax-react-native';
import {Button, Gap, Section, Text} from '../../../../components/atoms';
import {
  LayoutAnimation,
  Platform,
  Switch,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';

import {BookingInvitation} from '../../BookingTable/BookingInvitation';
/* eslint-disable react-native/no-inline-styles */
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {Colors} from '../../../../theme';
import {TicketInterface} from '../../../../interfaces/BookingInterface';
import {USER_DATA} from '../../../../utils/data';
import {UserInterface} from '../../../../interfaces/UserInterface';
import useTheme from '../../../../theme/useTheme';

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
  handleInvite: (data: UserInterface) => void;
  selectedInvitation: UserInterface[];
  onOrderDetail: () => void;
}

export const GroupOrderDetail = ({
  selectedTicket,
  isFirstStep,
  isSecondStep,
  onChangeStep,
  handleInvite,
  selectedInvitation,
  onOrderDetail,
}: GroupOrderDetailProps) => {
  const theme = useTheme();
  const [people, setPeople] = useState<number>(4);
  const [isInviteFriend, setIsInviteFriend] = useState<boolean>(false);
  const toggleSwitch = () => setIsInviteFriend(previousState => !previousState);
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
      }}>
      {isFirstStep && (
        <Section padding="10px 0px">
          <Text
            variant="base"
            fontWeight="bold"
            label="Group Booking"
            color={theme?.colors.WARNING}
            textAlign="center"
          />
          <Gap height={12} />
          <Section
            padding="16px 16px"
            rounded={8}
            backgroundColor={theme?.colors.SECTION}>
            <Text fontWeight="bold" label="People number" />
            <Gap height={4} />
            <Text variant="small" label="Minimum for this ticket is 4" />
            <Section
              padding="8px 8px"
              backgroundColor={Colors['gray-900']}
              rounded={4}
              isRow
              style={{
                borderWidth: 1,
                borderColor: Colors['gray-400'],
                marginVertical: 10,
                width: '100%',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() =>
                  people === 4
                    ? undefined
                    : setPeople(previousState => previousState - 1)
                }>
                <Minus
                  size={18}
                  color={people === 4 ? Colors['gray-600'] : theme?.colors.ICON}
                />
              </TouchableOpacity>
              <Text
                label={people.toString()}
                fontWeight="semi-bold"
                style={{marginHorizontal: 24}}
              />
              <TouchableOpacity
                onPress={() => setPeople(previousState => previousState + 1)}>
                <Add size={18} color={theme?.colors.ICON} />
              </TouchableOpacity>
            </Section>
            <Text
              fontWeight="bold"
              label={`Total: NT ${people * Number(selectedTicket?.price)}`}
            />
          </Section>
          <Gap height={12} />
          <Section
            padding="16px 16px"
            backgroundColor={theme?.colors.SECTION}
            rounded={8}>
            <Section isRow isBetween>
              <Text fontWeight="bold" label="Invite friend" />
              <Switch
                trackColor={{false: '#767577', true: theme?.colors.WARNING}}
                thumbColor={'#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isInviteFriend}
                style={{transform: [{scaleX: 0.6}, {scaleY: 0.6}]}}
              />
            </Section>
            <Gap height={4} />
            <Text variant="small" label="you can do it later" color="#d8d8d8" />
          </Section>
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
            <BookingInvitation
              data={USER_DATA}
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
          bottom: 12,
          alignSelf: 'center',
        }}>
        <Button
          type="primary"
          onPress={() => (isFirstStep ? onNextStep(2) : onOrderDetail())}
          title={isFirstStep ? 'Next' : 'Send Invitation'}
        />
      </View>
    </BottomSheetScrollView>
  );
};

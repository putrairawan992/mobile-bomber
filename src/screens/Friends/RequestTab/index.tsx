/* eslint-disable react-native/no-inline-styles */
import {ArrowDown2, ArrowUp2} from 'iconsax-react-native';
import React, {useCallback, useState} from 'react';
import {LayoutAnimation, Platform, ScrollView, UIManager} from 'react-native';
import {
  Avatar,
  EntryAnimation,
  Gap,
  Section,
  Text,
  TouchableSection,
} from '../../../components/atoms';
import {RequestFriendHistoryInterface} from '../../../interfaces/UserInterface';
import {Colors} from '../../../theme';
import useTheme from '../../../theme/useTheme';
import {RequestFriendNotificationInterface} from '../../../interfaces/NotificationInterface';

interface RequestTabProps {
  sendData: RequestFriendHistoryInterface[];
  receivedData: RequestFriendNotificationInterface[];
  searchValue: string;
  onSelectUser: (item: RequestFriendHistoryInterface) => void;
  onCancel: (item: RequestFriendHistoryInterface) => void;
  onApprove: (item: RequestFriendNotificationInterface) => void;
}

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export const RequestTab = ({
  sendData,
  receivedData,
  searchValue,
  onSelectUser,
  onCancel,
  onApprove,
}: RequestTabProps) => {
  const theme = useTheme();
  const [isExpandSent, setIsExpandSent] = useState<boolean>(false);
  const [isExpandReceived, setIsExpandReceived] = useState<boolean>(false);

  console.log('sendData', sendData);
  const onExpand = useCallback(
    (isShow: boolean, type: 'favorites' | 'friends') => {
      LayoutAnimation.configureNext({
        duration: 500,
        update: {
          type: 'easeInEaseOut',
        },
      });
      if (type === 'favorites') {
        setIsExpandSent(isShow);
      } else {
        setIsExpandReceived(isShow);
      }
    },
    [],
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <TouchableSection
        onPress={() => onExpand(!isExpandSent, 'favorites')}
        isRow
        isBetween
        padding="16px 16px"
        backgroundColor={theme?.colors.SECTION}>
        <>
          <Section isRow>
            <Text
              variant="base"
              fontWeight="semi-bold"
              label="Send Request"
              color={isExpandSent ? theme?.colors.ICON : Colors['black-40']}
            />
            <Text
              fontWeight="medium"
              label={` (${
                sendData.filter(
                  (item: RequestFriendHistoryInterface) =>
                    item.invitedName &&
                    item.invitedName.match(new RegExp(searchValue, 'i')),
                ).length
              })`}
              color={isExpandSent ? theme?.colors.ICON : Colors['black-40']}
            />
          </Section>
          {isExpandSent ? (
            <ArrowUp2 size={20} color={theme?.colors.ICON} />
          ) : (
            <ArrowDown2 size={20} color={theme?.colors.ICON} />
          )}
        </>
      </TouchableSection>
      <Gap height={24} />
      {isExpandSent && (
        <Section padding="0px 16px">
          {sendData
            .filter(
              (item: RequestFriendHistoryInterface) =>
                item.invitedName &&
                item.invitedName.match(new RegExp(searchValue, 'i')),
            )
            .map((item: RequestFriendHistoryInterface, idx) => {
              return (
                <EntryAnimation index={idx} key={`favorite_${idx}`}>
                  <Section
                    padding="0px 12px"
                    isRow
                    isBetween
                    style={{marginBottom: 20}}>
                    <Avatar
                      url={item.invitedPhotoUrl ?? ''}
                      size="x-large"
                      alt={item.invitedName ?? ''}
                      name={item.invitedName}
                      username={item.invitedName}
                      onPress={() => onSelectUser(item)}
                    />
                    <TouchableSection
                      padding="6px 10px"
                      rounded={8}
                      backgroundColor={Colors['danger-400']}
                      onPress={() => onCancel(item)}>
                      <Text
                        variant="small"
                        color={Colors['white-100']}
                        label="Cancel"
                      />
                    </TouchableSection>
                  </Section>
                </EntryAnimation>
              );
            })}
        </Section>
      )}
      <TouchableSection
        onPress={() => onExpand(!isExpandReceived, 'friends')}
        isRow
        isBetween
        padding="16px 16px"
        backgroundColor={theme?.colors.SECTION}>
        <>
          <Section isRow>
            <Text
              variant="base"
              fontWeight="semi-bold"
              label="Received Request"
              color={isExpandReceived ? theme?.colors.ICON : Colors['black-40']}
            />
            <Text
              fontWeight="medium"
              label={` (${
                receivedData.filter(
                  (item: RequestFriendNotificationInterface) =>
                    item.senderName &&
                    item.senderName.match(new RegExp(searchValue, 'i')),
                ).length
              })`}
              color={isExpandReceived ? theme?.colors.ICON : Colors['black-40']}
            />
          </Section>
          {isExpandReceived ? (
            <ArrowUp2 size={20} color={theme?.colors.ICON} />
          ) : (
            <ArrowDown2 size={20} color={theme?.colors.ICON} />
          )}
        </>
      </TouchableSection>
      <Gap height={24} />
      {isExpandReceived && (
        <Section padding="0px 16px">
          {receivedData
            .filter(
              (item: RequestFriendNotificationInterface) =>
                item.senderName &&
                item.senderName.match(new RegExp(searchValue, 'i')),
            )
            .map((item: RequestFriendNotificationInterface, idx) => {
              return (
                <EntryAnimation index={idx} key={`friend_${idx}`}>
                  <Section
                    padding="0px 12px"
                    isRow
                    isBetween
                    style={{marginBottom: 20}}>
                    <Avatar
                      url={item.invitedPhotoUrl ?? ''}
                      size="x-large"
                      alt={item.senderName ?? ''}
                      name={item.senderName}
                      username={item.senderName}
                      onPress={() => undefined}
                    />
                    <Section isRow>
                      <TouchableSection
                        padding="6px 10px"
                        rounded={8}
                        backgroundColor="#484848"
                        onPress={() => onApprove(item)}>
                        <Text
                          variant="small"
                          color={Colors['white-100']}
                          label="Approve"
                        />
                      </TouchableSection>
                    </Section>
                  </Section>
                </EntryAnimation>
              );
            })}
        </Section>
      )}
    </ScrollView>
  );
};

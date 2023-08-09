/* eslint-disable react-native/no-inline-styles */
import {
  ArrowDown2,
  ArrowUp2,
  MessageText1,
  More,
  Star1,
} from 'iconsax-react-native';
import React, {useCallback, useState} from 'react';
import {
  LayoutAnimation,
  Platform,
  TouchableOpacity,
  UIManager,
} from 'react-native';
import {UserGroup} from '../../../assets/icons';
import {
  Avatar,
  EntryAnimation,
  Gap,
  Section,
  Text,
  TouchableSection,
} from '../../../components/atoms';
import {UserInterface} from '../../../interfaces/UserInterface';
import {Colors} from '../../../theme';
import useTheme from '../../../theme/useTheme';

interface FriendsTabProps {
  data: UserInterface[];
  searchValue: string;
  onSelectUser: (item: UserInterface) => void;
  onFriendOption: (item: UserInterface) => void;
}

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export const FriendsTab = ({
  data,
  searchValue,
  onSelectUser,
  onFriendOption,
}: FriendsTabProps) => {
  const theme = useTheme();
  const [isExpandFavorites, setIsExpandFavorites] = useState<boolean>(false);
  const [isExpandFriends, setIsExpandFriends] = useState<boolean>(false);

  const onExpand = useCallback(
    (isShow: boolean, type: 'favorites' | 'friends') => {
      LayoutAnimation.configureNext({
        duration: 500,
        update: {
          type: 'easeInEaseOut',
        },
      });
      if (type === 'favorites') {
        setIsExpandFavorites(isShow);
      } else {
        setIsExpandFriends(isShow);
      }
    },
    [],
  );

  return (
    <>
      <TouchableSection
        onPress={() => onExpand(!isExpandFavorites, 'favorites')}
        isRow
        isBetween
        padding="16px 16px"
        backgroundColor={theme?.colors.SECTION}>
        <Section isRow>
          <Star1
            size={20}
            color={isExpandFavorites ? theme?.colors.ICON : Colors['black-40']}
          />
          <Gap width={12} />
          <Text
            variant="base"
            fontWeight="semi-bold"
            label="Favorite List"
            color={isExpandFavorites ? theme?.colors.ICON : Colors['black-40']}
          />
          <Text
            fontWeight="medium"
            label={` (${data.length})`}
            color={isExpandFavorites ? theme?.colors.ICON : Colors['black-40']}
          />
        </Section>
        {isExpandFavorites ? (
          <ArrowUp2 size={20} color={theme?.colors.ICON} />
        ) : (
          <ArrowDown2 size={20} color={theme?.colors.ICON} />
        )}
      </TouchableSection>
      <Gap height={24} />
      {isExpandFavorites && (
        <Section padding="0px 16px">
          {data
            .filter(
              (item: UserInterface) =>
                item.fullName &&
                item.fullName.match(new RegExp(searchValue, 'i')),
            )
            .map((item: UserInterface, idx) => {
              return (
                <EntryAnimation index={idx} key={idx}>
                  <Section
                    padding="0px 12px"
                    isRow
                    isBetween
                    style={{marginBottom: 20}}>
                    <Avatar
                      url={item.photo_url ?? ''}
                      size="x-large"
                      alt={item.fullName ?? ''}
                      name={item.fullName}
                      username={item.username}
                      onPress={() => onSelectUser(item)}
                    />
                    <TouchableOpacity onPress={() => onFriendOption(item)}>
                      <More size={16} color={theme?.colors.ICON} />
                    </TouchableOpacity>
                  </Section>
                </EntryAnimation>
              );
            })}
        </Section>
      )}
      <TouchableSection
        onPress={() => onExpand(!isExpandFriends, 'friends')}
        isRow
        isBetween
        padding="16px 16px"
        backgroundColor={theme?.colors.SECTION}>
        <Section isRow>
          <UserGroup
            size={20}
            color={isExpandFriends ? theme?.colors.ICON : Colors['black-40']}
          />
          <Gap width={12} />
          <Text
            variant="base"
            fontWeight="semi-bold"
            label="Friend"
            color={isExpandFriends ? theme?.colors.ICON : Colors['black-40']}
          />
          <Text
            fontWeight="medium"
            label={` (${data.length})`}
            color={isExpandFriends ? theme?.colors.ICON : Colors['black-40']}
          />
        </Section>
        {isExpandFriends ? (
          <ArrowUp2 size={20} color={theme?.colors.ICON} />
        ) : (
          <ArrowDown2 size={20} color={theme?.colors.ICON} />
        )}
      </TouchableSection>
      <Gap height={24} />
      {isExpandFriends && (
        <Section padding="0px 16px">
          {data
            .filter(
              (item: UserInterface) =>
                item.fullName &&
                item.fullName.match(new RegExp(searchValue, 'i')),
            )
            .map((item: UserInterface, idx) => {
              return (
                <EntryAnimation index={idx} key={idx}>
                  <Section
                    padding="0px 12px"
                    isRow
                    isBetween
                    style={{marginBottom: 20}}>
                    <Avatar
                      url={item.photo_url ?? ''}
                      size="x-large"
                      alt={item.fullName ?? ''}
                      name={item.fullName}
                      username={item.username}
                      onPress={() => onSelectUser(item)}
                    />
                    <Section isRow>
                      <MessageText1 size={16} color={theme?.colors.ICON} />
                      <Gap width={12} />
                      <UserGroup size={16} color={theme?.colors.ICON} />
                      <Gap width={12} />
                      <TouchableOpacity onPress={() => onFriendOption(item)}>
                        <More size={16} color={theme?.colors.ICON} />
                      </TouchableOpacity>
                    </Section>
                  </Section>
                </EntryAnimation>
              );
            })}
        </Section>
      )}
    </>
  );
};

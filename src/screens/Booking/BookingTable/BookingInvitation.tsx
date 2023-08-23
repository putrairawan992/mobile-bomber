/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createRef, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import PagerView from 'react-native-pager-view';
import {
  Avatar,
  EntryAnimation,
  Gap,
  Section,
  Text,
  TextInput,
} from '../../../components/atoms';
import {UserInterface} from '../../../interfaces/UserInterface';
import useTheme from '../../../theme/useTheme';
import {WIDTH} from '../../../utils/config';
import styles from '../Styles';

interface BookingInvitationInterface {
  data: UserInterface[];
  onInvite: (value: UserInterface) => void;
  selectedInvitation: UserInterface[];
}

export const BookingInvitation = ({
  data,
  onInvite,
  selectedInvitation,
}: BookingInvitationInterface) => {
  const [menu] = useState<string[]>(['Friends', 'Squad', 'Invitation']);
  const [initialPage, setInitialPage] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>('');
  const ref = createRef<PagerView>();
  const theme = useTheme();

  const FriendsTab = () => {
    return (
      <>
        {data
          .filter(
            (item: UserInterface) =>
              item.fullName &&
              item.fullName.match(new RegExp(searchValue, 'i')),
          )
          .map((item: UserInterface, idx) => {
            const isInvited = selectedInvitation.find(el => el.id === item.id);
            return (
              <EntryAnimation index={idx} key={idx}>
                <Section isRow isBetween style={{marginBottom: 20}}>
                  <Avatar
                    url={item.photoUrl ?? ''}
                    size="x-large"
                    alt={item.fullName ?? ''}
                    name={item.fullName}
                    username={item.username}
                  />
                  <TouchableOpacity
                    onPress={() => onInvite(item)}
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 8,
                      backgroundColor: isInvited
                        ? theme?.colors.PRIMARY
                        : '#484848',
                    }}>
                    <Text
                      variant="small"
                      label={isInvited ? 'Invited' : 'Invite'}
                    />
                  </TouchableOpacity>
                </Section>
              </EntryAnimation>
            );
          })}
      </>
    );
  };

  const InvitationTab = () => {
    return (
      <>
        {selectedInvitation.map((item: UserInterface, idx) => {
          return (
            <EntryAnimation index={idx} key={idx}>
              <Section isRow isBetween style={{marginBottom: 20}}>
                <Avatar
                  url={item.photoUrl ?? ''}
                  size="x-large"
                  alt={item.fullName ?? ''}
                  name={item.fullName}
                  username={item.username}
                />
                <TouchableOpacity
                  onPress={() => onInvite(item)}
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 8,
                    backgroundColor: theme?.colors.DANGER,
                  }}>
                  <Text variant="small" label={'Cancel Invitation'} />
                </TouchableOpacity>
              </Section>
            </EntryAnimation>
          );
        })}
      </>
    );
  };

  return (
    <Section style={{flex: 1}}>
      <Gap height={16} />
      <TextInput
        type="search"
        value={searchValue}
        onChangeText={(text: string) => setSearchValue(text)}
        placeholder="Search friend's name or email"
      />
      <Gap height={16} />
      <Section isRow isCenter>
        {menu.map((item, index) => {
          const isSelected = index === initialPage;
          return (
            <TouchableOpacity
              onPress={() => ref.current?.setPage(index)}
              activeOpacity={0.7}
              key={item}
              style={{
                width: (WIDTH - 32) / menu.length,
                paddingHorizontal: 12,
                borderBottomWidth: 2,
                borderBottomColor: isSelected
                  ? theme?.colors.PRIMARY
                  : theme?.colors.TEXT_PRIMARY,
              }}>
              <Text
                label={item}
                color={
                  isSelected
                    ? theme?.colors.PRIMARY
                    : theme?.colors.TEXT_PRIMARY
                }
                textAlign="center"
              />
              <Gap height={12} />
            </TouchableOpacity>
          );
        })}
      </Section>
      <Gap height={20} />
      <Section style={{flex: 1}}>
        <PagerView
          style={styles.container}
          initialPage={initialPage}
          ref={ref}
          onPageSelected={e => setInitialPage(e.nativeEvent.position)}>
          <View key="1">{FriendsTab()}</View>
          <View key="2" />
          <View key="3">{InvitationTab()}</View>
        </PagerView>
      </Section>
    </Section>
  );
};

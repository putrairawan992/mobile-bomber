/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createRef, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import PagerView from 'react-native-pager-view';
import {FriendInterface} from '../../../../interfaces/UserInterface';
import useTheme from '../../../../theme/useTheme';
import {WIDTH} from '../../../../utils/config';
import {
  Avatar,
  Button,
  EntryAnimation,
  Gap,
  Section,
  Text,
} from '../../../atoms';
import {TabMenu} from '../../../molecules';
import styles from '../Styles';

interface BookingInvitationInterface {
  data: FriendInterface[];
  onInvite: (value: FriendInterface) => void;
  selectedInvitation: FriendInterface[];
  onSendInvitation: (values: FriendInterface[]) => void;
  onHide: () => void;
  isHost: boolean;
}

export const FriendsInvitationV2 = ({
  data,
  onInvite,
  selectedInvitation,
  onSendInvitation,
  onHide,
  isHost,
}: BookingInvitationInterface) => {
  const [menu] = useState<string[]>(['Friends', 'Squad', 'Invitation']);
  const [initialPage, setInitialPage] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchValue, setSearchValue] = useState<string>('');
  const [selected, setSelected] = useState<FriendInterface[]>([]);
  const ref = createRef<PagerView>();
  const theme = useTheme();

  const handleInvite = (value: FriendInterface) => {
    let findItem: any = Boolean(
      selected.find(
        (el: FriendInterface) => el.customerId === value.customerId,
      ),
    );
    if (!findItem) {
      setSelected([...selected, value]);
    } else {
      setSelected(
        selected.filter(
          (el: FriendInterface) => el.customerId !== value.customerId,
        ),
      );
    }
  };
  const FriendsTab = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        {data
          .filter(
            o1 =>
              selectedInvitation
                .map(o2 => o2.customerId)
                .indexOf(o1.customerId) === -1,
          )
          .map((item: FriendInterface, idx) => {
            const isInvited = selectedInvitation.find(
              el => el.customerId === item.customerId,
            );
            const newInvited = selected.find(
              el => el.customerId === item.customerId,
            );
            return (
              <EntryAnimation index={idx} key={`friend_${idx}`}>
                <Section isRow isBetween style={{marginBottom: 20}}>
                  <Avatar
                    url={item.photoUrl ?? ''}
                    size="x-large"
                    alt={item.fullName ?? ''}
                    name={item.fullName}
                    username={item.userName}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      selectedInvitation.find(
                        el => el.customerId === item.customerId,
                      )
                        ? onInvite(item)
                        : handleInvite(item)
                    }
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 8,
                      backgroundColor:
                        isInvited || newInvited
                          ? theme?.colors.PRIMARY
                          : '#484848',
                    }}>
                    <Text
                      variant="small"
                      label={isInvited || newInvited ? 'Invited' : 'Invite'}
                    />
                  </TouchableOpacity>
                </Section>
              </EntryAnimation>
            );
          })}
      </ScrollView>
    );
  };

  const InvitationTab = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text variant="base" label="Accepted" />
        <Gap height={20} />
        {selectedInvitation
          .filter(el => el.status === 'approved')
          .map((item: FriendInterface, idx) => {
            return (
              <EntryAnimation index={idx} key={`invitation_${idx}`}>
                <Section isRow isBetween style={{marginBottom: 20}}>
                  <Avatar
                    url={item.photoUrl ?? ''}
                    size="x-large"
                    alt={item.fullName ?? ''}
                    name={item.fullName}
                    username={item.userName}
                  />
                  <TouchableOpacity
                    onPress={() => onInvite(item)}
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 8,
                      backgroundColor: '#06B971',
                    }}>
                    <Text variant="small" label={'Accepted'} />
                  </TouchableOpacity>
                </Section>
              </EntryAnimation>
            );
          })}
        <Text variant="base" label="Pending" />
        <Gap height={20} />
        {selectedInvitation
          .filter(el => el.status === 'waiting_for_response')
          .map((item: FriendInterface, idx) => {
            return (
              <EntryAnimation index={idx} key={`invitation_${idx}`}>
                <Section isRow isBetween style={{marginBottom: 20}}>
                  <Avatar
                    url={item.photoUrl ?? ''}
                    size="x-large"
                    alt={item.fullName ?? ''}
                    name={item.fullName}
                    username={item.userName}
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
      </ScrollView>
    );
  };

  return (
    <Section style={{flex: 1}}>
      <Gap height={16} />
      {isHost ? (
        <>
          <Section isRow isCenter>
            {menu.map((item, index) => {
              const isSelected = index === initialPage;
              return (
                <TabMenu
                  onPress={idx => ref.current?.setPage(idx)}
                  isSelected={isSelected}
                  width={WIDTH / menu.length}
                  item={item}
                  index={index}
                  key={`menu_${index}`}
                />
              );
            })}
          </Section>
          <Gap height={20} />
          <Section style={{flex: 1, paddingHorizontal: 16}}>
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
          <Section
            style={{position: 'absolute', bottom: 0, width: WIDTH}}
            padding="24px 16px">
            <Button
              type={selected.length ? 'primary' : 'disabled'}
              onPress={() =>
                selected.length ? onSendInvitation(selected) : undefined
              }
              title="Invite Friend"
            />
            <Gap height={4} />
            <Button type="textButton" onPress={onHide} title="Cancel" />
          </Section>
        </>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{paddingHorizontal: 16}}>
          {selectedInvitation.map((item: FriendInterface, idx) => {
            return (
              <EntryAnimation index={idx} key={`friend_${idx}`}>
                <Section isRow isBetween style={{marginBottom: 20}}>
                  <Avatar
                    url={item.photoUrl ?? ''}
                    size="x-large"
                    alt={item.fullName ?? ''}
                    name={item.fullName}
                    username={item.userName}
                  />
                </Section>
              </EntryAnimation>
            );
          })}
        </ScrollView>
      )}
    </Section>
  );
};

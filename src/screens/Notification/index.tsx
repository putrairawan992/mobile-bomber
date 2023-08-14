/* eslint-disable react-native/no-inline-styles */
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import * as React from 'react';
import {createRef, useState} from 'react';
import {Pressable, View} from 'react-native';
import PagerView from 'react-native-pager-view';
import {Gap, Layout, Section} from '../../components/atoms';
import {Header, TabMenu} from '../../components/molecules';
import {FriendInviteConfirmationSheet} from '../../components/organism';
import {PartyInterface} from '../../interfaces/BookingInterface';
import {UserInterface} from '../../interfaces/UserInterface';
import {Colors} from '../../theme';
import useTheme from '../../theme/useTheme';
import {WIDTH} from '../../utils/config';
import {INVITATION_NOTIFICATION} from '../../utils/data';
import NotificationApps from './NotificationApps';
import NotificationBill from './NotificationBill';
import NotificationFriends from './NotificationFriends';
import NotificationInvitation from './NotificationInvitation';
import styles from './Styles';

// type Props = NativeStackScreenProps<MainStackParams, 'Saved', 'MyStack'>;

function NotificationScreen() {
  const [menu] = useState<string[]>(['Apps', 'Invitation', 'Bill', 'Friends']);
  const [initialPage, setInitialPage] = useState<number>(0);
  const [selectedUser, setSelectedUser] = useState<UserInterface | null>(null);
  const [selectedParty, setSelectedParty] = useState<PartyInterface | null>(
    null,
  );
  const [message, setMessage] = useState<string>('');
  const ref = createRef<PagerView>();
  const theme = useTheme();

  const onOpenInvitation = (invitationId: string) => {
    const selectedInvitation = INVITATION_NOTIFICATION.find(
      el => el.id === invitationId,
    );
    setSelectedParty(selectedInvitation?.party ?? null);
    setSelectedUser(selectedInvitation?.sender ?? null);
    setMessage(selectedInvitation?.message ?? '');
    setTimeout(() => {
      notificationSheetRef.current?.present();
    }, 100);
  };

  const [sheetIndex, setSheetIndex] = React.useState<number>(-1);
  const notificationSheetRef = React.useRef<BottomSheetModal>(null);
  const snapPoints = React.useMemo(() => ['80'], []);
  const handleSheetChanges = React.useCallback((index: number) => {
    setSheetIndex(index);
  }, []);

  return (
    <Layout contentContainerStyle={styles.container}>
      <Header transparent hasBackBtn title="Notification" />
      <Gap height={24} />
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
            />
          );
        })}
      </Section>
      <Gap height={30} />
      <Section style={{flex: 1}}>
        <PagerView
          style={styles.container}
          initialPage={initialPage}
          ref={ref}
          onPageSelected={e => setInitialPage(e.nativeEvent.position)}>
          <View key="1">
            <NotificationApps />
          </View>
          <View key="2">
            <NotificationInvitation
              data={INVITATION_NOTIFICATION}
              onOpenInvitation={onOpenInvitation}
            />
          </View>
          <View key="3">
            <NotificationBill />
          </View>
          <View key="4">
            <NotificationFriends />
          </View>
        </PagerView>
      </Section>

      <BottomSheetModal
        ref={notificationSheetRef}
        index={0}
        enablePanDownToClose
        snapPoints={snapPoints}
        backdropComponent={({style}) =>
          sheetIndex === 0 ? (
            <Pressable
              onPress={() => notificationSheetRef.current?.close()}
              style={[style, {backgroundColor: 'rgba(0, 0, 0, 0.60)'}]}
            />
          ) : (
            <></>
          )
        }
        handleStyle={{
          backgroundColor: theme?.colors.BACKGROUND1,
          borderTopRightRadius: 14,
          borderTopLeftRadius: 14,
        }}
        handleIndicatorStyle={{backgroundColor: Colors['black-70']}}
        onChange={handleSheetChanges}>
        <FriendInviteConfirmationSheet
          user={selectedUser}
          party={selectedParty}
          type="approve"
          invitationMessage={message}
        />
      </BottomSheetModal>
    </Layout>
  );
}

export default NotificationScreen;

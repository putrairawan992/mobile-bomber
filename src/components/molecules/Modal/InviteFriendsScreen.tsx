/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  StyleSheet,
  View,
  TextInput as RNTextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useState} from 'react';
import Modal from 'react-native-modal';
import DefaultText from '../../atoms/Text/DefaultText';
import {
  Button,
  Gap,
  GradientText,
  Loading,
  Section,
  Spacer,
  Text,
} from '../../atoms';
import {Image} from 'react-native';
import colors from '../../../styles/colors';
import {FriendInterface} from '../../../interfaces/UserInterface';
import {FriendsInvitation, FriendsInvitationV2} from '../../organism';
import {ModalToastContext} from '../../../context/AppModalToastContext';
import {ModalToast} from '../ModalToast/ModalToast';
import {NightlifeService} from '../../../service/NightlifeService';
import {HEIGHT, WIDTH} from '../../../utils/config';
import useTheme from '../../../theme/useTheme';
import {ArrowLeft, ArrowLeft2} from 'iconsax-react-native';
import {Colors} from '../../../theme';
import {BookingInterface} from '../../../interfaces/BookingInterface';
import {Search} from '../../../assets/icons/Search';
import FriendsInviteConfirmation from '../../organism/Friends/FriendsInvitation/FriendsInviteConfirmation';

interface InviteFriendsScreenProps {
  bookingId: string;
  booking: BookingInterface | null;
  show: boolean;
  hide: () => void;
  friendshipData: any;
  onFriendInvited: (value: FriendInterface | null) => void;
  selectedInvitation?: any;
  setSelectedInvitation?: any;
  isLoading: boolean;
  memberInvited: FriendInterface[];
  onRefetch: () => void;
  isHost: boolean;
}

export default function InviteFriendsScreen({
  bookingId,
  booking,
  show,
  hide,
  friendshipData,
  onFriendInvited,
  selectedInvitation,
  setSelectedInvitation,
  isLoading,
  memberInvited,
  onRefetch,
  isHost,
}: InviteFriendsScreenProps) {
  const theme = useTheme();
  const [showInvitation, setShowInvitation] = useState<boolean>(false);
  const [isShowSendInvitation, setIsShowSendInvitation] =
    useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [selectedFriend, setSelectedFriend] = useState<FriendInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const checkInvitation = (data: FriendInterface) => {
    if (memberInvited.find(el => el.customerId === data.customerId)) {
      openToast('error', 'You cannot modify this invitation');
    }
  };

  const {
    isShowToast,
    setIsShowToast,
    toastMessage,
    setToastMessage,
    type,
    setType,
  } = useContext(ModalToastContext);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const openToast = (toastType: 'success' | 'error', message: string) => {
    setIsShowToast(true);
    setType(toastType);
    setToastMessage(message);
  };

  return (
    <Modal
      style={{left: -WIDTH * 0.05}}
      isVisible={show}
      onBackButtonPress={() => {
        if (showInvitation) {
          setShowInvitation(false);
        }
        hide();
      }}
      onBackdropPress={() => {
        if (showInvitation) {
          setShowInvitation(false);
        }
        hide();
      }}>
      {(loading || isLoading) && <Loading />}
      <Section
        rounded={16}
        style={{
          backgroundColor: theme?.colors.BACKGROUND1,
          width: WIDTH,
          elevation: 5,
          borderRadius: 0,
          height: HEIGHT,
        }}>
        <Spacer height={24} />
        <Section isRow isBetween padding="0px 16px">
          <Section isRow>
            <TouchableOpacity
              onPress={() => {
                if (showInvitation) {
                  setShowInvitation(false);
                }
                hide();
              }}>
              <ArrowLeft size={24} color={Colors['white-100']} />
            </TouchableOpacity>
            <Gap width={14} />
            <Text fontWeight="bold" label={booking?.tableName} />
          </Section>
          <TouchableOpacity>
            <Search size={24} color={Colors['white-100']} />
          </TouchableOpacity>
        </Section>
        <Spacer height={15} />
        <>
          <FriendsInvitationV2
            data={friendshipData}
            onInvite={checkInvitation}
            selectedInvitation={memberInvited}
            onSendInvitation={values => {
              setSelectedFriend(values);
              setIsShowSendInvitation(true);
            }}
            onHide={hide}
            isHost={isHost}
          />
        </>
      </Section>
      <ModalToast
        isVisible={isShowToast}
        onCloseModal={() => {
          setIsShowToast(false);
        }}
        message={toastMessage}
        type={type}
      />
      <FriendsInviteConfirmation
        bookingId={bookingId}
        show={isShowSendInvitation}
        hide={() => setIsShowSendInvitation(false)}
        memberInvited={selectedFriend}
        onConfirm={() => {
          setIsShowSendInvitation(false);
          onRefetch();
        }}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  titleSong: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
});

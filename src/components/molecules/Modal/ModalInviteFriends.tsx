/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, View, TextInput as RNTextInput} from 'react-native';
import React, {useContext, useState} from 'react';
import Modal from 'react-native-modal';
import DefaultText from '../../atoms/Text/DefaultText';
import {Button, Gap, GradientText, Loading, Spacer} from '../../atoms';
import {Image} from 'react-native';
import colors from '../../../styles/colors';
import {FriendInterface} from '../../../interfaces/UserInterface';
import {FriendsInvitation} from '../../organism';
import {ModalToastContext} from '../../../context/AppModalToastContext';
import {ModalToast} from '../ModalToast/ModalToast';
import {NightlifeService} from '../../../service/NightlifeService';

interface ModalInviteFriends {
  bookingId: string;
  show: boolean;
  hide: () => void;
  friendshipData: any;
  onFriendInvited: (value: FriendInterface | null) => void;
  selectedInvitation?: any;
  setSelectedInvitation?: any;
  isLoading: boolean;
  memberInvited: FriendInterface[];
}

export default function ModalInviteFriends({
  bookingId,
  show,
  hide,
  friendshipData,
  onFriendInvited,
  selectedInvitation,
  setSelectedInvitation,
  isLoading,
  memberInvited,
}: ModalInviteFriends) {
  const [showInvitation, setShowInvitation] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [selectedFriend, setSelectedFriend] = useState<FriendInterface | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const checkInvitation = (data: FriendInterface) => {
    if (memberInvited.find(el => el.customerId === data.customerId)) {
      openToast('error', 'You cannot modify this invitation');
    } else {
      setSelectedFriend(data);
      setShowInvitation(true);
    }
  };

  const onSendInvitation = async () => {
    try {
      setLoading(true);
      const response = await NightlifeService.postBookingInvitation({
        payload: {
          booking_id: bookingId,
          member_invited: [selectedFriend?.customerId as string],
          message,
        },
      });
      if (!response.error) {
        openToast('success', response.message);
        onFriendInvited(selectedFriend);
        setLoading(false);
        setShowInvitation(false);
        setMessage('');
      }
    } catch (error: any) {
      setLoading(false);
      openToast('error', error.response.data.message);
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
      className="m-0 p-0"
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
      {loading || (isLoading && <Loading />)}
      <View
        className={`absolute bottom-0 right-0 left-0 bg-container rounded-t-xl bg-neutral-800 ${
          showInvitation ? 'pt-4' : 'h-[600] p-4'
        }`}>
        <View className="w-[50] h-[4] rounded-full bg-neutral-600 self-center" />
        <Spacer height={15} />
        <GradientText colors={['#fff', '#fff']} style={styles.titleSong}>
          {showInvitation ? 'Sending invitation' : 'Invite friends'}
        </GradientText>
        <Spacer height={15} />
        {showInvitation ? (
          <>
            <View className="px-4">
              <View className="flex-row items-center justify-center">
                <Image
                  source={{
                    uri: selectedFriend?.photoUrl,
                  }}
                  resizeMode="cover"
                  className="w-[57] h-[57] rounded-full"
                />
                <Spacer width={10} />
                <View>
                  <DefaultText
                    title={selectedFriend?.fullName}
                    titleClassName="font-inter-medium mb-1"
                  />
                  <DefaultText
                    title={`@${selectedFriend?.userName}`}
                    titleClassName="text-xs font-inter-medium text-neutral-500"
                  />
                </View>
              </View>
              <Spacer height={15} />
              <View className="bg-[#2D2D2D] rounded-lg p-4">
                <DefaultText
                  title="Message them"
                  titleClassName="text-center font-inter-bold"
                />
                <Gap height={15} />
                <View className="bg-neutral-800 rounded-md p-3">
                  <RNTextInput
                    className="font-inter-regular m-0 p-0 min-h-[120] text-white"
                    placeholder="Any additional notes? write here"
                    placeholderTextColor={colors.blackCoral}
                    textAlignVertical="top"
                    multiline={true}
                    value={message}
                    onChangeText={text => setMessage(text)}
                  />
                </View>
              </View>
            </View>
            <Gap height={30} />
            <Button
              type="primary"
              title="Send Invitation"
              onPress={onSendInvitation}
              noRound
              isLoading={loading}
            />
          </>
        ) : (
          <>
            <FriendsInvitation
              data={friendshipData}
              onInvite={checkInvitation}
              selectedInvitation={memberInvited}
            />
          </>
        )}
      </View>
      <ModalToast
        isVisible={isShowToast}
        onCloseModal={() => {
          setIsShowToast(false);
        }}
        message={toastMessage}
        type={type}
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

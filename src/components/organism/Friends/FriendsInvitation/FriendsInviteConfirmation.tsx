/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, View, TextInput as RNTextInput} from 'react-native';
import React, {useContext, useState} from 'react';
import Modal from 'react-native-modal';
import {Image} from 'react-native';
import {FriendInterface} from '../../../../interfaces/UserInterface';
import {NightlifeService} from '../../../../service/NightlifeService';
import {ModalToastContext} from '../../../../context/AppModalToastContext';
import {
  Button,
  DefaultText,
  Gap,
  GradientText,
  Loading,
  Section,
  Spacer,
  Text,
} from '../../../atoms';
import {ModalToast} from '../../../molecules';
import colors from '../../../../styles/colors';
import {WIDTH} from '../../../../utils/config';

interface ModalInviteFriends {
  bookingId: string;
  show: boolean;
  hide: () => void;
  memberInvited: FriendInterface[];
  onConfirm: () => void;
}

export default function FriendsInviteConfirmation({
  bookingId,
  show,
  hide,
  memberInvited,
  onConfirm,
}: ModalInviteFriends) {
  const [showInvitation, setShowInvitation] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');
  const [selectedFriend, setSelectedFriend] = useState<FriendInterface | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(false);

  const onSendInvitation = async () => {
    try {
      setLoading(true);
      const response = await NightlifeService.postBookingInvitation({
        payload: {
          booking_id: bookingId,
          member_invited: memberInvited.map(item => item.customerId),
          message,
        },
      });
      if (!response.error) {
        openToast('success', response.message);
        setLoading(false);
        onConfirm();
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
      {loading && <Loading />}
      <View
        className={
          'absolute bottom-0 right-0 left-0 bg-container rounded-t-xl bg-neutral-800'
        }>
        <View className="w-[50] h-[4] rounded-full bg-neutral-600 self-center" />
        <Spacer height={15} />
        <Text
          variant="base"
          fontWeight="bold"
          label={'Invite friends'}
          textAlign="center"
        />
        <Spacer height={30} />
        <>
          <View className="px-4">
            <View className="bg-[#2D2D2D] rounded-lg p-4">
              <DefaultText
                title="Give them a message"
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
          <Section padding="0px 16px">
            <Button
              type={'primary'}
              onPress={onSendInvitation}
              title="Send Invitation"
            />
            <Gap height={4} />
            <Button type="textButton" onPress={hide} title="Cancel" />
          </Section>
        </>
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

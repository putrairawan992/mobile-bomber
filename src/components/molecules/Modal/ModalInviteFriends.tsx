import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput as RNTextInput,
} from 'react-native';
import React, {createRef, useState} from 'react';
import Modal from 'react-native-modal';
import DefaultText from '../../atoms/Text/DefaultText';
import {Button, Gap, GradientText, Spacer, TextInput} from '../../atoms';
import PagerView from 'react-native-pager-view';
import CardInviteFriends from '../Card/CardInviteFriends';
import {Image} from 'react-native';
import colors from '../../../styles/colors';

interface ModalInviteFriends {
  show: boolean;
  hide: () => void;
  onFriendInvited: (value: string[]) => void;
}

export default function ModalInviteFriends({
  show,
  hide,
  onFriendInvited,
}: ModalInviteFriends) {
  const [menu] = useState<string[]>(['Friends', 'Squad']);
  const [initialPage, setInitialPage] = useState<number>(0);
  const [showInvitation, setShowInvitation] = useState<boolean>(false);

  const ref = createRef<PagerView>();

  const onInvite = () => {
    setShowInvitation(true);
  };

  return (
    <Modal
      className="m-0 p-0"
      isVisible={show}
      onBackButtonPress={hide}
      onBackdropPress={hide}>
      <View
        className={`absolute bottom-0 right-0 left-0 bg-container rounded-t-xl bg-neutral-800 ${
          showInvitation ? 'pt-4' : 'h-[600] p-4'
        }`}>
        <View className="w-[50] h-[4] rounded-full bg-neutral-600 self-center" />
        <Spacer height={15} />
        <GradientText colors={['#fff', '#fff']} style={styles.titleSong}>
          {showInvitation ? 'Sending Invitation' : 'Invite friends'}
        </GradientText>
        <Spacer height={15} />
        {showInvitation ? (
          <>
            <View className="px-4">
              <View className="flex-row items-center justify-center">
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60',
                  }}
                  resizeMode="cover"
                  className="w-[57] h-[57] rounded-full"
                />
                <Spacer width={10} />
                <View>
                  <DefaultText
                    title="Jean Chen"
                    titleClassName="font-inter-medium mb-1"
                  />
                  <DefaultText
                    title="@jean"
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
                    className="font-poppins-regular m-0 p-0 min-h-[120] text-white"
                    placeholder="Any additional notes? write here"
                    placeholderTextColor={colors.blackCoral}
                    textAlignVertical="top"
                    multiline={true}
                  />
                </View>
              </View>
            </View>
            <Gap height={30} />
            <TouchableOpacity
              activeOpacity={0.7}
              className="bg-primary p-4"
              onPress={() => {
                onFriendInvited(['1']);
                hide();
                setShowInvitation(false);
              }}>
              <DefaultText
                title="Send Invitation"
                titleClassName="text-center font-inter-bold text-base"
              />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextInput
              placeholder="Search fried's name or email"
              type="search"
              textInputBackgroundColor="transparent"
              textInputHeight={30}
            />
            <Spacer height={5} />
            <View className="flex-row px-3">
              {menu.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => ref.current?.setPage(index)}
                    activeOpacity={0.7}
                    key={item}
                    className={`flex-1 py-3 border-b-[1px] ${
                      index === initialPage
                        ? 'border-b-secondary'
                        : 'border-b-white'
                    }`}>
                    <DefaultText
                      title={item}
                      titleClassName={`text-center text-base font-poppins-semibold ${
                        index === initialPage ? 'text-secondary' : 'text-white'
                      }`}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>

            <PagerView
              className="flex-1"
              initialPage={initialPage}
              ref={ref}
              onPageSelected={e => setInitialPage(e.nativeEvent.position)}>
              <View key="1">
                <Friends onPress={onInvite} />
              </View>
              <View key="2">
                <Squad />
              </View>
            </PagerView>
            <View className="py-4">
              <Button type="primary" onPress={() => {}} title="Invite Friend" />
            </View>
          </>
        )}
      </View>
    </Modal>
  );
}

const Friends = ({onPress}: {onPress: (value: string) => void}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <CardInviteFriends onPress={onPress} />
      <CardInviteFriends onPress={onPress} />
      <CardInviteFriends onPress={onPress} />
      <CardInviteFriends onPress={onPress} />
      <CardInviteFriends onPress={onPress} />
      <CardInviteFriends onPress={onPress} />
      <CardInviteFriends onPress={onPress} />
    </ScrollView>
  );
};

const Squad = () => {
  return (
    <View>
      <DefaultText title="squad" />
    </View>
  );
};

const styles = StyleSheet.create({
  titleSong: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
});

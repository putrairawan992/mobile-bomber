import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {DefaultText, Gap, Layout, Loading} from '../../components/atoms';
import {Header} from '../../components/molecules';
import colors from '../../styles/colors';
import {IcPencil, IcProfile} from '../../theme/Images';
import LinearGradient from 'react-native-linear-gradient';
import {Avatar} from '../AvatarProfile';
import {ModalToastContext} from '../../context/AppModalToastContext';
import {ProfileService} from '../../service/ProfileService';
import {useAppSelector} from '../../hooks/hooks';
import {navigationRef} from '../../navigation/RootNavigation';
import {MainStackParams} from '../../navigation/MainScreenStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<
  MainStackParams,
  'UpdateProfile',
  'MyStack'
>;

export default function UpdateProfile({route}: Props) {
  const profileData = route.params.profileData;
  const [username, setUsername] = useState<string>(profileData?.userName);
  const [about, setAbout] = useState<string>(profileData?.bio);
  const [isShowUploadProfile, setIsShowUploadProfile] =
    useState<boolean>(false);
  const [images, setImages] = useState<any | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {user} = useAppSelector(state => state.user);
  const {setIsShowToast, setToastMessage, setType} =
    useContext(ModalToastContext);

  const openToast = (toastType: 'success' | 'error', message: string) => {
    setIsShowToast(true);
    setType(toastType);
    setToastMessage(message);
  };

  const onPickImage = async () => {
    setIsShowUploadProfile(true);
  };

  const closePickImage = async () => {
    setIsShowUploadProfile(false);
  };

  const onAvatarChange = (image: any) => {
    setImages(image);
  };

  const updateProfileList = async () => {
    setIsLoading(true);
    try {
      let formData = new FormData();
      formData.append('file', `data:${images?.mime};base64,${images?.data}`);
      const response = await ProfileService.updateProflie({
        payload: {
          customer_id: user?.id,
          username: username,
          photo_url: profileData?.photoUrl,
          bio: about,
          is_base_64: images?.data ? true : false,
        },
        data: formData,
      });
      openToast('success', response.message);
      navigationRef.navigate('Profile' as never);
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      openToast('error', err.response.data.message || 'Internal Error');
    }
  };

  return (
    <Layout>
      <Header
        hasBackBtn
        transparent
        title="Update Profile"
        titleStyle={styles.title}
      />
      <Gap height={15} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="bg-grey-one rounded-lg p-3 mx-5">
          <DefaultText
            title="Profile Picture"
            titleClassName="font-inter-semibold"
          />
          <Gap height={10} />
          <View className="flex-row items-center">
            <View className="bg-neutral-400 w-[64] h-[64] rounded-full justify-center items-center mr-3">
              <Avatar
                onChange={onAvatarChange}
                onPickImage={closePickImage}
                visible={isShowUploadProfile}
                source={
                  profileData?.photoUrl ? profileData?.photoUrl : IcProfile
                }
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => onPickImage()}
              className="bg-primary px-3 py-2 rounded-[4px] flex-row items-center">
              <DefaultText title="Upload" />
              <Gap width={5} />
              <Image
                source={IcPencil}
                resizeMode="contain"
                className="w-[16] h-[16]"
              />
            </TouchableOpacity>
          </View>
          <Gap height={15} />
          <DefaultText
            title="Update User Name"
            titleClassName="font-inter-semibold"
          />
          <View className="bg-screen p-3 rounded-md border-[1px] border-neutral-700">
            <TextInput
              placeholder="My name"
              placeholderTextColor="#898E9A"
              className="m-0 p-0 font-inter-regular text-white"
              value={username}
              onChangeText={value => setUsername(value)}
            />
          </View>
          <Gap height={15} />
          <DefaultText
            title="About your self"
            titleClassName="font-inter-semibold"
          />
          <Gap height={10} />
          <View className="bg-screen py-2 px-3 rounded-md border-[1px] border-neutral-700 min-h-[100]">
            <TextInput
              placeholder="information here"
              placeholderTextColor="#898E9A"
              multiline={true}
              textAlignVertical="top"
              className="m-0 p-0 font-inter-regular text-base text-white"
              value={about}
              onChangeText={value => value?.length <= 150 && setAbout(value)}
            />
          </View>
          <DefaultText
            title={`${about?.length}/150`}
            titleClassName="font-inter-regular text-xs text-neutral-400 self-end mt-1"
          />
        </View>
      </ScrollView>

      {isLoading ? (
        <Loading />
      ) : (
        <TouchableOpacity
          className="mt-3"
          activeOpacity={0.8}
          onPress={() => updateProfileList()}>
          <LinearGradient
            className="py-4"
            colors={['#AA5AFA', '#C111D5']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <DefaultText
              title="Update"
              titleClassName="text-base font-inter-bold text-center"
            />
          </LinearGradient>
        </TouchableOpacity>
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.white,
  },
  image: {
    paddingTop: 20,
    height: 100,
    width: 100,
    borderRadius: 100,
    padding: 20,
  },
  inputText: {
    fontFamily: 'inter-regular',
    fontSize: 16,
  },
});

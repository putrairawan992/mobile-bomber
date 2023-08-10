import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {DefaultText, Gap, Layout} from '../../components/atoms';
import {Header} from '../../components/molecules';
import colors from '../../styles/colors';
import {IcPencil, IcProfile} from '../../theme/Images';
import LinearGradient from 'react-native-linear-gradient';

export default function UpdateProfile() {
  const [about, setAbout] = useState<string>('');

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
            titleClassName="font-poppins-semibold"
          />
          <Gap height={10} />
          <View className="flex-row items-center">
            <View className="bg-neutral-400 w-[64] h-[64] rounded-full justify-center items-center mr-3">
              <Image
                source={IcProfile}
                className="w-[24] h-[24]"
                style={styles.image}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
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
            title="About your self"
            titleClassName="font-poppins-semibold"
          />
          <Gap height={10} />
          <View className="bg-screen py-2 px-3 rounded-md border-[1px] border-neutral-700 min-h-[100]">
            <TextInput
              placeholder="information here"
              placeholderTextColor="#898E9A"
              multiline={true}
              textAlignVertical="top"
              className="m-0 p-0 font-poppins-regular text-base text-white"
              value={about}
              onChangeText={value => value.length <= 150 && setAbout(value)}
            />
          </View>
          <DefaultText
            title={`${about.length}/150`}
            titleClassName="font-poppins-regular text-xs text-neutral-400 self-end mt-1"
          />
        </View>
      </ScrollView>

      <TouchableOpacity className="mt-3" activeOpacity={0.8} onPress={() => {}}>
        <LinearGradient
          className="py-4"
          colors={['#AA5AFA', '#C111D5']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <DefaultText
            title="Next"
            titleClassName="text-base font-inter-bold text-center"
          />
        </LinearGradient>
      </TouchableOpacity>
    </Layout>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.white,
  },
  image: {
    tintColor: colors.gumbo,
  },
  inputText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
});

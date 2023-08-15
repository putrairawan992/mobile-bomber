import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {DefaultText, Gap, Layout} from '../../components/atoms';
import {Header} from '../../components/molecules';
import colors from '../../styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import {IcPicture, IcUploadSecond} from '../../theme/Images';
import {navigationRef} from '../../navigation/RootNavigation';

export default function VerificationID2() {
  return (
    <Layout>
      <Header
        hasBackBtn
        transparent
        title="Verification"
        titleStyle={styles.title}
      />
      <Gap height={15} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 py-2">
          <View className="bg-grey-one rounded-lg p-3">
            <DefaultText
              title="Verification ID"
              titleClassName="font-inter-bold text-xs text-yellow-600"
            />
            <Gap height={5} />
            <DefaultText
              title="By verifying your ID, you not only protect your account but also gain access to a world of exclusive experiences and opportunities. Don't miss out on the advantages of being a verified member!"
              titleClassName="text-xs"
            />
          </View>
          <Gap height={20} />
          <DefaultText title={'2/3'} titleClassName="font-inter-bold text-xs" />
          <Gap height={10} />
          <View className="flex-row items-center mb-2">
            <Image
              source={IcPicture}
              resizeMode="contain"
              className="w-[16] h-[13]"
            />
            <DefaultText
              title="Photo of the ID (Front)"
              titleClassName="flex-1 ml-2"
            />
          </View>
          <View className="bg-grey-one rounded-lg p-5 border-[2px] border-neutral-400 border-dotted">
            <Image
              source={IcUploadSecond}
              resizeMode="contain"
              className="w-[48] h-[48] self-center"
            />
            <Gap height={10} />
            <DefaultText
              title="Upload your ID Card"
              titleClassName="font-inter-bold text-lg text-center"
            />
            <Gap height={10} />
            <TouchableOpacity
              activeOpacity={0.7}
              className="border-b-[1px] border-b-white self-center">
              <DefaultText title="Browse files" titleClassName="" />
            </TouchableOpacity>
          </View>

          <Gap height={15} />
          <View className="flex-row items-center mb-2">
            <Image
              source={IcPicture}
              resizeMode="contain"
              className="w-[16] h-[13]"
            />
            <DefaultText
              title="Photo of the ID (Back)"
              titleClassName="flex-1 ml-2"
            />
          </View>
          <View className="bg-grey-one rounded-lg p-5 border-[2px] border-neutral-400 border-dotted">
            <Image
              source={IcUploadSecond}
              resizeMode="contain"
              className="w-[48] h-[48] self-center"
            />
            <Gap height={10} />
            <DefaultText
              title="Upload your ID Card"
              titleClassName="font-inter-bold text-lg text-center"
            />
            <Gap height={10} />
            <TouchableOpacity
              activeOpacity={0.7}
              className="border-b-[1px] border-b-white self-center">
              <DefaultText title="Browse files" titleClassName="" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        className="mt-3"
        activeOpacity={0.8}
        onPress={() => navigationRef.navigate('VerificationID3' as never)}>
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
  titleInfo: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
});
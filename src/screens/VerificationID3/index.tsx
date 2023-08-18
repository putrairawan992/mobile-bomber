import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, DefaultText, Gap, Layout} from '../../components/atoms';
import {Header} from '../../components/molecules';
import colors from '../../styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import {navigationRef} from '../../navigation/RootNavigation';
import {StackActions} from '@react-navigation/native';
import {IcCheckRounded} from '../../theme/Images';

export default function VerificationID3() {
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [isLoadImage, setIsLoadImage] = useState<boolean>(false);
  const [isDetected, setIsDetected] = useState<boolean>(false);
  const [isBiometric, setIsBiometric] = useState<boolean>(false);

  useEffect(() => {
    setIsLoadImage(true);
    setIsDetected(true);
    setIsBiometric(true);
  }, []);

  if (showCamera) {
    return (
      <Layout>
        <Header
          hasBackBtn
          transparent
          title="Verification"
          titleStyle={styles.title}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="px-5 py-2">
            <View className="bg-grey-one rounded-lg p-4">
              <DefaultText
                title="Facial Recognition"
                titleClassName="font-inter-bold"
              />
              <Gap height={10} />
              <View className="flex-row items-center">
                <DefaultText
                  title="Loading image"
                  titleClassName="text-xs flex-1"
                />
                {isLoadImage && (
                  <>
                    <DefaultText
                      title=".........."
                      titleClassName="text-xs text-green-400 mr-1"
                    />
                    <Image
                      source={IcCheckRounded}
                      resizeMode="contain"
                      className="w-[12] h-[12] mt-1"
                    />
                  </>
                )}
              </View>
              <Gap height={5} />
              <View className="flex-row items-center">
                <DefaultText
                  title="Processing facial recognition detection"
                  titleClassName="text-xs flex-1"
                />
                {isDetected && (
                  <>
                    <DefaultText
                      title=".........."
                      titleClassName="text-xs text-green-400 mr-1"
                    />
                    <Image
                      source={IcCheckRounded}
                      resizeMode="contain"
                      className="w-[12] h-[12] mt-1"
                    />
                  </>
                )}
              </View>
              <Gap height={5} />
              <View className="flex-row items-center">
                <DefaultText
                  title="Analyzing biometric characteristic"
                  titleClassName="text-xs flex-1"
                />
                {isBiometric && (
                  <>
                    <DefaultText
                      title=".........."
                      titleClassName="text-xs text-green-400 mr-1"
                    />
                    <Image
                      source={IcCheckRounded}
                      resizeMode="contain"
                      className="w-[12] h-[12] mt-1"
                    />
                  </>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </Layout>
    );
  }

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
          <DefaultText title={'3/3'} titleClassName="font-inter-bold text-xs" />
          <Gap height={10} />

          <View className="bg-grey-one rounded-lg p-4">
            <Button
              type="primary"
              TextComponent={
                <DefaultText
                  title="Face Recognition"
                  titleClassName="text-base font-poppins-regular"
                />
              }
              onPress={() => setShowCamera(true)}
            />
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        className="mt-3"
        activeOpacity={0.8}
        onPress={() => navigationRef.dispatch(StackActions.pop(2))}>
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

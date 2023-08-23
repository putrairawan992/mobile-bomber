import * as React from 'react';
import {DefaultText, Gap, GradientText, Layout} from '../components/atoms';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  IcBusinessHub,
  IcChevronRight,
  IcHelp,
  IcIdCard,
  IcInbox,
  IcLegal,
  IcLogOut,
  IcMembership,
  IcNotification,
  IcPencil,
  IcPrivacy,
  IcProfile,
  IcSetting,
  IcStar,
  IcWallet,
} from '../theme/Images';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import colors from '../styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import CardProfileMenu from '../components/molecules/Card/CardProfileMenu';
import {navigationRef} from '../navigation/RootNavigation';
import {handleLogOut} from '../store/user/userActions';
import {removeStorage} from '../service/mmkvStorage';
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {useAppSelector} from '../hooks/hooks';

function ProfileScreen() {
  const {user} = useAppSelector(state => state.user);
  const dispatch = useDispatch();
  const onLogOut = async () => {
    await removeStorage('refreshToken');
    await removeStorage('userAuth');
    await auth().signOut();
    dispatch(handleLogOut());
  };
  return (
    <Layout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 py-3">
          <View className="flex-row">
            <View className="bg-neutral-400 w-[64] h-[64] rounded-full justify-center items-center">
              <Image source={IcProfile} className="w-[24] h-[24]" />
            </View>
            <Gap width={10} />
            <View>
              <View className="flex-row items-center">
                <DefaultText
                  title={'Jean Chen'}
                  titleClassName="font-inter-bold text-2xl"
                />
                <Gap width={5} />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    navigationRef.navigate('UpdateProfile' as never)
                  }>
                  <Image source={IcPencil} className="w-[16] h-[16]" />
                </TouchableOpacity>
              </View>
              <DefaultText
                title={`@${user.username}`}
                titleClassName="text-neutral-400 text-xs"
              />
              <Gap height={8} />
              <View className="bg-red-700 rounded-[4px] px-2 py-[6px] self-start">
                <DefaultText
                  title={'Not verified'}
                  titleClassName="font-inter-medium text-xs"
                />
              </View>
            </View>
          </View>

          <DefaultText
            title="Description not updated yet"
            titleClassName="my-5 text-neutral-400"
          />

          <View className="flex-row items-center bg-grey-one rounded-lg p-3">
            <View className="flex-1">
              <DefaultText
                title="Valid until dec 2023"
                titleClassName="text-[10px]"
              />
              <Gap height={10} />
              <GradientText
                colors={['#fff', '#4D4D4D']}
                style={styles.textGredient}>
                VIP - Silver
              </GradientText>
              <Gap height={10} />
              <TouchableOpacity
                activeOpacity={0.7}
                className="flex-row items-center"
                onPress={() => {}}>
                <DefaultText title="check detail mission" />
                <Gap width={5} />
                <Image
                  source={IcChevronRight}
                  className="w-[12] h-[12]"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <View className="items-center">
              <AnimatedCircularProgress
                size={60}
                width={5}
                fill={50}
                tintColor="#D4B462"
                backgroundColor={colors.white}>
                {fill => (
                  <GradientText
                    xAxis={0.8}
                    colors={['#D4B462', '#fff']}
                    style={styles.textPercent}>
                    {fill}%
                  </GradientText>
                )}
              </AnimatedCircularProgress>
              <Gap height={5} />
              <DefaultText
                title={'2/4 Task done'}
                titleClassName="font-inter-medium text-xs"
              />
            </View>
          </View>

          <Gap height={20} />
          <View className="flex-row">
            <TouchableOpacity activeOpacity={0.7} className="flex-1">
              <LinearGradient
                colors={['#AA5AFA', '#C111D5']}
                className="p-3 rounded-md flex-row items-center justify-center">
                <Image
                  source={IcStar}
                  resizeMode="contain"
                  className="w-[20] h-[20]"
                />
                <DefaultText
                  title="Membership"
                  titleClassName="font-inter-medium text-[10px] ml-1"
                />
              </LinearGradient>
            </TouchableOpacity>
            <Gap width={20} />
            <TouchableOpacity
              activeOpacity={0.7}
              className="flex-1"
              onPress={() => navigationRef.navigate('PaymentPage' as never)}>
              <LinearGradient
                colors={['#5980E9', '#70ACBB']}
                className="p-3 rounded-md flex-row items-center justify-center">
                <Image
                  source={IcWallet}
                  resizeMode="contain"
                  className="w-[20] h-[20]"
                />
                <DefaultText
                  title="Wallet"
                  titleClassName="font-inter-medium text-[10px] ml-1"
                />
              </LinearGradient>
            </TouchableOpacity>
            <Gap width={20} />
            <TouchableOpacity
              activeOpacity={0.7}
              className="flex-1"
              onPress={() => navigationRef.navigate('VerificationID' as never)}>
              <LinearGradient
                colors={['#F38012', '#FEDA18']}
                className="p-3 rounded-md flex-row items-center justify-center">
                <Image
                  source={IcIdCard}
                  resizeMode="contain"
                  className="w-[20] h-[20]"
                />
                <DefaultText
                  title="ID Card"
                  titleClassName="font-inter-medium text-[10px] ml-1"
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <Gap height={20} />
          <View className="w-full h-[0.5px] bg-neutral-600" />
          <Gap height={10} />
          <CardProfileMenu
            icon={IcMembership}
            title="Membership"
            onPress={() => {}}
          />
          <CardProfileMenu
            icon={IcSetting}
            title="Settings"
            onPress={() => {}}
          />
          <CardProfileMenu icon={IcInbox} title="Inbox" onPress={() => {}} />
          <CardProfileMenu
            icon={IcNotification}
            title="Notification"
            onPress={() => {}}
          />
          <CardProfileMenu icon={IcHelp} title="Help" onPress={() => {}} />
          <CardProfileMenu
            icon={IcPrivacy}
            title="Privacy"
            onPress={() => {}}
          />
          <CardProfileMenu icon={IcLegal} title="Legal" onPress={() => {}} />
          <CardProfileMenu
            icon={IcBusinessHub}
            title="Business hub"
            onPress={() => {}}
          />
          <CardProfileMenu icon={IcLogOut} title="Log Out" onPress={onLogOut} />
        </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  textGredient: {
    fontSize: 32,
    fontFamily: 'Inter-SemiBold',
  },
  textPercent: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
});

export default ProfileScreen;

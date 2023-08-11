import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {DefaultText, Gap, GradientText, Layout} from '../../components/atoms';
import {Header} from '../../components/molecules';
import colors from '../../styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import {navigationRef} from '../../navigation/RootNavigation';

export default function VerificationID() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [idNumber, setIdNumber] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');

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
          <DefaultText title={'1/3'} titleClassName="font-inter-bold text-xs" />
          <Gap height={5} />
          <GradientText
            xAxis={0.5}
            colors={['#AA5AFA', '#C111D5']}
            style={styles.titleInfo}>
            Personal Information
          </GradientText>
          <Gap height={10} />
          <View className="bg-grey-one rounded-lg px-3 py-4">
            <DefaultText
              title="First Name"
              titleClassName="font-poppins-regular mb-1"
            />
            <View className="bg-screen p-3 rounded-md border-[1px] border-neutral-700">
              <TextInput
                placeholder="your first name"
                placeholderTextColor="#898E9A"
                className="m-0 p-0 font-poppins-regular text-white"
                value={firstName}
                onChangeText={value => setFirstName(value)}
              />
            </View>
            <Gap height={10} />
            <DefaultText
              title="Last Name"
              titleClassName="font-poppins-regular mb-1"
            />
            <View className="bg-screen p-3 rounded-md border-[1px] border-neutral-700">
              <TextInput
                placeholder="your last name"
                placeholderTextColor="#898E9A"
                className="m-0 p-0 font-poppins-regular text-white"
                value={lastName}
                onChangeText={value => setLastName(value)}
              />
            </View>
            <Gap height={10} />
            <DefaultText
              title="ID number"
              titleClassName="font-poppins-regular mb-1"
            />
            <View className="bg-screen p-3 rounded-md border-[1px] border-neutral-700">
              <TextInput
                placeholder="id number"
                placeholderTextColor="#898E9A"
                className="m-0 p-0 font-poppins-regular text-white"
                value={idNumber}
                onChangeText={value => setIdNumber(value)}
                keyboardType="number-pad"
              />
            </View>
            <Gap height={10} />
            <DefaultText
              title="Birthday"
              titleClassName="font-poppins-regular mb-1"
            />
            <View className="bg-screen p-3 rounded-md border-[1px] border-neutral-700">
              <TextInput
                placeholder="DD/MM/YY"
                placeholderTextColor="#898E9A"
                className="m-0 p-0 font-poppins-regular text-white"
                value={birthday}
                onChangeText={value => setBirthday(value)}
              />
            </View>
            <Gap height={10} />
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        className="mt-3"
        activeOpacity={0.8}
        onPress={() => navigationRef.navigate('VerificationID2' as never)}>
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

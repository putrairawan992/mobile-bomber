import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import DefaultText from '../../../atoms/Text/DefaultText';
import {GradientText, Gap} from '../../../atoms';
import Switch from '../../../atoms/Switch';
import CardWineryOrderCart from '../../Card/CardWineryOrderCart';
import LinearGradient from 'react-native-linear-gradient';
import {IcClock, IcUpload} from '../../../../theme/Images';

interface ModalCartWineryOrder {
  show: boolean;
  hide: () => void;
  onCheckout: () => void;
}

export default function ModalCartWineryOrder({
  show,
  hide,
  onCheckout,
}: ModalCartWineryOrder) {
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [note, setNote] = useState<string>('');
  const [subtitle, setSubtitle] = useState<string>('');

  return (
    <Modal
      className="m-0 p-0"
      isVisible={show}
      onBackButtonPress={hide}
      onBackdropPress={hide}>
      <View className="absolute bottom-0 right-0 left-0 bg-container rounded-t-xl bg-neutral-800 max-h-[600]">
        <Gap height={15} />
        <View className="w-[50] h-[4] rounded-full bg-neutral-600 self-center" />
        <Gap height={15} />
        <GradientText
          colors={['#C800CC', '#A060FA']}
          xAxis={0.15}
          style={styles.titleSong}>
          Cart
        </GradientText>
        <Gap height={15} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="px-4">
            <View className="flex-row">
              <DefaultText
                title="Total"
                titleClassName="flex-1 font-poppins-regular"
              />
              <DefaultText
                title="NT 108.000"
                titleClassName="font-poppins-bold text-primary"
              />
            </View>
            <Gap height={15} />
            <View className="bg-[#2D2D2D] p-4 rounded-lg">
              <View className="flex-row items-center">
                <DefaultText
                  title="Customize Order?"
                  titleClassName="font-inter-bold flex-1"
                />
                <Switch
                  value={isCustom}
                  onValueChange={value => setIsCustom(value)}
                />
              </View>
              {isCustom && (
                <View>
                  <Gap height={15} />
                  <TouchableOpacity
                    activeOpacity={0.7}
                    className="flex-row items-center bg-[#262626] px-3 py-3 rounded-md">
                    <DefaultText
                      title="When we should serve this"
                      titleClassName="font-poppins-regular flex-1 text-[#555f6d]"
                    />
                    <Image
                      source={IcClock}
                      resizeMode="contain"
                      className="w-[20] h-[20]"
                    />
                  </TouchableOpacity>
                  <Gap height={10} />
                  <View className="bg-[#262626] px-3 py-3 rounded-md min-h-[100]">
                    <TextInput
                      className="p-0 m-0 font-poppins-regular"
                      placeholder="Any additional notes? write here"
                      placeholderTextColor="#555f6d"
                      multiline={true}
                      textAlignVertical="top"
                      value={note}
                      onChangeText={value => setNote(value)}
                    />
                  </View>
                  <Gap height={10} />
                  <TouchableOpacity
                    activeOpacity={0.7}
                    className="flex-row items-center bg-[#262626] px-3 py-3 rounded-md">
                    <DefaultText
                      title="Click to upload image"
                      titleClassName="font-poppins-regular flex-1"
                    />
                    <Image
                      source={IcUpload}
                      resizeMode="contain"
                      className="w-[20] h-[20]"
                    />
                  </TouchableOpacity>
                  <Gap height={10} />
                  <View className="bg-[#262626] px-3 py-3 rounded-md">
                    <TextInput
                      className="p-0 m-0 font-poppins-regular"
                      placeholder="Subtitle"
                      placeholderTextColor="#555f6d"
                      value={subtitle}
                      onChangeText={value => setSubtitle(value)}
                    />
                  </View>
                </View>
              )}
            </View>
            <Gap height={15} />
            <CardWineryOrderCart />
            <CardWineryOrderCart />
          </View>
        </ScrollView>
        <TouchableOpacity
          className="mt-3"
          activeOpacity={0.8}
          onPress={() => {
            hide();
            setTimeout(() => onCheckout(), 1000);
          }}>
          <LinearGradient
            className="py-4"
            colors={['#AA5AFA', '#C111D5']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <DefaultText
              title="Check out"
              titleClassName="text-base font-inter-bold text-center"
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
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

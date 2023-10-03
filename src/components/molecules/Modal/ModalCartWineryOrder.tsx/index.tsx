import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import DefaultText from '../../../atoms/Text/DefaultText';
import {GradientText, Gap, Button} from '../../../atoms';
import Switch from '../../../atoms/Switch';
import CardWineryOrderCart from '../../Card/CardWineryOrderCart';
import LinearGradient from 'react-native-linear-gradient';
import {IcClock, IcPencil, IcTv, IcUpload} from '../../../../theme/Images';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {Close} from '../../../../assets/icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import {formatCurrency} from '../../../../utils/currency';

interface ModalCartWineryOrder {
  show: boolean;
  hide: () => void;
  onCheckout: () => void;
  actionChangeGet:any;
  selectedCart: any;
}

export default function ModalCartWineryOrder({
  show,
  hide,
  onCheckout,
  selectedCart,
  actionChangeGet
}: ModalCartWineryOrder) {
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [isCustomComplete, setIsCustomComplete] = useState<boolean>(false);
  const [isVipMessage, setIsVipMessage] = useState<boolean>(false);
  const [isVipMessageComplete, setIsVipMessageComplete] =
    useState<boolean>(false);
  const [note, setNote] = useState<string>('');
  const [subtitle, setSubtitle] = useState<string>('');
  const [image, setImage] = useState<Asset | undefined>();
  const [data, setData] = useState<any[]>(selectedCart);
  const [showTime, setShowTime] = useState<boolean>(false);
  const [time, setTime] = useState<string>('');
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [getPriceWinny, setGetPriceWinnty] = useState<number>(0);

  useEffect(() => {
    setData(selectedCart);
  }, [selectedCart]);

  useEffect(() => {
    setTotalPrice(totalPrice - getPriceWinny);
  }, [getPriceWinny]);

  const onPickImage = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (result.assets) {
      setImage(result.assets[0]);
    }
  };

  const actionAkumulasi = (values: number, price: number) => {
    setTotalPrice(price * values);
  };

  const onConfirmTime = (selectedTime: any) => {
    setShowTime(false);
    setTime(dayjs(selectedTime).format('HH:mm'));
  };

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
                title={`NT ${formatCurrency(String(totalPrice ?? ''))}`}
                titleClassName="font-poppins-bold text-primary"
              />
            </View>
            <Gap height={4} />
            <View className="flex-row items-center">
              <GradientText
                colors={['#f57600', '#FEDA18']}
                style={styles.vipMessage}>
                NDT 5,000 more to get VIP Message
              </GradientText>
              <Image
                source={IcTv}
                resizeMode="contain"
                className="w-[16] h-[16] ml-1"
              />
            </View>
            <Gap height={15} />
            <View className="bg-[#2D2D2D] p-4 rounded-lg">
              <View className="flex-row items-center">
                <DefaultText
                  title="Additional Message"
                  titleClassName="font-inter-bold flex-1"
                />
                {isCustomComplete ? (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setIsCustom(true)}>
                    <Image
                      source={IcPencil}
                      resizeMode="contain"
                      className="w-[20] h-[20]"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                ) : (
                  <Switch
                    value={isCustom}
                    onValueChange={value => setIsCustom(value)}
                  />
                )}
              </View>
              {isCustom && (
                <View>
                  <Gap height={15} />
                  <TouchableOpacity
                    activeOpacity={0.7}
                    className="flex-row items-center bg-[#262626] px-3 py-3 rounded-md"
                    onPress={() => setShowTime(true)}>
                    <DefaultText
                      title={
                        time.length > 0 ? time : 'When we should serve this'
                      }
                      titleClassName={
                        time.length > 0
                          ? 'font-poppins-regular flex-1 text-white'
                          : 'font-poppins-regular flex-1 text-[#555f6d]'
                      }
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
                      className="p-0 m-0 font-poppins-regular text-white"
                      placeholder="Any additional notes? write here"
                      placeholderTextColor="#555f6d"
                      multiline={true}
                      textAlignVertical="top"
                      value={note}
                      onChangeText={value => setNote(value)}
                    />
                  </View>
                  <Gap height={10} />
                  <Button
                    style={styles.button}
                    type="primary"
                    TextComponent={
                      <DefaultText
                        title="Save"
                        titleClassName="font-inter-medium"
                      />
                    }
                    onPress={() => {
                      setIsCustom(false);
                      setIsCustomComplete(true);
                    }}
                  />
                  <Gap height={10} />
                  <TouchableOpacity
                    activeOpacity={0.7}
                    className="self-center"
                    onPress={() => {
                      setIsCustom(false);
                      setIsCustomComplete(false);
                    }}>
                    <DefaultText title="Cancel" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <Gap height={15} />
            <View className="bg-[#2D2D2D] p-4 rounded-lg">
              <View className="flex-row items-center">
                <DefaultText
                  title="VIP Message"
                  titleClassName="font-inter-bold flex-1"
                />
                {isVipMessageComplete ? (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setIsVipMessage(true)}>
                    <Image
                      source={IcPencil}
                      resizeMode="contain"
                      className="w-[20] h-[20]"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                ) : (
                  <Switch
                    value={isVipMessage}
                    onValueChange={value => setIsVipMessage(value)}
                  />
                )}
              </View>
              {isVipMessage && (
                <View>
                  <Gap height={15} />
                  {image?.uri ? (
                    <View className="self-start">
                      <TouchableOpacity
                        activeOpacity={0.7}
                        className="bg-white/30 absolute z-10 right-2
                        top-2 rounded-full"
                        onPress={() => setImage(undefined)}>
                        <Close color="#000" size={20} />
                      </TouchableOpacity>
                      <Image
                        source={{
                          uri:
                            Platform.OS === 'ios'
                              ? image.uri?.replace('file://', '/')
                              : image.uri,
                        }}
                        resizeMode="cover"
                        className="w-[221] h-[147] rounded-[8px]"
                      />
                    </View>
                  ) : (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      className="flex-row items-center bg-[#262626] px-3 py-3 rounded-md"
                      onPress={onPickImage}>
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
                  )}

                  <Gap height={10} />
                  <View className="bg-[#262626] px-3 py-3 rounded-md">
                    <TextInput
                      className="p-0 m-0 font-poppins-regular text-white"
                      placeholder="Subtitle"
                      placeholderTextColor="#555f6d"
                      value={subtitle}
                      onChangeText={value => setSubtitle(value)}
                    />
                  </View>
                  <Gap height={15} />
                  <Button
                    style={styles.button}
                    type="primary"
                    TextComponent={
                      <DefaultText
                        title="Save"
                        titleClassName="font-inter-medium"
                      />
                    }
                    onPress={() => {
                      setIsVipMessage(false);
                      setIsVipMessageComplete(true);
                    }}
                  />
                  <Gap height={10} />
                  <TouchableOpacity
                    activeOpacity={0.7}
                    className="self-center"
                    onPress={() => {
                      setIsVipMessage(false);
                      setIsVipMessageComplete(false);
                    }}>
                    <DefaultText title="Cancel" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <Gap height={15} />
            {data.map((item, key) => {
              return (
                <CardWineryOrderCart
                  data={item}
                  actionAkumulasi={actionAkumulasi}
                  key={key}
                  onRemove={(e) => {
                    setData(
                      data.filter((dt: any, index: any) => index !== key),
                    );
                    // actionChangeGet({...item, quantity: e })
                    setGetPriceWinnty(item?.price);
                  }}
                />
              );
            })}
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

        <DateTimePickerModal
          isVisible={showTime}
          is24Hour={true}
          locale="en_GB"
          mode="time"
          onCancel={() => setShowTime(false)}
          onConfirm={onConfirmTime}
        />
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
  vipMessage: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  button: {
    height: 35,
    paddingVertical: 0,
    borderRadius: 4,
  },
  icon: {
    tintColor: '#F38012',
  },
});

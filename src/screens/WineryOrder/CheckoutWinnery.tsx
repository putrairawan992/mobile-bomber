import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {MainStackParams} from '../../navigation/MainScreenStack';
import {
  Button,
  DefaultText,
  Gap,
  Layout,
  Section,
  Text,
} from '../../components/atoms';
import {Header} from '../../components/molecules';
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {currency} from '../../utils/function';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import LinearGradient from 'react-native-linear-gradient';
import dayjs from 'dayjs';
import {IcClock, IcPencil, IcUpload} from '../../theme/Images';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {Close} from '../../assets/icons';
import ModalCartWineryUpdateOrder from '../../components/molecules/Modal/ModalCartWineryUpdateOrder.tsx';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {Colors} from '../../theme';
import useTheme from '../../theme/useTheme';
import ModalWineryOrderPayV2 from '../../components/molecules/Modal/ModalWineryOrderPay/ModalWineryOrderPayV2';

type Props = NativeStackScreenProps<
  MainStackParams,
  'CheckoutWinnery',
  'MyStack'
>;

type Product = {
  chineseProductTitle: string;
  englishProductTitle: string;
  imageUrl: string;
  price: number;
  productId: string;
  quantity: number;
};

export default function CheckoutWinnery({route, navigation}: Props) {
  const checkoutItems = route.params.data;
  const totalPrices = route.params.totalPrice;
  const [showPay, setIsShowPay] = useState<boolean>(false);
  const [data, setData] = useState<any[]>(checkoutItems);
  const [selectedCart, setSelectedCart] = useState<any>();
  const [totalPrice, setTotalPrice] = useState<number>(totalPrices);
  const [showTime, setShowTime] = useState<boolean>(false);
  const [time, setTime] = useState<string>('');
  const [image, setImage] = useState<Asset | undefined>();
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [isVipMessage, setIsVipMessage] = useState<boolean>(false);
  const [subtitle, setSubtitle] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const homeSheetOrderRef = React.useRef<BottomSheetModal>(null);
  const [sheetOrderIndex, setSheetOrderIndex] = React.useState<number>(-1);
  const theme = useTheme();

  useEffect(() => {
    setData(checkoutItems);
  }, [checkoutItems]);

  useEffect(() => {
    const res = calculateTotalQuantityAndPrice(data).totalPrice;
    setTotalPrice(res);
  }, [data]);

  const calculateTotalQuantityAndPrice = (
    products: Product[],
  ): {totalQuantity: number; totalPrice: number} => {
    const result = products.reduce(
      (accumulator, producta) => {
        accumulator.totalQuantity += producta.quantity;
        accumulator.totalPrice += producta.price * producta.quantity;
        return accumulator;
      },
      {totalQuantity: 0, totalPrice: 0},
    );

    return result;
  };

  const actionAkumulasi = (ket: string, values: number, item: Product) => {
    if (ket === '') {
      const res = calculateTotalQuantityAndPrice(data).totalPrice;
      setTotalPrice(res);
    } else {
      item.quantity = values;
      const res = calculateTotalQuantityAndPrice(data).totalPrice;
      setTotalPrice(res);
    }
  };

  const onConfirmTime = (selectedTime: any) => {
    setShowTime(false);
    setTime(dayjs(selectedTime).format('HH:mm'));
  };

  const onPickImage = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (result.assets) {
      setImage(result.assets[0]);
    }
  };

  const handleSheetOrderChanges = React.useCallback((index: number) => {
    setSheetOrderIndex(index);
  }, []);

  return (
    <Layout>
      <Header transparent title="Cart" hasBackBtn />
      <ScrollView>
        <Section padding="8px 16px">
          <LinearGradient
            style={{borderRadius: 4, padding: 8}}
            colors={['#AA5AFA', '#C111D5']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <DefaultText
              title="Congratulation you get a legit"
              titleClassName="text-xs font-inter-medium text-center"
            />
          </LinearGradient>
        </Section>
        <Section padding="8px 16px" isRow isBetween>
          <DefaultText
            title="Total"
            titleClassName="flex-1 font-inter-regular"
          />
          <DefaultText
            title={currency(totalPrice)}
            titleClassName="font-inter-bold text-primary"
          />
        </Section>
        <Gap height={15} />
        <Section padding="8px 16px">
          <View className="bg-[#2D2D2D] p-2 rounded-lg">
            <View className="flex-row items-center">
              <DefaultText
                title="Notes for kitchen"
                titleClassName="font-inter-bold flex-1"
              />
              <TouchableOpacity
                onPress={() => setIsCustom(true)}
                activeOpacity={0.7}>
                <Image
                  source={IcPencil}
                  resizeMode="contain"
                  className="w-[20] h-[20]"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
            {isCustom && (
              <View>
                <Gap height={15} />
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="flex-row items-center bg-[#262626] px-3 py-3 rounded-md"
                  onPress={() => setShowTime(true)}>
                  <DefaultText
                    title={time.length > 0 ? time : 'When we should serve this'}
                    titleClassName={
                      time.length > 0
                        ? 'font-inter-regular flex-1 text-white'
                        : 'font-inter-regular flex-1 text-[#555f6d]'
                    }
                  />
                  <Image
                    source={IcClock}
                    resizeMode="contain"
                    className="w-[20] h-[20]"
                  />
                </TouchableOpacity>
                <Gap height={10} />
                <View className="rounded-md">
                  <TextInput
                    className="font-inter-regular text-white"
                    placeholder="Any additional notes? write here"
                    placeholderTextColor="#555f6d"
                    style={{
                      backgroundColor: '#262626',
                      borderRadius: 8,
                    }}
                    multiline={true}
                    numberOfLines={4}
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
                  }}
                />
                <Gap height={10} />
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="self-center"
                  onPress={() => {
                    setIsCustom(false);
                  }}>
                  <DefaultText title="Cancel" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Section>
        <Section padding="8px 16px">
          <View className="bg-[#2D2D2D] p-2 rounded-lg">
            <View className="flex-row items-center">
              <DefaultText
                title="VIP Message"
                titleClassName="font-inter-bold flex-1"
              />

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
            </View>
            {isVipMessage && (
              <View>
                <Gap height={15} />
                {image?.uri ? (
                  <View className="self-center">
                    <TouchableOpacity
                      activeOpacity={0.7}
                      className="bg-white/30 absolute z-10 right-2 top-2 rounded-full"
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
                      resizeMode="contain"
                      className="w-[300] h-[147] rounded-[8px]"
                    />
                  </View>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    className="flex-row items-center bg-[#262626] px-3 py-3 rounded-md"
                    onPress={onPickImage}>
                    <DefaultText
                      title="Click to upload image"
                      titleClassName="font-inter-regular flex-1"
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
                    className="p-0 m-0 font-inter-regular text-white"
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
                  }}
                />
                <Gap height={10} />
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="self-center"
                  onPress={() => {
                    setIsVipMessage(false);
                  }}>
                  <DefaultText title="Cancel" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Section>
        <Section padding="8px 16px">
          {checkoutItems.map((item: any) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedCart(item);
                  homeSheetOrderRef.current?.present();
                }}>
                <View
                  style={{
                    backgroundColor: '#262626',
                    padding: 12,
                    borderRadius: 8,
                  }}
                  className="flex-row items-center mb-[10]">
                  <Image
                    source={{uri: item?.imageUrl}}
                    style={{
                      height: 80,
                      width: 80,
                      borderRadius: 8,
                    }}
                  />
                  <Gap width={8} />
                  <View className="flex-1">
                    <DefaultText
                      title={`${item.englishProductTitle}`}
                      titleClassName="font-inter-medium"
                    />
                    <Text
                      color="#EC7410"
                      style={{marginLeft: -3}}
                      label={currency(item.price * item.quantity)}
                    />
                  </View>
                  <View
                    style={{
                      backgroundColor: '#EBEBEB',
                      height: 24,
                      width: 24,
                      borderRadius: 50 / 2,
                    }}>
                    <Text
                      color="#1E1E1E"
                      style={{textAlign: 'center', paddingTop: 2, fontSize: 12}}
                      label={item.quantity}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </Section>
      </ScrollView>
      <TouchableOpacity
        className=""
        activeOpacity={0.8}
        onPress={() => {
          setIsShowPay(true);
        }}>
        <LinearGradient
          className="py-4"
          colors={['#AA5AFA', '#C111D5']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <DefaultText
            title="Checkout"
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
      <BottomSheetModal
        ref={homeSheetOrderRef}
        index={0}
        enablePanDownToClose
        snapPoints={['43%']}
        backdropComponent={({style}) =>
          sheetOrderIndex >= 0 ? (
            <Pressable
              onPress={() => homeSheetOrderRef.current?.close()}
              style={[style, {backgroundColor: 'rgba(0, 0, 0, 0.60)'}]}
            />
          ) : (
            <></>
          )
        }
        handleStyle={{
          backgroundColor: theme?.colors.SHEET,
          borderTopRightRadius: 14,
          borderTopLeftRadius: 14,
        }}
        handleIndicatorStyle={{backgroundColor: Colors['black-70']}}
        onChange={handleSheetOrderChanges}>
        <ModalCartWineryUpdateOrder
          data={selectedCart}
          actionAkumulasi={actionAkumulasi}
          hide={() => {
            homeSheetOrderRef.current?.close();
          }}
        />
      </BottomSheetModal>
      <ModalWineryOrderPayV2
        show={showPay}
        checkoutItems={checkoutItems}
        hide={() => {
          setIsShowPay(false);
          navigation.navigate('WineryOrder', {isNotTable: true});
        }}
      />
    </Layout>
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
    tintColor: '#FCFCFC',
  },
});

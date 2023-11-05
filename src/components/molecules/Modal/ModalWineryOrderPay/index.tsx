import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import DefaultText from '../../../atoms/Text/DefaultText';
import {Gap} from '../../../atoms';
import Switch from '../../../atoms/Switch';
import LinearGradient from 'react-native-linear-gradient';
import {FlatList} from 'react-native';
import {Checklist} from '../../../../assets/icons';
import colors from '../../../../styles/colors';
import {currency} from '../../../../utils/function';
import QRCode from 'react-native-qrcode-svg';

interface ModalWineryOrderPay {
  show: boolean;
  hide: () => void;
  onPay: () => void;
  checkoutItems: any;
}

export default function ModalWineryOrderPay({
  show,
  hide,
  onPay,
  checkoutItems,
}: ModalWineryOrderPay) {
  const [splitBill, setSplitBill] = useState<boolean>(false);
  const [payment, setPayment] = useState<string>('visa');
  const [menu] = useState<string[]>(['Equally', 'Customized', 'Weighted']);
  const [initialPage, setInitialPage] = useState<number>(0);

  const calculateTotal = () => {
    let total = 0;
    for (const item of checkoutItems) {
      total += item.price * item.quantity;
    }
    return total;
  };

  return (
    <Modal
      className="m-0 p-0"
      isVisible={show}
      onBackButtonPress={hide}
      onBackdropPress={hide}>
      <View className="absolute bottom-0 right-0 left-0 bg-container rounded-t-xl bg-neutral-800 pt-4 max-h-[700]">
        <View className="w-[50] h-[4] rounded-full bg-neutral-600 self-center" />
        <Gap height={15} />
        <DefaultText
          title="Order Detail"
          titleClassName="font-inter-bold text-base text-center"
        />
        <Gap height={15} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="px-4">
            <View className="bg-[#2D2D2D] p-4 rounded-xl">
              <DefaultText
                title="Items"
                titleClassName="text-base font-inter-semibold"
              />
              <Gap height={10} />
              {checkoutItems.map((item: any) => {
                return (
                  <View className="flex-row items-center mb-[10]">
                    <View className="flex-1">
                      <DefaultText
                        title={`${item.englishProductTitle} x ${item.quantity}`}
                        titleClassName="font-inter-medium"
                      />
                      <DefaultText
                        title="Table code: X3"
                        titleClassName="text-xs font-inter-medium text-neutral-400"
                      />
                    </View>
                    <DefaultText title={currency(item.price * item.quantity)} />
                  </View>
                );
              })}
              <Gap height={10} />
              <View className="flex-row items-center">
                <View className="flex-1">
                  <DefaultText
                    title="Platform Service Fee"
                    titleClassName="font-inter-medium"
                  />
                  <DefaultText
                    title="5%"
                    titleClassName="text-xs font-inter-medium text-neutral-400"
                  />
                </View>
                <DefaultText title={currency(1000)} />
              </View>
              <Gap height={10} />
              <View className="flex-row items-center">
                <View className="flex-1">
                  <DefaultText title="TOTAL" titleClassName="font-inter-bold" />
                </View>
                <DefaultText
                  title={`${currency(calculateTotal() + 1000)}`}
                  titleClassName="font-inter-bold"
                />
              </View>
            </View>
            <Gap height={10} />
            <View className="px-4">
              <DefaultText
                title="Public QR"
                titleClassName="font-inter-bold text-center"
              />
              <Gap height={10} />
              <DefaultText
                title={
                  'Split bill can be paid by scan this QR,\nask your guest in bill list to scan'
                }
                titleClassName="text-center"
              />
              <Gap height={15} />
              <View className="self-center bg-[#2D2D2D] rounded-lg p-2">
                <QRCode value="http://awesome.link.qr" size={200} />
              </View>
            </View>

            <Gap height={15} />
            <View className="bg-[#2D2D2D] p-4 rounded-xl">
              <View className="flex-row items-center">
                <DefaultText
                  title="Split Bill"
                  titleClassName="font-inter-bold flex-1"
                />
                <Switch
                  value={splitBill}
                  onValueChange={value => setSplitBill(value)}
                />
              </View>

              {splitBill && (
                <>
                  <Gap height={10} />
                  <View>
                    <FlatList
                      horizontal={true}
                      data={menu}
                      keyExtractor={(_, key) => key.toString()}
                      renderItem={({index, item}) => {
                        return (
                          <TouchableOpacity
                            onPress={() => setInitialPage(index)}
                            activeOpacity={0.7}
                            className="mr-4 py-2">
                            <DefaultText
                              title={item}
                              titleClassName={`text-center ${
                                index === initialPage
                                  ? 'text-primary font-inter-bold'
                                  : 'text-white font-inter-medium'
                              }`}
                            />
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </View>
                  {initialPage === 0 ? (
                    <SplitBill />
                  ) : (
                    <DefaultText
                      title="COOMING SOON"
                      titleClassName="font-inter-bold text-center text-neutral-400 mt-2"
                    />
                  )}
                </>
              )}
            </View>

            <Gap height={15} />
            <View className="bg-[#2D2D2D] p-4 rounded-xl">
              <DefaultText
                title="Payment Method"
                titleClassName="font-inter-bold text-center"
              />
              <Gap height={10} />
              <TouchableOpacity
                className="flex-row items-center"
                onPress={() => setPayment('cash')}>
                {payment === 'cash' ? (
                  <View className="w-[15] h-[15] border-[1px] border-blue-500 rounded-full p-[1]">
                    <View className="w-full h-full rounded-full bg-blue-500" />
                  </View>
                ) : (
                  <View className="w-[15] h-[15] border-[1px] border-white rounded-full" />
                )}
                <Gap width={5} />
                <DefaultText title="Cash" />
              </TouchableOpacity>
              <Gap height={10} />
              <TouchableOpacity
                className="flex-row items-center"
                onPress={() => setPayment('visa')}>
                {payment === 'visa' ? (
                  <View className="w-[15] h-[15] border-[1px] border-blue-500 rounded-full p-[1]">
                    <View className="w-full h-full rounded-full bg-blue-500" />
                  </View>
                ) : (
                  <View className="w-[15] h-[15] border-[1px] border-white rounded-full" />
                )}
                <Gap width={5} />
                <DefaultText title="VISA +64" />
              </TouchableOpacity>
            </View>
            <Gap height={10} />
          </View>
        </ScrollView>
        <TouchableOpacity
          className="mt-3"
          activeOpacity={0.8}
          onPress={() => {
            hide();
            setTimeout(() => onPay(), 1000);
          }}>
          <LinearGradient
            className="py-4"
            colors={['#AA5AFA', '#C111D5']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <DefaultText
              title="Save QR"
              titleClassName="text-base font-inter-bold text-center"
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const SplitBill = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Gap height={10} />
      <DefaultText
        title="Cost per person"
        titleClassName="text-center font-inter-bold text-neutral-500"
      />
      <DefaultText
        title="Total / Number of selected people"
        titleClassName="text-center font-inter-medium text-neutral-500"
      />
      <Gap height={10} />
      <SplitBillItem />
      <SplitBillItem />
      <SplitBillItem />
    </ScrollView>
  );
};

const SplitBillItem = () => {
  const [isCheck, setIsCheck] = useState<boolean>(true);

  return (
    <View className="flex-row items-center border-b-[0.5px] border-b-neutral-600 py-1">
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60',
        }}
        resizeMode="cover"
        className="w-[32] h-[32] rounded-full bg-neutral-500"
      />
      <Gap width={5} />
      <View className="flex-1">
        <DefaultText
          title={'Jennifer'}
          titleClassName="font-inter-semibold text-base"
        />
        <DefaultText
          title={currency(15000)}
          titleClassName="font-inter-regular text-neutral-400"
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setIsCheck(!isCheck)}>
        {isCheck ? (
          <Checklist size={24} color={colors.royalBlue} />
        ) : (
          <View className="w-[22] h-[22] rounded-[4px] border-[1px] border-[#2F80ED]" />
        )}
      </TouchableOpacity>
    </View>
  );
};

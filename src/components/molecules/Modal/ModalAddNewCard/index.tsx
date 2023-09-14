import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import React, {useContext, useState} from 'react';
import Modal from 'react-native-modal';
import DefaultText from '../../../atoms/Text/DefaultText';
import {Gap, Loading} from '../../../atoms';
import {TextInput} from 'react-native';
import {IcMasterCard} from '../../../../theme/Images';
import LinearGradient from 'react-native-linear-gradient';
import {useAppSelector} from '../../../../hooks/hooks';
import {ProfileService} from '../../../../service/ProfileService';
import {ModalToastContext} from '../../../../context/AppModalToastContext';

interface ModalAddNewCard {
  show: boolean;
  hide: () => void;
  onAddNew: () => void;
}

export default function ModalAddNewCard({
  show,
  hide,
  onAddNew,
}: ModalAddNewCard) {
  const [cardHolder, setCardHolder] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expiry, setExpiry] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');
  const {user} = useAppSelector(state => state.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {setIsShowToast, setToastMessage, setType} =
    useContext(ModalToastContext);

  const openToast = (toastType: 'success' | 'error', message: string) => {
    setIsShowToast(true);
    setType(toastType);
    setToastMessage(message);
  };

  const handleInputChange = (input: string) => {
    // Remove all non-numeric characters
    const cleanedInput = input.replace(/\D/g, '');

    // Apply the credit card format (XXXX-XXXX-XXXX-XXXX)
    let formattedInput = '';
    for (let i = 0; i < cleanedInput.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedInput += ' - ';
      }
      formattedInput += cleanedInput.charAt(i);
    }
    setCardNumber(formattedInput);
  };

  const onPress = async () => {
    try {
      setIsLoading(true);
      const res = await ProfileService.addCustomerPaymentList({
        payload: {customer_id: user?.id, card_number: cardNumber},
      });
      openToast('success', res.message);
      setIsLoading(false);
      onAddNew();
    } catch (error: any) {
      openToast('error', error.response.data.message);
    }
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
          title="Add new card"
          titleClassName="font-inter-bold text-base text-center"
        />
        <Gap height={15} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="px-4">
            <DefaultText
              title="Card Holder*"
              titleClassName="font-poppins-regular mb-1"
            />
            <View className="bg-screen p-3 rounded-md border-[1px] border-neutral-700">
              <TextInput
                placeholder="card holder"
                placeholderTextColor="#898E9A"
                className="m-0 p-0 font-poppins-regular text-white"
                value={cardHolder}
                onChangeText={value => setCardHolder(value)}
              />
            </View>
            <Gap height={15} />
            <DefaultText
              title="Credit/debit card number*"
              titleClassName="font-poppins-regular mb-1"
            />
            <View className="bg-screen p-3 rounded-md border-[1px] border-neutral-700 flex-row items-center">
              <Image
                source={IcMasterCard}
                resizeMode="contain"
                className="w-[20] h-[20]"
              />
              <TextInput
                placeholder="XXXX - XXXX - XXXX - XXXX"
                placeholderTextColor="#898E9A"
                className="m-0 p-0 font-poppins-regular text-white flex-1 ml-2"
                value={cardNumber}
                maxLength={25}
                onChangeText={handleInputChange}
                keyboardType="numeric"
              />
            </View>
            <Gap height={15} />
            <View className="flex-row">
              <View className="flex-1">
                <DefaultText
                  title="Expiry*"
                  titleClassName="font-poppins-regular mb-1"
                />
                <View className="bg-screen p-3 rounded-md border-[1px] border-neutral-700">
                  <TextInput
                    placeholder="MM/YY"
                    placeholderTextColor="#898E9A"
                    className="m-0 p-0 font-poppins-regular text-white"
                    value={expiry}
                    onChangeText={value => setExpiry(value)}
                  />
                </View>
              </View>
              <Gap width={15} />
              <View className="flex-1">
                <DefaultText
                  title="CVV*"
                  titleClassName="font-poppins-regular mb-1"
                />
                <View className="bg-screen p-3 rounded-md border-[1px] border-neutral-700">
                  <TextInput
                    placeholder="CVV"
                    placeholderTextColor="#898E9A"
                    className="m-0 p-0 font-poppins-regular text-white"
                    value={cvv}
                    onChangeText={value => setCvv(value)}
                    keyboardType="number-pad"
                  />
                </View>
              </View>
            </View>
          </View>
          <Gap height={50} />
        </ScrollView>
        <TouchableOpacity
          className="mt-3"
          activeOpacity={0.8}
          onPress={onPress}>
          {isLoading ? (
            <Loading />
          ) : (
            <LinearGradient
              className="py-4"
              colors={['#AA5AFA', '#C111D5']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <DefaultText
                title="Add New"
                titleClassName="text-base font-inter-bold text-center"
              />
            </LinearGradient>
          )}
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

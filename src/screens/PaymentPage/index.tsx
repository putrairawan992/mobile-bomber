import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DefaultText, Gap, Layout, Loading} from '../../components/atoms';
import {Header} from '../../components/molecules';
import colors from '../../styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import {IcBomber, IcGift, IcPlusRounded} from '../../theme/Images';
import CardPaymentPage from '../../components/molecules/Card/CardPaymentPage';
import ModalPaymentPage from '../../components/molecules/Modal/ModalPaymentPage';
import ModalAddNewCard from '../../components/molecules/Modal/ModalAddNewCard';
import {ProfileService} from '../../service/ProfileService';
import {useAppSelector} from '../../hooks/hooks';
import {maskCreditCard} from '../../utils/maskedVisa';

export default function ProfilePage() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalAdd, setShowModalAdd] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paymentList, setPaymentList] = useState<any>([]);
  const {user} = useAppSelector(state => state.user);

  useEffect(() => {
    fetchPaymentList(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPaymentList = async () => {
    try {
      setIsLoading(true);
      const response = await ProfileService.getCustomerPaymentList({
        id: user?.id as string,
      });
      setPaymentList(response?.data);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Header
        hasBackBtn
        transparent
        title="Payment Page"
        titleStyle={styles.title}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 py-3">
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#ff937b', '#ff63cf', '#6c64ed']}
            className="p-5 rounded-lg">
            <View className="flex-row">
              <Image
                source={IcBomber}
                resizeMode="contain"
                className="w-[16] h-[16]"
              />
              <Gap width={5} />
              <DefaultText title="Bomber Cash" titleClassName="text-xs" />
              <Gap classname="flex-1" />
              <TouchableOpacity activeOpacity={0.8}>
                <DefaultText
                  title="see history"
                  titleClassName="text-neutral-300"
                />
              </TouchableOpacity>
            </View>
            <Gap height={50} />
            <DefaultText
              title="0 NTD"
              titleClassName="font-inter-bold text-2xl"
            />
            <Gap height={5} />
            <View className="flex-row">
              <Image
                source={IcGift}
                resizeMode="contain"
                className="w-[16] h-[16]"
              />
              <Gap width={5} />
              <DefaultText title="check special redeem" />
            </View>
          </LinearGradient>
          <Gap height={20} />
          <DefaultText
            title="Payment option"
            titleClassName="font-inte-bold text-base"
          />
          <Gap height={10} />
          {isLoading ? (
            <Loading />
          ) : (
            paymentList.map((item: any) => {
              return (
                <CardPaymentPage
                  isDefault={item.isDefault === 1}
                  number={maskCreditCard(item.cardNumber)}
                  onPress={() => setShowModal(true)}
                />
              );
            })
          )}

          <TouchableOpacity
            activeOpacity={0.7}
            className="flex-row bg-[#2f2f2f] h-[52] rounded-md justify-center items-center px-4"
            onPress={() => setShowModalAdd(true)}>
            <Image
              source={IcPlusRounded}
              resizeMode="contain"
              className="h-[16] w-[19]"
            />
            <DefaultText
              title={'Add new card'}
              titleClassName="font-inter-medium flex-1 ml-2"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <ModalPaymentPage
        show={showModal}
        hide={() => setShowModal(false)}
        onRemoveCard={() => setShowModal(false)}
        onCheckHistory={() => setShowModal(false)}
      />

      <ModalAddNewCard
        show={showModalAdd}
        hide={() => setShowModalAdd(false)}
        onAddNew={() => setShowModalAdd(false)}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.white,
  },
});

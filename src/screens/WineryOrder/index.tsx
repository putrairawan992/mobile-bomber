import React, {createRef, useState} from 'react';
import {Layout, Spacer, TextInput} from '../../components/atoms';
import {Header} from '../../components/molecules';
import PagerView from 'react-native-pager-view';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import DefaultText from '../../components/atoms/Text/DefaultText';
import Champagne from './Champagne';
import Gin from './Gin';
import Vodka from './Vodka';
import Whiskey from './Whiskey';
import Beer from './Beer';
import LinearGradient from 'react-native-linear-gradient';
import ModalCartWineryOrder from '../../components/molecules/Modal/ModalCartWineryOrder.tsx';
import ModalWineryOrderPay from '../../components/molecules/Modal/ModalWineryOrderPay';
import ModalWineryOrderBillGenerator from '../../components/molecules/Modal/ModalWineryOrderBillGenerator';
import ModalWineryOrderDetail from '../../components/molecules/Modal/ModalWineryOrderDetail';

export default function WineryOrder() {
  const [menu] = useState<string[]>([
    'Champagne',
    'Gin',
    'Vodka',
    'Whiskey',
    'Beer',
  ]);
  const [initialPage, setInitialPage] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const [showCart, setShowCart] = useState<boolean>(false);
  const [showPay, setShowPay] = useState<boolean>(false);
  const [showBillGenerator, setShowBillGenerator] = useState<boolean>(false);
  const [showOrderDetail, setShowOrderDetail] = useState<boolean>(false);

  const ref = createRef<PagerView>();

  return (
    <Layout>
      <Header transparent title="" hasBackBtn />
      <Spacer height={30} />
      <View className="px-3">
        <TextInput
          placeholder="Search spirit"
          type="search"
          textInputBackgroundColor="transparent"
          value={search}
          onChangeText={value => setSearch(value)}
          containerStyle={styles.inputContainer}
        />
      </View>
      <Spacer height={10} />
      <View>
        <FlatList
          horizontal={true}
          data={menu}
          keyExtractor={(_, key) => key.toString()}
          renderItem={({index, item}) => {
            return (
              <TouchableOpacity
                onPress={() => ref.current?.setPage(index)}
                activeOpacity={0.7}
                className={`py-3 px-6 border-b-[2px] ${
                  index === initialPage ? 'border-b-primary' : 'border-b-white'
                }`}>
                <DefaultText
                  title={item}
                  titleClassName={`text-center font-inter-medium ${
                    index === initialPage ? 'text-primary' : 'text-white'
                  }`}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <PagerView
        className="flex-1"
        initialPage={initialPage}
        ref={ref}
        onPageSelected={e => setInitialPage(e.nativeEvent.position)}>
        <View key="1">
          <Champagne />
        </View>
        <View key="2">
          <Gin />
        </View>
        <View key="3">
          <Vodka />
        </View>
        <View key="4">
          <Whiskey />
        </View>
        <View key="5">
          <Beer />
        </View>
      </PagerView>

      <TouchableOpacity activeOpacity={0.8} onPress={() => setShowCart(true)}>
        <LinearGradient
          className="py-4"
          colors={['#AA5AFA', '#C111D5']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <DefaultText
            title="View Cart"
            titleClassName="text-base font-inter-bold text-center"
          />
        </LinearGradient>
      </TouchableOpacity>

      <ModalCartWineryOrder
        show={showCart}
        hide={() => setShowCart(false)}
        onCheckout={() => setShowPay(true)}
      />

      <ModalWineryOrderPay
        show={showPay}
        hide={() => setShowPay(false)}
        onPay={() => setShowBillGenerator(true)}
      />

      <ModalWineryOrderBillGenerator
        show={showBillGenerator}
        hide={() => setShowBillGenerator(false)}
        onBack={() => setShowPay(true)}
        onSubmit={() => setShowOrderDetail(true)}
      />

      <ModalWineryOrderDetail
        show={showOrderDetail}
        hide={() => setShowOrderDetail(false)}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 15,
  },
});

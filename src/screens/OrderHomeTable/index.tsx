import React from 'react';
import {StyleSheet, View} from 'react-native';
import useTheme from '../../theme/useTheme';
import {Button, DefaultText, Gap, Layout, Text} from '../../components/atoms';
import HeaderLeft from '../../components/molecules/Header/Left';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ArrowLeft} from 'iconsax-react-native';

interface Props {
  navigation: any;
  actionShowPopUpOrders: any;
}

const OrderHomeTable = ({navigation, actionShowPopUpOrders}: Props) => {
  const theme = useTheme();

  return (
    <Layout contentContainerStyle={styles.container} isScrollable={true}>
      <View
        style={{
          backgroundColor: theme?.colors.BACKGROUND1,
          paddingHorizontal: 16,
          flex: 1,
          borderTopWidth: 1,
          borderTopColor: theme?.colors.BACKGROUND1,
        }}>
        <HeaderLeft>
          <TouchableOpacity
            // style={styles.backBtn}
            onPress={() => {
              actionShowPopUpOrders();
            }}>
            <ArrowLeft size={24} color={theme?.colors.ICON} />
          </TouchableOpacity>
        </HeaderLeft>
        <Gap height={10} />
        <Text
          color={theme?.colors.WARNING}
          label="Scan on Table"
          textAlign="center"
        />
        <Gap height={30} />
        <Text
          label="Check your table or asking waiter to give you a QR Code, you can start order by scanning."
          textAlign="center"
        />
        <Gap height={30} />
        <Button
          TextComponent={<DefaultText title="Gotcha" />}
          type="primary"
          onPress={() => {
            navigation.navigate(
              'OrderQrCode',
              // {
              //     placeData:
              //         placeData.find((item: PlaceInterface) => item.clubId === 'd90dc31b-2384-4000-ad9e-f2a6b64f8321') ?? null,
              // }
            );
            actionShowPopUpOrders();
          }}
        />
        <Gap height={30} />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomSheetHandleStyle: {
    backgroundColor: '#1E1E1E',
    borderTopRightRadius: 14,
    borderTopLeftRadius: 14,
  },
});

export default OrderHomeTable;

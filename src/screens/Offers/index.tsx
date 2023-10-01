import {Image, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  DefaultText,
  EntryAnimation,
  Gap,
  Layout,
  Loading,
} from '../../components/atoms';
import {Header} from '../../components/molecules';
import {ImgProductPromo, ImgProductPromo2} from '../../theme/Images';
import CardCoupon from '../../components/molecules/Card/CardCoupon';
import CardPromo from '../../components/molecules/Card/CardPromo';
import {CouponInterface} from '../../interfaces/PlaceInterface';
import {NightlifeService} from '../../service/NightlifeService';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParams} from '../../navigation/MainScreenStack';

type Props = NativeStackScreenProps<MainStackParams, 'Offers', 'MyStack'>;

export default function Offers({route}: Props) {
  const [coupons, setCoupons] = useState<CouponInterface[]>([]);
  const placeData = route.params.placeData;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await NightlifeService.getCouponList();
      setCoupons(response.data);
      setIsLoading(false);
    } catch (error: any) {}
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Layout contentContainerStyle={styles.container}>
      {isLoading && <Loading />}
      <Header
        hasBackBtn
        transparent
        CenterComponent={
          <Image
            source={{uri: placeData?.logo}}
            resizeMode="contain"
            className="w-[118] h-[53] -top-2"
          />
        }
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Gap height={15} />
        <DefaultText
          title="Limited Promo"
          titleClassName="text-base font-inter-bold ml-5"
        />
        <Gap height={10} />
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.promoContainer}>
          <CardPromo
            image={ImgProductPromo}
            title="FREE FLOW"
            subtitle="SPENT WITH MINIMUM PURCHASE
            NT 40,000"
            time="14:10"
          />
          <CardPromo
            image={ImgProductPromo2}
            title="Disc up to 50%"
            subtitle="SPENT WITH MINIMUM PURCHASE
              NT 40,000"
            showLogo={false}
            contentClassName="flex-row-reverse px-2"
            imageClassName="w-[140] h-[116] absolute -bottom-12 -left-5"
            backgroundColors={['#071322', '#16102E', '#4D045B']}
            time="14:10"
            headerClassName="self-end"
          />
          <CardPromo
            isBanner={true}
            title="WINE TESTING"
            subtitle="GET PRIVILEGES FOR TEST OUR NEWEST DRINK IF YOU COME USING PAJAMAS"
          />
        </ScrollView>

        <Gap height={30} />
        <DefaultText
          title={`Inside ${placeData?.name}`}
          titleClassName="text-base font-inter-bold ml-5"
        />
        <Gap height={10} />
        {coupons
          .filter(el => el.source === 'club_owner')
          .map((item, idx) => (
            <EntryAnimation index={idx} key={`coupon_owner_${idx}`}>
              <CardCoupon
                couponType="discount"
                title={item.title}
                subtitle={item.description}
                data={item}
                isClaim
                appliedCoupons={[]}
              />
            </EntryAnimation>
          ))}
        <Gap height={30} />
        <DefaultText
          title="Platform Coupon"
          titleClassName="text-base font-inter-bold ml-5"
        />
        <Gap height={10} />
        {coupons
          .filter(el => el.source === 'internal_plattform')
          .map((item, idx) => (
            <EntryAnimation index={idx} key={`coupon_owner_${idx}`}>
              <CardCoupon
                couponType="discount"
                title={item.title}
                subtitle={item.description}
                data={item}
                isClaim
                appliedCoupons={[]}
              />
            </EntryAnimation>
          ))}
        <Gap height={30} />
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  promoContainer: {
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
  },
});

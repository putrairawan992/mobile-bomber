import {Image, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {DefaultText, Gap, Layout} from '../../components/atoms';
import {Header} from '../../components/molecules';
import {
  ImgOmniClub,
  ImgProductPromo,
  ImgProductPromo2,
} from '../../theme/Images';
import CardCoupon from '../../components/molecules/Card/CardCoupon';
import CardPromo from '../../components/molecules/Card/CardPromo';

export default function Offers() {
  return (
    <Layout contentContainerStyle={styles.container}>
      <Header
        hasBackBtn
        transparent
        CenterComponent={
          <Image
            source={ImgOmniClub}
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
          title="Inside Omni"
          titleClassName="text-base font-inter-bold ml-5"
        />
        <Gap height={10} />
        <CardCoupon
          type="free"
          title="Free 2 cocktail"
          subtitle="Minimum purchase NT 15,000"
        />
        <CardCoupon
          type="discount"
          title="Discount  50% for ladies"
          subtitle="Entry before 11pm"
          warning="4 hours before promo ended"
        />
        <CardCoupon
          type="discount"
          title="Discount NT 3,000 for any Food"
          subtitle="Entry before 11pm"
        />

        <Gap height={30} />
        <DefaultText
          title="Platform Coupon"
          titleClassName="text-base font-inter-bold ml-5"
        />
        <Gap height={10} />
        <CardCoupon
          type="discount"
          title="Discount NT 3,000 for any Food"
          subtitle="Entry before 11pm"
        />
        <CardCoupon
          type="discount"
          title="Discount NT 3,000 for any Food"
          subtitle="Entry before 11pm"
        />
        <CardCoupon
          type="discount"
          title="Discount NT 3,000 for any Food"
          subtitle="Entry before 11pm"
        />
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

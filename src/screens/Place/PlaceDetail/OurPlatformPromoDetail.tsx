import React from 'react';
import {Layout} from '../../../components/atoms';
import styles from '../Styles';
import {ScrollView} from 'react-native-gesture-handler';
import Animated, {FadeInUp} from 'react-native-reanimated';
import {Header} from '../../../components/molecules';
import {Colors} from '../../../theme';
import {OurPlatformPromoPlaceCard} from '../../../components/organism/Places/OurPlatformPromoPlaceCard';

export default function OurPlatformPromoDetail() {
  return (
    <Layout contentContainerStyle={styles.container} isScrollable={false}>
      <Animated.View entering={FadeInUp}>
        <Header
          transparent
          hasBackBtn
          colorText={Colors['white-100']}
          titleStyle={{fontSize: 16, color: Colors['white-100']}}
          title="Bomber Promo"
        />
      </Animated.View>
      <ScrollView>
        {[1, 2, 4, 5, 6].map(() => {
          return <OurPlatformPromoPlaceCard horizontal={true} />;
        })}
      </ScrollView>
    </Layout>
  );
}

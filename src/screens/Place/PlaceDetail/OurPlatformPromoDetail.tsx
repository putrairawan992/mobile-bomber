import React, {useEffect} from 'react';
import {CustomShimmer, Layout} from '../../../components/atoms';
import styles from '../Styles';
import {ScrollView} from 'react-native-gesture-handler';
import Animated, {FadeInUp} from 'react-native-reanimated';
import {Header} from '../../../components/molecules';
import {Colors} from '../../../theme';
import {OurPlatformPromoPlaceCard} from '../../../components/organism/Places/OurPlatformPromoPlaceCard';
import {NightlifeService} from '../../../service/NightlifeService';
import {WIDTH} from '../../../utils/config';
import {MainStackParams} from '../../../navigation/MainScreenStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<
  MainStackParams,
  'OurPlatformPromoDetail',
  'MyStack'
>;
export default function OurPlatformPromoDetail({navigation}: Props) {
  const [platformPromotion, setPlatformPromotion] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  useEffect(() => {
    fetchData(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      await Promise.all([NightlifeService.getPlatformPromotion()])
        .then(response => {
          setPlatformPromotion(response[0]?.data);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error: any) {
      console.log(error);
    }
  };
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
        {isLoading ? (
          <CustomShimmer width={WIDTH} height={300} />
        ) : (
          platformPromotion?.map((item: any) => {
            return (
              <OurPlatformPromoPlaceCard
                item={item}
                navigation={navigation}
                horizontal={true}
              />
            );
          })
        )}
      </ScrollView>
    </Layout>
  );
}

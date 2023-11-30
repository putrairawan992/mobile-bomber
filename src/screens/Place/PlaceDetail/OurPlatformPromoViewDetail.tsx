import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {MainStackParams} from '../../../navigation/MainScreenStack';
import {
  CustomShimmer,
  Gap,
  GradientText,
  Layout,
  Section,
  Text,
} from '../../../components/atoms';
import styles from '../Styles';
import HeaderLeft from '../../../components/molecules/Header/Left';
import {TouchableOpacity} from 'react-native-gesture-handler';
import useTheme from '../../../theme/useTheme';
import {ArrowLeft} from 'iconsax-react-native';
import {NightlifeService} from '../../../service/NightlifeService';
import {WIDTH} from '../../../utils/config';
import {View} from 'react-native';
import {Image} from 'react-native';
import moment from 'moment';

type Props = NativeStackScreenProps<
  MainStackParams,
  'OurPlatformPromoViewDetail',
  'MyStack'
>;

export default function OurPlatformPromoViewDetail({route, navigation}: Props) {
  const platformId = route.params.id;
  const [platformPromotion, setPlatformPromotion] = React.useState<any>({});
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const theme = useTheme();

  useEffect(() => {
    fetchData(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [platformId]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      await Promise.all([
        NightlifeService.getPlatformPromotionDetail({
          promotion_id: platformId as string,
        }),
      ])
        .then(response => {
          console.log('response', response[0]?.data);

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
      <HeaderLeft>
        <TouchableOpacity
          style={{marginTop: 15}}
          onPress={() => {
            navigation.goBack();
          }}>
          <ArrowLeft size={25} color={theme?.colors.ICON} />
        </TouchableOpacity>
      </HeaderLeft>
      {isLoading ? (
        <CustomShimmer width={WIDTH} height={300} />
      ) : (
        <View>
          <Image
            source={{uri: platformPromotion?.banner}}
            resizeMode="cover"
            style={{width: '100%', height: 283}}
          />
          <Gap height={2} />
          <Section padding="8px 16px">
            <Section isRow isBetween>
              <GradientText
                colors={['#A060FA', '#C800CC']}
                xAxis={1.2}
                style={{
                  fontSize: 18,
                  fontFamily: 'Inter-Bold',
                  lineHeight: 27,
                }}>
                {platformPromotion?.title}
              </GradientText>
              <Text
                label={moment(platformPromotion?.end_time).format(
                  'DD MMMM YYYY',
                )}
                variant="small"
                color={'#C9CACB'}
              />
            </Section>
            <Gap height={12} />
            <Text
              label={platformPromotion?.description?.replace(
                /(<([^>]+)>)/gi,
                '',
              )}
              variant="small"
              color={'#C9CACB'}
            />
          </Section>
        </View>
      )}
    </Layout>
  );
}

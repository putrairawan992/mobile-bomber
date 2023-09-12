/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {DjStackParams} from '../../navigation/DJScreenStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Button,
  Gap,
  GradientText,
  Layout,
  Loading,
  Section,
} from '../../components/atoms';
import styles from '../Styles';
import {Header} from '../../components/molecules';
import {navigationRef} from '../../navigation/RootNavigation';
import {IcBookRounded} from '../../theme/Images';
import {Colors, Images} from '../../theme';
import {HEIGHT, WIDTH, gradientMapping} from '../../utils/config';
import {DJ_REQUEST_DATA} from '../../utils/data';
import CardDjRequest from '../../components/molecules/Card/CardDjRequest';
import LinearGradient from 'react-native-linear-gradient';
import {ArrowLeft2} from 'iconsax-react-native';
import {useDispatch} from 'react-redux';
import {removeStorage} from '../../service/mmkvStorage';
import {handleLogOut} from '../../store/user/userActions';

type Props = NativeStackScreenProps<DjStackParams, 'Dashboard', 'MyStack'>;

const Dashboard = ({navigation}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const onSignOut = async () => {
    setIsLoading(true);
    await removeStorage('refreshToken');
    await removeStorage('userAuth');
    await removeStorage('userType');
    dispatch(handleLogOut());
    setIsLoading(true);
  };
  return (
    <Layout contentContainerStyle={styles.container} backgroundColor="#000">
      {isLoading && <Loading />}
      <TouchableOpacity
        onPress={onSignOut}
        style={{
          position: 'absolute',
          left: 10,
          top: 10,
          zIndex: 999999,
          padding: 6,
        }}>
        <ArrowLeft2 size={24} color={Colors['white-100']} />
      </TouchableOpacity>
      <ImageBackground
        source={Images.DjBackground}
        style={{width: WIDTH, height: HEIGHT}}>
        <Header
          transparent
          title="$1,500"
          titleStyle={{color: '#fff'}}
          RightComponent={
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('History')}>
              <Image
                source={IcBookRounded}
                resizeMode="contain"
                className="w-[24] h-[24]"
              />
            </TouchableOpacity>
          }
        />
        <Gap height={30} />
        <GradientText
          xAxis={0.5}
          colors={
            gradientMapping['textPrimary' as keyof typeof gradientMapping].color
          }
          style={{
            fontSize: 16,
            fontFamily: 'Inter-Bold',
            textAlign: 'center',
          }}>
          Dj Playlist
        </GradientText>
        <Gap height={16} />
        <Section padding="0px 55px">
          <LinearGradient
            // Button Linear Gradient
            colors={['transparent', '#000']}
            style={{
              height: HEIGHT * 0.65,
              position: 'absolute',
              width: WIDTH,
              zIndex: 999,
            }}
          />
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{height: HEIGHT * 0.65}}>
            {DJ_REQUEST_DATA.map((item, index) => (
              <CardDjRequest
                data={item}
                index={index}
                key={`request_${index}`}
                onSelect={() => undefined}
              />
            ))}
          </ScrollView>
        </Section>
        <Gap height={18} />
        <Button
          style={{marginHorizontal: 65}}
          type="primary"
          title="Check Requested Song"
          onPress={() => navigation.navigate('SongRequested')}
        />
      </ImageBackground>
    </Layout>
  );
};

export default Dashboard;

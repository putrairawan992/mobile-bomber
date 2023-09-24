/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Pressable,
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
  Text,
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
import {DjRequestSongInterface} from '../../interfaces/SongInterface';
import BottomSheet from '@gorhom/bottom-sheet';
import useTheme from '../../theme/useTheme';
import {currency} from '../../utils/function';

type Props = NativeStackScreenProps<DjStackParams, 'SongRequested', 'MyStack'>;

const SongRequested = ({navigation}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedRequest, setSelectedRequest] =
    useState<DjRequestSongInterface | null>(null);
  const [sheetIndex, setSheetIndex] = React.useState<number>(-1);
  const requestSheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(() => ['40'], []);
  const handleSheetChanges = React.useCallback((index: number) => {
    setSheetIndex(index);
  }, []);
  const theme = useTheme();

  return (
    <Layout contentContainerStyle={styles.container} backgroundColor="#000">
      {isLoading && <Loading />}
      <Header
        hasBackBtn
        transparent
        title="Song Requested"
        titleStyle={{color: '#fff'}}
      />
      <Gap height={36} />
      <Section padding="0px 22px" style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {DJ_REQUEST_DATA.map((item, index) => (
            <CardDjRequest
              data={item}
              index={index}
              key={`request_${index}`}
              onSelect={data => {
                setSelectedRequest(data);
                setTimeout(() => {
                  requestSheetRef.current?.expand();
                }, 100);
              }}
            />
          ))}
        </ScrollView>
      </Section>
      <BottomSheet
        ref={requestSheetRef}
        index={-1}
        enablePanDownToClose
        snapPoints={snapPoints}
        backdropComponent={({style}) =>
          sheetIndex >= 0 ? (
            <Pressable
              onPress={() => requestSheetRef.current?.close()}
              style={[style, {backgroundColor: 'rgba(0, 0, 0, 0.60)'}]}
            />
          ) : (
            <></>
          )
        }
        handleStyle={{
          backgroundColor: theme?.colors.BACKGROUND1,
          borderTopRightRadius: 14,
          borderTopLeftRadius: 14,
        }}
        handleIndicatorStyle={{backgroundColor: Colors['black-70']}}
        onChange={handleSheetChanges}>
        <Section
          backgroundColor={theme?.colors.SECTION}
          style={{flex: 1}}
          padding="0px 16px">
          <Gap height={15} />
          <GradientText
            xAxis={0.5}
            colors={
              gradientMapping['textPrimary' as keyof typeof gradientMapping]
                .color
            }
            style={{
              fontSize: 16,
              fontFamily: 'Inter-Bold',
              textAlign: 'center',
            }}>
            Song request
          </GradientText>
          <Gap height={26} />
          <Section padding="16px 16px" rounded={8} backgroundColor={'#2D2D2D'}>
            <Text
              variant="base"
              fontWeight="semi-bold"
              label={selectedRequest?.title}
            />
            <Gap height={16} />
            <Section isRow isBetween>
              <Text
                label={`Song by ${selectedRequest?.artis}`}
                color={Colors['white-100']}
              />
              <Text
                label={currency(Number(selectedRequest?.fee))}
                color={Colors['white-100']}
              />
            </Section>
          </Section>
          <View
            style={{
              position: 'absolute',
              width: '100%',
              bottom: 32,
              alignSelf: 'center',
            }}>
            <Button type="primary" onPress={() => undefined} title="Accept" />
            <Button
              type="textButton"
              onPress={() => requestSheetRef.current?.close()}
              title="Cancel"
            />
          </View>
        </Section>
      </BottomSheet>
    </Layout>
  );
};

export default SongRequested;

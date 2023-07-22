/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable no-mixed-operators */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useNavigation } from '@react-navigation/native';
import { Logout } from 'iconsax-react-native';
import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  LayoutAnimation,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { MMKVLoader } from 'react-native-mmkv-storage';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { EntryAnimation } from '../components/animations/EntryAnimation';
import { ScaleAnimation } from '../components/animations/ScaleAnimation';
import { ModalToast } from '../components/ModalToast';
import Spacer from '../components/Spacer/Spacer';
import { Text } from '../components/Text';
import { ModalToastContext } from '../context/AppModalToastContext';
import { CountryInterface } from '../interfaces/CountryInterface';
import { CountryService } from '../service/CountryService';
import { ReduxState } from '../store';
import { handleLogOut } from '../store/user/userActions';
import colors from '../styles/colors';
import { ThemeInterface } from '../theme/ThemeProvider';
import useTheme from '../theme/useTheme';
import useThemedStyles from '../theme/useThemedStyles';
import { WIDTH } from '../utils/config';

const CARD_HEIGHT = 200;
const CARD_WIDTH = WIDTH - 32;

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const MMKV = new MMKVLoader().initialize(); // Returns an MMKV Instance
export function HomeScreen() {
  const style = useThemedStyles(styles);
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const {
    isShowToast,
    setIsShowToast,
    toastMessage,
    setToastMessage,
    type,
    setType,
  } = useContext(ModalToastContext);
  const { user } = useSelector((state: ReduxState) => state.user, shallowEqual);
  const [data, setData] = useState<Array<CountryInterface>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const [activeCountry, setActiveCountry] = useState<string>('');
  useEffect(() => {
    async function getMovie() {
      setIsShowToast(true);
      setType('success');
      setToastMessage(`Login success, Welcome ${user.name}`);
      setIsLoading(true);
      const result: any = await CountryService.getCountryList('ind');
      setData(result);
      setIsLoading(false);
    }
    getMovie();
  }, []);

  const onExpand = (name: string) => {
    LayoutAnimation.configureNext({
      duration: 300,
      update: {
        type: 'easeInEaseOut',
      },
    });
    setActiveCountry(name);
    if (name === activeCountry && isExpand) {
      setActiveCountry('');
      setIsExpand(false);
    } else {
      setIsExpand(true);
    }
  };

  const onLogOut = async () => {
    try {
      await MMKV.removeItem('userAuth');
      dispatch(handleLogOut());
    } catch (error: any) {
      /* empty */
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <TouchableOpacity
        onPress={onLogOut}
        style={{
          position: 'absolute',
          top: Platform.OS === 'android' ? 16 : 64,
          right: 16,
        }}
      >
        <Logout size="32" color={theme?.colors.PRIMARY} />
      </TouchableOpacity>
      <Spacer m />
      <Text
        variant="large"
        color={theme?.colors.TEXT_PRIMARY}
        label="Country List"
      />
      <Spacer l />
      <ScrollView showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <ActivityIndicator size="large" color={theme?.colors.PRIMARY} />
        ) : !isLoading && Array.isArray(data) ? (
          data.map((item: CountryInterface, idx: number) => (
            <EntryAnimation index={idx} key={`movie_${idx}`}>
              <>
                <ScaleAnimation
                  onPress={() => onExpand(item.name.common)}
                  disabled={false}
                  scaleTo={0.97}
                >
                  <ImageBackground
                    style={{
                      width: CARD_WIDTH,
                      height: CARD_HEIGHT,
                      margin: 6,
                    }}
                    source={{
                      uri: item.flags.png,
                    }}
                    imageStyle={{
                      borderRadius: 8,
                    }}
                  >
                    {activeCountry !== item.name.common && (
                      <>
                        <LinearGradient
                          colors={['transparent', '#000']}
                          style={style.infoWrapper}
                        >
                          <View style={{ alignSelf: 'flex-end' }} />
                        </LinearGradient>
                        <View
                          style={{
                            alignSelf: 'center',
                            top: CARD_HEIGHT - 32,
                          }}
                        >
                          <Text
                            variant="medium"
                            key={`movie_${idx}`}
                            label={item.name.common}
                            fontWeight="bold"
                            color={colors.whiteSmoke}
                          />
                        </View>
                      </>
                    )}
                  </ImageBackground>
                </ScaleAnimation>
                {isExpand && activeCountry === item.name.common && (
                  <View style={style.info}>
                    <Spacer s />
                    <Text
                      variant="medium"
                      key={`movie_${idx}`}
                      label={item.name.common}
                      fontWeight="bold"
                      color={colors.blackCoral}
                    />
                    <View style={{ flexDirection: 'row' }}>
                      <Text
                        variant="small"
                        label="Region : "
                        fontWeight="bold"
                        color={colors.gumbo}
                      />
                      <Text
                        variant="small"
                        label={item.region}
                        fontWeight="bold"
                        color={colors.royalBlue}
                      />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text
                        variant="small"
                        label="Pupulation : "
                        fontWeight="bold"
                        color={colors.gumbo}
                      />
                      <Text
                        variant="small"
                        label={item.population.toString()}
                        fontWeight="bold"
                        color={colors.royalBlue}
                      />
                    </View>
                  </View>
                )}
              </>
            </EntryAnimation>
          ))
        ) : (
          <></>
        )}
      </ScrollView>
      <ModalToast
        isVisible={isShowToast}
        onCloseModal={() => setIsShowToast(false)}
        message={toastMessage}
        type={type}
      />
    </SafeAreaView>
  );
}

const styles = (theme: ThemeInterface) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.BACKGROUND1,
  },
  infoWrapper: {
    padding: 4,
    height: CARD_HEIGHT / 2,
    position: 'absolute',
    width: WIDTH - 32,
    top: CARD_HEIGHT / 2,
    borderRadius: 6,
    justifyContent: 'flex-end',
  },
  info: {
    paddingHorizontal: 16,
    marginBottom: 6,
  },
});

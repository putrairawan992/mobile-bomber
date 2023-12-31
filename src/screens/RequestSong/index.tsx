import React, {useEffect, useState} from 'react';
import {
  Button,
  DefaultText,
  Gap,
  GradientText,
  Layout,
  Section,
  Text,
} from '../../components/atoms';
import {Header, ModalToast} from '../../components/molecules';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import colors from '../../styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import {navigationRef} from '../../navigation/RootNavigation';
import {SongService} from '../../service/SongService';
import {getStorage} from '../../service/mmkvStorage';
import {NightlifeService} from '../../service/NightlifeService';
import songPlaylist from '../../assets/json/songPlaylist.json';
import {Dropdown} from 'react-native-element-dropdown';
import useTheme from '../../theme/useTheme';
import {Colors} from '../../theme';
import {ArrowDown2, ArrowUp2} from 'iconsax-react-native';
import {WIDTH} from '../../utils/config';

export default function RequestSong() {
  const [title, setTitle] = useState<string>('');
  const [artist, setArtist] = useState<string>('');
  const [tip, setTip] = useState<string>('');
  const [clubId, setClubId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [djList, setDjList] = useState<any>([]);
  const [djListSelected, setDjListSelected] = useState<any>('');
  const theme = useTheme();

  useEffect(() => {
    getDjList();
    getRandomClub(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDjList = () => {
    NightlifeService.getDjList({club_id: clubId})
      .then(res => {
        if (res.data) {
          setDjList(res.data);
        }
      })
      .catch(err => console.log('err getDjList club: ', err));
  };

  const getRandomClub = () => {
    NightlifeService.getTopFiveNightClub()
      .then(res => {
        if (res.data) {
          const date = new Date().valueOf().toString();
          const randomId = Number(date.charAt(date.length - 1));
          const data = res.data[randomId > 4 ? 4 : randomId];
          setClubId(data.clubId);
        }
      })
      .catch(err => console.log('err get top club: ', err));
  };

  const onRequestSong = async () => {
    if (
      title.trim().length === 0 ||
      artist.trim().length === 0 ||
      tip.trim().length === 0
    ) {
      return setError('Please input the fields!');
    }

    const user: any = await getStorage('userAuth');
    const requested_by = JSON.parse(user).id;

    setLoading(true);
    SongService.postRequestSong({
      song_title: title,
      song_artist: artist,
      ask_fee: tip,
      club_id: clubId,
      requested_by,
    })
      .then(() => {
        setSuccess(true);
        setTimeout(() => navigationRef.goBack(), 2000);
      })
      .catch(err => {
        setError(
          err.response?.data?.detail
            ? JSON.stringify(err.response.data.detail)
            : 'Error! Try again later',
        );
      })
      .finally(() => setLoading(false));
  };

  return (
    <Layout>
      <Header
        hasBackBtn
        transparent
        title="Ask DJ"
        titleStyle={styles.headerTitle}
      />
      <Gap height={15} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <GradientText
          xAxis={0.5}
          colors={['#F27611', '#FFE419']}
          style={styles.titleFavorite}>
          Select from favorites
        </GradientText>
        <Gap height={10} />
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={songPlaylist}
          keyExtractor={(_, key) => key.toString()}
          renderItem={({item}) => {
            return (
              <LinearGradient
                colors={['#A060FA', '#FFFFFF']}
                className="p-[1px] rounded-lg mx-2">
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="p-3 bg-screen rounded-lg flex-row items-center"
                  onPress={() => {
                    setTitle(item.title);
                    setArtist(item.singer);
                  }}>
                  <DefaultText title={item.title} subtitle={item.singer} />
                  <Gap width={20} />
                  <DefaultText title={item.duration} />
                </TouchableOpacity>
              </LinearGradient>
            );
          }}
          contentContainerStyle={styles.favoriteList}
        />
        <Gap height={30} />
        <GradientText
          xAxis={0.4}
          colors={['#A060FA', '#C800CC']}
          style={styles.titleFavorite}>
          My own song
        </GradientText>
        <Gap height={15} />
        <View className="mx-5">
          <DefaultText
            title="DJ List"
            titleClassName="font-inter-regular mb-2"
          />
          <View className="border-[0.5px] border-neutral-700 rounded-md">
            <Dropdown
              selectedTextStyle={{
                fontSize: 14,
                marginLeft: 10,
                textAlign: 'left',
                fontFamily: 'Inter-Regular',
                color: theme?.colors.TEXT_PRIMARY,
              }}
              placeholderStyle={{
                color: theme?.colors.TEXT_PRIMARY,
                marginLeft: 10,
              }}
              placeholder={'Select DJ'}
              itemTextStyle={{
                fontSize: 14,
                color: Colors['white-100'],
                fontFamily: 'Inter-Regular',
              }}
              containerStyle={{
                borderColor: '#5D5C5C',
                position: 'relative',
                marginTop: 10,
                backgroundColor: theme?.colors.BACKGROUND2,
                width: WIDTH * 0.9,
              }}
              style={[
                s.dropdown,
                // {
                //   backgroundColor: theme?.colors.SECTION,
                // },
              ]}
              renderRightIcon={visible =>
                visible ? (
                  <ArrowUp2 color={theme?.colors.PRIMARY} size={16} />
                ) : (
                  <ArrowDown2 color={theme?.colors.PRIMARY} size={16} />
                )
              }
              data={djList.map((item: any) => {
                return {
                  value: item.dj_name,
                  label: item.dj_name,
                };
              })}
              labelField="label"
              valueField="value"
              value={djListSelected}
              renderItem={item => (
                <Section backgroundColor={theme?.colors.BACKGROUND2}>
                  <Section isRow rounded={8} padding="14px 6px">
                    <Text
                      variant="small"
                      fontWeight="medium"
                      label={item.label}
                    />
                  </Section>
                </Section>
              )}
              onChange={item => {
                setDjListSelected(item.value);
              }}
            />
          </View>
          <Gap height={15} />
          <DefaultText title="Title" titleClassName="font-inter-regular mb-2" />
          <View className="border-[0.5px] border-neutral-700 rounded-md p-4">
            <TextInput
              placeholder="Write your song title here"
              placeholderTextColor="#898e9a"
              className="m-0 p-0 font-inter-regular text-white"
              value={title}
              onChangeText={value => setTitle(value)}
            />
          </View>
          <Gap height={15} />
          <DefaultText
            title="Artist"
            titleClassName="font-inter-regular mb-2"
          />
          <View className="border-[0.5px] border-neutral-700 rounded-md p-4">
            <TextInput
              placeholder="Write artist for your song"
              placeholderTextColor="#898e9a"
              className="m-0 p-0 font-inter-regular text-white"
              value={artist}
              onChangeText={value => setArtist(value)}
            />
          </View>
          <Gap height={15} />
          <DefaultText
            title="Tip for DJ"
            titleClassName="font-inter-regular mb-2"
          />
          <View className="border-[0.5px] border-neutral-700 rounded-md p-4">
            <TextInput
              placeholder="Support the DJ"
              placeholderTextColor="#898e9a"
              className="m-0 p-0 font-inter-regular text-white"
              value={tip}
              onChangeText={value => setTip(value)}
              keyboardType="number-pad"
            />
          </View>
          <Gap height={10} />
          <View className="flex-row">
            <TouchableOpacity
              activeOpacity={0.7}
              className="border-[0.5px] border-neutral-500 rounded-md flex-1 py-[10px]"
              onPress={() => setTip('1000')}>
              <DefaultText
                title="1.000"
                titleClassName="text-center text-xs font-inter-medium"
              />
            </TouchableOpacity>
            <Gap width={10} />
            <TouchableOpacity
              activeOpacity={0.7}
              className="border-[0.5px] border-neutral-500 rounded-md flex-1 py-[10px]"
              onPress={() => setTip('5000')}>
              <DefaultText
                title="5.000"
                titleClassName="text-center text-xs font-inter-medium"
              />
            </TouchableOpacity>
            <Gap width={10} />
            <TouchableOpacity
              activeOpacity={0.7}
              className="border-[0.5px] border-neutral-500 rounded-md flex-1 py-[10px]"
              onPress={() => setTip('10000')}>
              <DefaultText
                title="10.000"
                titleClassName="text-center text-xs font-inter-medium"
              />
            </TouchableOpacity>
          </View>
          <Gap height={20} />
          <View className="bg-[#2D2D2D] p-3 rounded-lg">
            <DefaultText
              title="This tips can't be refund, the DJ have rights to decide what song they will pick"
              titleClassName="leading-5"
            />
          </View>
          <Gap height={20} />
          <Button
            isLoading={loading}
            type="primary"
            title="Request"
            onPress={onRequestSong}
          />
        </View>
        <Gap height={20} />
      </ScrollView>

      <ModalToast
        type="error"
        isVisible={error.length > 0}
        message={error}
        onCloseModal={() => setError('')}
      />
      <ModalToast
        type="success"
        isVisible={success}
        message="Congrats, your request has been sent"
        onCloseModal={() => setSuccess(false)}
      />
    </Layout>
  );
}
const s = StyleSheet.create({
  dropdown: {
    borderRadius: 8,
    height: 60,
    padding: 4,
  },
});

const styles = StyleSheet.create({
  headerTitle: {
    color: colors.white,
  },
  titleFavorite: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    marginLeft: 20,
  },
  favoriteList: {
    paddingHorizontal: 15,
  },
  inputText: {
    fontFamily: 'inter-regular',
  },
});

import React from 'react';
import {
  Button,
  DefaultText,
  Gap,
  GradientText,
  Layout,
  Spacer,
} from '../../components/atoms';
import {Header} from '../../components/molecules';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import colors from '../../styles/colors';
import {IcBookRounded, ImgBackgroundDj} from '../../theme/Images';
import CardSongPlaylist from '../../components/molecules/Card/CardSongPlaylist';
import {navigationRef} from '../../navigation/RootNavigation';

export default function SongPlaylist() {
  const {width, height} = useWindowDimensions();

  return (
    <Layout backgroundColor={colors.black}>
      <Header
        hasBackBtn
        transparent
        title="Ask DJ"
        titleStyle={styles.headerTitle}
        RightComponent={
          <TouchableOpacity activeOpacity={0.7}>
            <Image
              source={IcBookRounded}
              resizeMode="contain"
              className="w-[24] h-[24]"
            />
          </TouchableOpacity>
        }
      />
      <Spacer height={30} />
      <Image
        source={ImgBackgroundDj}
        resizeMode="cover"
        style={{
          width,
          height,
        }}
        className="absolute"
      />
      <FlatList
        data={[1, 2, 3, 4, 5]}
        keyExtractor={(_, key) => key.toString()}
        renderItem={() => <CardSongPlaylist />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <GradientText
            colors={['#A060FA', '#C800CC']}
            xAxis={0.2}
            style={styles.title}>
            DJ Playlist
          </GradientText>
        }
      />
      <View className="pb-20 pt-5">
        <DefaultText
          title="Want your song listed here ?"
          titleClassName="font-inter-bold text-base text-blue-500 text-center"
        />
        <Gap height={10} />
        <Button
          type="primary"
          onPress={() => navigationRef.navigate('RequestSong' as never)}
          style={styles.buttonRequest}
          TextComponent={
            <DefaultText
              title="Request Song"
              titleClassName="font-poppins-regular text-base"
            />
          }
        />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    color: colors.white,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
    marginBottom: 10,
  },
  buttonRequest: {
    alignSelf: 'center',
    paddingHorizontal: 70,
  },
});

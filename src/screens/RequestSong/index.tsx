import React, {useState} from 'react';
import {
  Button,
  DefaultText,
  Gap,
  GradientText,
  Layout,
} from '../../components/atoms';
import {Header} from '../../components/molecules';
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

export default function RequestSong() {
  const [title, setTitle] = useState<string>('');
  const [artist, setArtist] = useState<string>('');
  const [tip, setTip] = useState<string>('');

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
          colors={['#F27611', '#FFE419']}
          style={styles.titleFavorite}>
          Select from favorites
        </GradientText>
        <Gap height={10} />
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={[1, 2, 3]}
          keyExtractor={(_, key) => key.toString()}
          renderItem={() => {
            return (
              <LinearGradient
                colors={['#A060FA', '#FFFFFF']}
                className="p-[1px] rounded-lg mx-2">
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="p-3 bg-screen rounded-lg flex-row items-center">
                  <DefaultText title={'Butter'} subtitle={'BTS'} />
                  <Gap width={20} />
                  <DefaultText title={'3:14'} />
                </TouchableOpacity>
              </LinearGradient>
            );
          }}
          contentContainerStyle={styles.favoriteList}
        />
        <Gap height={30} />
        <GradientText
          colors={['#A060FA', '#C800CC']}
          style={styles.titleFavorite}>
          My own song
        </GradientText>
        <Gap height={15} />
        <View className="mx-5">
          <DefaultText
            title="Title"
            titleClassName="font-poppins-regular mb-2"
          />
          <View className="border-[0.5px] border-neutral-700 rounded-md p-4">
            <TextInput
              placeholder="Write your song title here"
              placeholderTextColor="#898e9a"
              className="m-0 p-0 font-poppins-regular text-white"
              value={title}
              onChangeText={value => setTitle(value)}
            />
          </View>
          <Gap height={15} />
          <DefaultText
            title="Artist"
            titleClassName="font-poppins-regular mb-2"
          />
          <View className="border-[0.5px] border-neutral-700 rounded-md p-4">
            <TextInput
              placeholder="Write artist for your song"
              placeholderTextColor="#898e9a"
              className="m-0 p-0 font-poppins-regular text-white"
              value={artist}
              onChangeText={value => setArtist(value)}
            />
          </View>
          <Gap height={15} />
          <DefaultText
            title="Tip for DJ"
            titleClassName="font-poppins-regular mb-2"
          />
          <View className="border-[0.5px] border-neutral-700 rounded-md p-4">
            <TextInput
              placeholder="Support the DJ"
              placeholderTextColor="#898e9a"
              className="m-0 p-0 font-poppins-regular text-white"
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
            type="primary"
            title="Request"
            onPress={() =>
              navigationRef.navigate('HistoryRequestSong' as never)
            }
          />
        </View>
      </ScrollView>
    </Layout>
  );
}

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
    fontFamily: 'Poppins-Regular',
  },
});

/* eslint-disable react-native/no-inline-styles */
import React, {
  FC,
  ReactElement,
  createRef,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styles from '../Styles';
import {Header, TabMenu} from '../../components/molecules';
import {Gap, Layout, Loading, Section} from '../../components/atoms';
import {MainStackParams} from '../../navigation/MainScreenStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Colors} from '../../theme';
import PagerView from 'react-native-pager-view';
import {
  ImageBackground,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {GalleryMappingInterface} from '../../interfaces/Interface';
import {NightlifeService} from '../../service/NightlifeService';
import {GalleryCategoryInterface} from '../../interfaces/PlaceInterface';
import MasonryList from '@react-native-seoul/masonry-list';

type Props = NativeStackScreenProps<MainStackParams, 'Gallery', 'MyStack'>;

export const GalleryScreen = ({route, navigation}: Props) => {
  const [menu, setMenu] = useState<string[]>([]);
  const [initialPage, setInitialPage] = useState<number>(0);
  const ref = createRef<PagerView>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [galleryData, setGalleryData] = useState<GalleryCategoryInterface[]>(
    [],
  );
  const [categoryData, setCategoryData] = useState<GalleryMappingInterface[]>(
    [],
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loadingState, setLoadingState] = useState<boolean[]>([]);
  const fetchGallery = async () => {
    try {
      setIsLoading(true);
      const response = await NightlifeService.getPlaceGallery({
        club_id: route.params.placeId,
      });
      setGalleryData(response.data);
      setMenu(response.data.map(item => item.categoryName));
      setIsLoading(false);
      const dataCategory =
        response.data
          .find(
            item =>
              item.categoryName === response.data.map(el => el.categoryName)[0],
          )
          ?.galleryData.map(el => {
            return {
              id: el.galleryId,
              url: el.galleryImgUrl,
              caption: el.caption,
            };
          }) ?? [];
      setCategoryData(dataCategory);
      setLoadingState(dataCategory.map(_ => false));
    } catch {}
  };

  useEffect(() => {
    fetchGallery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (galleryData.length) {
      const dataCategory =
        galleryData
          .find(item => item.categoryName === menu[initialPage])
          ?.galleryData.map(el => {
            return {
              id: el.galleryId,
              url: el.galleryImgUrl,
              caption: el.caption,
            };
          }) ?? [];
      setCategoryData(dataCategory);
      setLoadingState(dataCategory.map(_ => false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPage]);

  const GalleryCard: FC<{
    item: GalleryMappingInterface;
    style: StyleProp<ViewStyle>;
    index: number;
  }> = ({item, style, index}) => {
    const randomBool = useMemo(() => Math.random() < 0.5, []);

    return (
      <TouchableOpacity
        key={item.id}
        style={[{marginTop: 12, flex: 1}, style]}
        onPress={() =>
          navigation.navigate('GalleryDetail', {
            index,
            items: categoryData,
          })
        }>
        <ImageBackground
          source={{uri: item.url}}
          style={{
            height: randomBool ? 150 : 280,
            alignSelf: 'stretch',
          }}
          imageStyle={{borderRadius: 4}}
          // onLoadStart={() =>
          //   setLoadingState(
          //     loadingState.map((el, idx) => (idx === index ? true : el)),
          //   )
          // }
          // onLoadEnd={() =>
          //   setLoadingState(
          //     loadingState.map((el, idx) => (idx === index ? false : el)),
          //   )
          // }
          resizeMode="cover">
          {/* {loadingState[index] && (
            <CustomShimmer height={randomBool ? 150 : 280} />
          )} */}
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item, i}: any): ReactElement => {
    return (
      <GalleryCard
        item={item}
        style={{marginLeft: i % 2 === 0 ? 0 : 12}}
        index={i}
      />
    );
  };

  const renderGallery = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return (
      <Section style={{flex: 1, justifyContent: 'center'}}>
        <MasonryList
          keyExtractor={(item: GalleryMappingInterface): string => item.id}
          ListHeaderComponent={<View />}
          contentContainerStyle={{
            paddingHorizontal: 16,
            alignSelf: 'stretch',
          }}
          onEndReached={() => undefined}
          numColumns={2}
          data={categoryData}
          renderItem={renderItem}
          onRefresh={() => {
            fetchGallery();
            setInitialPage(0);
          }}
        />
      </Section>
    );
  };

  return (
    <Layout contentContainerStyle={styles.container} isScrollable={true}>
      <Header
        transparent
        hasBackBtn
        title={`${route.params.title} Gallery`}
        titleStyle={{color: Colors.white}}
      />
      {isLoading && <Loading />}
      <Gap height={26} />
      <Section isRow>
        {menu.map((item, index) => {
          const isSelected = index === initialPage;
          return (
            <TabMenu
              onPress={idx => ref.current?.setPage(idx)}
              isSelected={isSelected}
              width={'auto'}
              item={item}
              index={index}
              isCenter={false}
              isInActiveBorder={false}
            />
          );
        })}
      </Section>
      <Gap height={16} />
      <Section style={{flex: 1}}>
        {menu.length ? (
          <PagerView
            style={styles.container}
            initialPage={initialPage}
            ref={ref}
            onPageSelected={e => setInitialPage(e.nativeEvent.position)}>
            {menu.length &&
              menu.map((item, idx) => (
                <View key={(idx + 1).toString()}>{renderGallery()}</View>
              ))}
          </PagerView>
        ) : (
          <></>
        )}
      </Section>
    </Layout>
  );
};

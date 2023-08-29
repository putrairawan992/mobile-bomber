/* eslint-disable react-native/no-inline-styles */
import React, {createRef, useEffect, useState} from 'react';
import styles from '../Styles';
import {Header, TabMenu} from '../../components/molecules';
import {Gap, Layout, Loading, Section, Text} from '../../components/atoms';
import {MainStackParams} from '../../navigation/MainScreenStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Colors} from '../../theme';
import PagerView from 'react-native-pager-view';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import {ImageGallery, ImageObject} from '@georstat/react-native-image-gallery';
import {
  AppImageObject,
  GalleryMappingInterface,
} from '../../interfaces/Interface';
import {NightlifeService} from '../../service/NightlifeService';
import {GalleryCategoryInterface} from '../../interfaces/PlaceInterface';
import {Close} from '../../assets/icons';
import useTheme from '../../theme/useTheme';
import {HEIGHT} from '../../utils/config';

type Props = NativeStackScreenProps<MainStackParams, 'Gallery', 'MyStack'>;

export const GalleryScreen = ({route}: Props) => {
  const theme = useTheme();
  const [menu, setMenu] = useState<string[]>([]);
  const [initialPage, setInitialPage] = useState<number>(0);
  const ref = createRef<PagerView>();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const openGallery = () => setIsOpen(true);
  const closeGallery = () => setIsOpen(false);
  const [galleryData, setGalleryData] = useState<GalleryCategoryInterface[]>(
    [],
  );
  const [categoryData, setCategoryData] = useState<GalleryMappingInterface[]>(
    [],
  );
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const fetchGallery = async () => {
    try {
      setIsLoading(true);
      const response = await NightlifeService.getPlaceGallery({
        club_id: route.params.placeId,
      });
      setGalleryData(response.data);
      setMenu(response.data.map(item => item.categoryName));
      setIsLoading(false);
      setCategoryData(
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
          }) ?? [],
      );
    } catch {}
  };

  useEffect(() => {
    fetchGallery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (galleryData.length) {
      setCategoryData(
        galleryData
          .find(item => item.categoryName === menu[initialPage])
          ?.galleryData.map(el => {
            return {
              id: el.galleryId,
              url: el.galleryImgUrl,
              caption: el.caption,
            };
          }) ?? [],
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPage]);

  const renderGallery = () => {
    return (
      <Section style={{flex: 1, justifyContent: 'center'}}>
        <FlatList
          data={categoryData}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedIndex(index);
                openGallery();
              }}
              style={{
                flex: 1,
                flexDirection: 'column',
                margin: 6,
              }}>
              <Image style={styles.imageThumbnail} source={{uri: item.url}} />
            </TouchableOpacity>
          )}
          numColumns={3}
          keyExtractor={item => item.id}
        />
      </Section>
    );
  };

  const renderFooterComponent = (image: ImageObject, currentIndex: number) => {
    return (
      <View
        style={{
          backgroundColor: 'transparent',
          alignSelf: 'center',
          bottom: 30,
        }}>
        <Text
          label={`${(currentIndex + 1).toString()} of ${categoryData.length}`}
          color="#A5A5A5"
        />
      </View>
    );
  };

  const renderHeaderComponent = (image: AppImageObject) => {
    return (
      <View
        style={{
          backgroundColor: 'transparent',
          top: 100,
        }}>
        <TouchableOpacity
          onPress={() => setIsOpen(false)}
          style={{position: 'absolute', left: 16, zIndex: 999}}>
          <Close size={24} color={theme?.colors.ICON} />
        </TouchableOpacity>
        <View
          style={{
            position: 'absolute',
            paddingHorizontal: 8,
            backgroundColor: '#2B2E34',
            top: HEIGHT * 0.69,
            alignSelf: 'center',
            zIndex: 999,
            borderRadius: 12,
          }}>
          <Text
            label={image?.caption ?? ''}
            textAlign="center"
            color={theme?.colors.PRIMARY}
          />
        </View>
        <Text
          label={route.params.title + ' Gallery'}
          variant="base"
          textAlign="center"
        />
      </View>
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
      <ImageGallery
        close={closeGallery}
        isOpen={isOpen}
        images={categoryData}
        thumbSize={64}
        thumbColor={Colors.white}
        initialIndex={selectedIndex}
        renderFooterComponent={renderFooterComponent}
        renderHeaderComponent={renderHeaderComponent}
      />
    </Layout>
  );
};

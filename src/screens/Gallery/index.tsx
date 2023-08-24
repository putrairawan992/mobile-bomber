/* eslint-disable react-native/no-inline-styles */
import React, {createRef, useEffect, useState} from 'react';
import styles from '../Styles';
import {Header, TabMenu} from '../../components/molecules';
import {Gap, Layout, Section, Text} from '../../components/atoms';
import {MainStackParams} from '../../navigation/MainScreenStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Colors} from '../../theme';
import PagerView from 'react-native-pager-view';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import {ImageGallery, ImageObject} from '@georstat/react-native-image-gallery';
import {GalleryInterface} from '../../interfaces/Interface';

type Props = NativeStackScreenProps<MainStackParams, 'Gallery', 'MyStack'>;

export const GalleryScreen = ({route}: Props) => {
  const [menu] = useState<string[]>(['All (30)', 'Vibe', 'Guest', 'F&B']);
  const [imageLength] = useState<number[]>([30, 15, 10, 5]);
  const [initialPage, setInitialPage] = useState<number>(0);
  const ref = createRef<PagerView>();
  const [isOpen, setIsOpen] = useState(false);
  const openGallery = () => setIsOpen(true);
  const closeGallery = () => setIsOpen(false);
  const [data, setData] = useState<GalleryInterface[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const getImages = (value: number) => {
    return Array.apply(null, Array(value)).map((v, i) => {
      return {
        id: i.toString(),
        url: 'https://unsplash.it/400/400?image=' + (value + i),
      };
    });
  };

  useEffect(() => {
    setData(
      getImages(Number(imageLength.find((item, idx) => idx === initialPage))),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPage]);
  const renderGallery = () => {
    return (
      <Section style={{flex: 1, justifyContent: 'center'}}>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedIndex(Number(item.id));
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
          keyExtractor={(_, key) => key.toString()}
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
          label={`${(currentIndex + 1).toString()} of ${data.length}`}
          color="#A5A5A5"
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
        <PagerView
          style={styles.container}
          initialPage={initialPage}
          ref={ref}
          onPageSelected={e => setInitialPage(e.nativeEvent.position)}>
          <View key="1">{renderGallery()}</View>
          <View key="2">{renderGallery()}</View>
          <View key="3">{renderGallery()}</View>
          <View key="4">{renderGallery()}</View>
        </PagerView>
      </Section>
      <ImageGallery
        close={closeGallery}
        isOpen={isOpen}
        images={data}
        thumbSize={64}
        thumbColor={Colors.white}
        initialIndex={selectedIndex}
        renderFooterComponent={renderFooterComponent}
      />
    </Layout>
  );
};

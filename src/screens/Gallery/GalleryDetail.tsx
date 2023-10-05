/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Colors} from '../../theme';
import {Layout, Section, Text} from '../../components/atoms';
import styles from '../Styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParams} from '../../navigation/MainScreenStack';
import {TouchableOpacity, View} from 'react-native';
import {WIDTH} from '../../utils/config';
import {ImageGallery} from '@georstat/react-native-image-gallery';
import {AppImageObject} from '../../interfaces/Interface';
import useTheme from '../../theme/useTheme';
import {useFocusEffect} from '@react-navigation/native';
import {ArrowLeft2} from 'iconsax-react-native';

type Props = NativeStackScreenProps<
  MainStackParams,
  'GalleryDetail',
  'MyStack'
>;

const GalleryDetail = ({route, navigation}: Props) => {
  const index = route.params.index;
  const items = route.params.items;
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  useFocusEffect(
    React.useCallback(() => {
      setIsOpen(true);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigation]),
  );

  const renderHeaderComponent = (image: AppImageObject) => {
    return (
      <View
        style={{
          backgroundColor: 'transparent',
          top: 24,
        }}>
        <Section style={{position: 'absolute', width: WIDTH}} isCenter>
          <Text
            variant="large"
            color={Colors['warning-500']}
            label={image.caption}
            fontWeight="semi-bold"
          />
        </Section>
        <TouchableOpacity
          onPress={() => {
            setIsOpen(false);
            navigation.goBack();
          }}
          style={{position: 'absolute', left: 16, zIndex: 999}}>
          <ArrowLeft2 size={24} color={theme?.colors.ICON} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <Layout contentContainerStyle={styles.container} isScrollable={false}>
      <ImageGallery
        close={() => navigation.goBack()}
        isOpen={isOpen}
        images={items}
        thumbSize={64}
        thumbColor={Colors.white}
        initialIndex={index}
        // renderFooterComponent={renderFooterComponent}
        renderHeaderComponent={renderHeaderComponent}
      />
    </Layout>
  );
};

export default GalleryDetail;

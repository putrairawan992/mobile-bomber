import * as React from 'react';
import {useState} from 'react';
import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
import {Images} from '../../theme';
import Carousel from 'react-native-snap-carousel';
import styles from './Styles/WelcomeStyle';
import {useNavigation} from '@react-navigation/native';
import {Welcome} from '../../components/molecules';
import {Container, Content} from '../../components/atoms';

interface SlidesI {
  id: number;
  title: string;
  text: string;
  image: any;
  imageStyle: any;
}

const slides: SlidesI[] = [
  {
    id: 1,
    title: 'Book Your Home',
    text: 'Lorem Ipsum is simply dummy text of the\nprinting and typesetting industry.',
    image: Images.BackHome,
    imageStyle: styles.welcomeSlideImg,
  },
  {
    id: 2,
    title: 'Chat With Owner',
    text: 'Lorem Ipsum is simply dummy text of the\nprinting and typesetting industry.',
    image: Images.ChatWithOwner,
    imageStyle: styles.welcomeTwoSlideImg,
  },
  {
    id: 3,
    title: 'Easy To Rent',
    text: 'Lorem Ipsum is simply dummy text of the\nprinting and typesetting industry.',
    image: Images.EasyToRent,
    imageStyle: styles.welcomeSlideImg,
  },
];

function WelcomeScreen() {
  const navigation = useNavigation<any>();
  const windowWidth = Dimensions.get('window').width;
  const [Index, setIndex] = useState(0);
  let renderItem = ({item}: any) => (
    <Welcome
      key={item.id}
      heading={item.title}
      peregraph={item.text}
      image={item.image}
      welcomeSlideImgStyle={item.imageStyle}
    />
  );

  return (
    <Container>
      <Content hasHeader contentContainerStyle={styles.container}>
        <Carousel
          ref={(c: any) => {
            renderItem = c;
          }}
          data={slides}
          renderItem={renderItem}
          sliderWidth={windowWidth}
          itemWidth={windowWidth}
          onSnapToItem={() => setIndex(renderItem.currentIndex)}
        />
        <View style={styles.welcomeBottomBtn}>
          {Index > 0 && (
            <TouchableOpacity
              style={styles.backBtnImgView}
              onPress={() => renderItem.snapToPrev()}>
              <Image
                source={Images.LeftArrowBlack}
                style={styles.backBtnImg}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
          {Index > 1 ? (
            <TouchableOpacity
              style={styles.nextStartBtnView}
              onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.nextStartBtn}>Start</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={
                Index > 0
                  ? styles.nextStartBtnView
                  : [styles.nextStartBtnView, styles.nextFirstStartBtnView]
              }
              onPress={() => renderItem.snapToNext()}>
              <Text style={styles.nextStartBtn}>Next</Text>
            </TouchableOpacity>
          )}
        </View>
      </Content>
    </Container>
  );
}

export default WelcomeScreen;

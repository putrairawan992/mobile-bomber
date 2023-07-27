import * as React from 'react';
import {Image, ScrollView} from 'react-native';
import {Beer, DiscoLight, Karaoke, WineBottle} from '../assets/icons';
import {
  Content,
  EntryAnimation,
  Gap,
  Section,
  Spacer,
  TextInput,
} from '../components/atoms';

import Container from '../components/atoms/Container';
import {Header} from '../components/molecules';
import {PlaceCategory} from '../components/organism';
import {TopPlaces} from '../components/organism/Places/TopPlaces';
import {UserAchievement} from '../components/organism/User/UserAchievement';
import {PlaceCategoryInterface} from '../interfaces/PlaceInterface';
import useTheme from '../theme/useTheme';
import {WIDTH} from '../utils/config';
import {PLACES_DATA, USER_ACHIEVEMENT} from '../utils/data';
import styles from './Styles';

// type Props = NativeStackScreenProps<MainStackParams, 'Home', 'MyStack'>;

function NightlifeScreen() {
  const theme = useTheme();
  const [searchValue, setSearchValue] = React.useState<string>('');

  const PLACE_CATEGORY: PlaceCategoryInterface[] = [
    {
      id: 'nightclub',
      title: 'Nightclub',
      icon: <DiscoLight size={24} color={theme?.colors.ICON} />,
    },
    {
      id: 'karaoke',
      title: 'Karaoke',
      icon: <Karaoke size={24} color={theme?.colors.ICON} />,
    },
    {
      id: 'pregames',
      title: 'Pregames',
      icon: <Beer size={24} color={theme?.colors.ICON} />,
    },
    {
      id: 'bar',
      title: 'Bar',
      icon: <WineBottle size={24} color={theme?.colors.ICON} />,
    },
  ];

  return (
    <Container>
      <Content
        hasHeader
        contentContainerStyle={{
          ...styles.container,
          backgroundColor: theme?.colors.BACKGROUND1,
        }}>
        <ScrollView>
          <EntryAnimation index={0}>
            <Header
              transparent
              hasLocation
              hasNotification
              hasLogo
              onLocationPress={() => console.log('joss')}
            />
          </EntryAnimation>
          <EntryAnimation index={1}>
            <Section padding="12px 16px">
              <TextInput
                value={searchValue}
                onChangeText={(value: string) => setSearchValue(value)}
                placeholder="Search party"
                type="search"
              />
            </Section>
          </EntryAnimation>
          <EntryAnimation index={2}>
            <Image
              source={{
                uri: 'https://d1hghorvcdp4xh.cloudfront.net/290/large/1681271342.jpg',
              }}
              style={{
                width: WIDTH,
                height: WIDTH,
              }}
            />
          </EntryAnimation>
          <Spacer sm />
          <EntryAnimation index={3}>
            <PlaceCategory title="Find Best Place" data={PLACE_CATEGORY} />
          </EntryAnimation>
          <Spacer llxx />
          <EntryAnimation index={4}>
            <UserAchievement data={USER_ACHIEVEMENT} />
          </EntryAnimation>
          <Gap height={32} />
          <TopPlaces
            title="Top 5 Night Club this Week"
            data={PLACES_DATA}
            itemWidthStyle
            fullSliderWidth
          />
          <Gap height={32} />
        </ScrollView>
      </Content>
    </Container>
  );
}

export default NightlifeScreen;

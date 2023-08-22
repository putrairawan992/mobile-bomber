/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FlatList, Image, Platform, UIManager} from 'react-native';
import {Gap, Section, Text} from '../../../components/atoms';
import {UserInterface} from '../../../interfaces/UserInterface';
import {Colors} from '../../../theme';
import {WIDTH} from '../../../utils/config';

interface FriendsTabProps {
  data: UserInterface[];
  searchValue: string;
}

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export const ExploreTab = ({data, searchValue}: FriendsTabProps) => {
  const width = (WIDTH - 40) / 2;

  const renderItem = ({item}: any) => (
    <Section style={{marginBottom: 8, flex: 1}}>
      <Image
        source={{uri: item.photoUrl}}
        style={{width, height: 222, borderRadius: 8}}
      />
      <Section padding="8px 12px">
        <Section isRow isBetween>
          <Text fontWeight="bold" label={item.fullName} />
          <Text label={`${item.age}yr`} color={Colors['black-40']} />
        </Section>
        <Gap height={8} />
        <Text variant="small" label={item.bio} color={Colors['black-20']} />
      </Section>
    </Section>
  );

  return (
    <Section padding="0px 12px" style={{flex: 1}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data.filter(
          (item: UserInterface) =>
            item.fullName && item.fullName.match(new RegExp(searchValue, 'i')),
        )}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={{flex: 1}}
        numColumns={2}
        columnWrapperStyle={{flex: 1, justifyContent: 'space-between'}}
      />
    </Section>
  );
};

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ArrowLeft} from 'iconsax-react-native';
import * as React from 'react';
import {
  TouchableSection,
  Gap,
  Layout,
  Text,
  Section,
  TextInput,
} from '../../../components/atoms';
import {MainStackParams} from '../../../navigation/MainScreenStack';
import {Colors} from '../../../theme';

type Props = NativeStackScreenProps<
  MainStackParams,
  'SearchFriends',
  'MyStack'
>;

function SearchFriends({navigation}: Props) {
  const [searchValue, setSearchValue] = React.useState<string>('');
  return (
    <Layout>
      <TouchableSection
        isRow
        onPress={() => navigation.goBack()}
        padding="16px 20px">
        <ArrowLeft size={24} color={Colors['white-100']} />
        <Gap width={8} />
        <Text label="Back" />
      </TouchableSection>
      <Section padding="0px 20px">
        <TextInput
          value={searchValue}
          onChangeText={(value: string) => setSearchValue(value)}
          placeholder="Search anythings"
          type="search"
        />
        <Gap height={32} />
      </Section>
    </Layout>
  );
}

export default SearchFriends;

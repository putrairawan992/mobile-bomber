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
import {FriendsTab} from '../FriendsTab';
import {FriendInterface} from '../../../interfaces/UserInterface';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {Pressable} from 'react-native';
import useTheme from '../../../theme/useTheme';
import {FriendshipService} from '../../../service/FriendshipService';
import {useFocusEffect} from '@react-navigation/native';
import {useAppSelector} from '../../../hooks/hooks';

type Props = NativeStackScreenProps<
  MainStackParams,
  'SearchFriends',
  'MyStack'
>;

function SearchFriends({navigation}: Props) {
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [friendshipData, setFriendshipData] = React.useState<FriendInterface[]>(
    [],
  );
  const [selectedUser, setSelectedUser] =
    React.useState<FriendInterface | null>(null);
  const {user} = useAppSelector(state => state.user);
  const [sheetAction, setSheetAction] = React.useState<string>('');
  const friendSheetRef = React.useRef<BottomSheetModal>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [sheetIndex, setSheetIndex] = React.useState<number>(-1);
  const theme = useTheme();
  console.log(isLoading, sheetAction, selectedUser);

  const onOpenBottomSheet = (sheetType: string, data?: FriendInterface) => {
    data && setSelectedUser(data);

    setSheetAction(sheetType);
    setTimeout(() => {
      friendSheetRef.current?.present();
    }, 100);
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      await Promise.all([
        FriendshipService.getFriendship({
          userId: user.id,
        }),
      ])
        .then(response => {
          setFriendshipData(response[0].data);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    } catch (error: any) {}
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigation]),
  );

  const handleSheetChanges = React.useCallback((index: number) => {
    setSheetIndex(index);
  }, []);

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
        <FriendsTab
          isShowFriend={true}
          data={friendshipData}
          searchValue={searchValue}
          onSelectUser={userData => onOpenBottomSheet('userProfile', userData)}
          onFriendOption={userData =>
            onOpenBottomSheet('friendOption', userData)
          }
        />
      </Section>
      <BottomSheetModal
        ref={friendSheetRef}
        index={0}
        enablePanDownToClose
        snapPoints={['48']}
        backdropComponent={({style}) =>
          sheetIndex === 0 ? (
            <Pressable
              onPress={() => friendSheetRef.current?.close()}
              style={[style, {backgroundColor: 'rgba(0, 0, 0, 0.60)'}]}
            />
          ) : (
            <></>
          )
        }
        handleStyle={{
          backgroundColor: theme?.colors.SECTION,
          borderTopRightRadius: 14,
          borderTopLeftRadius: 14,
        }}
        handleIndicatorStyle={{backgroundColor: Colors['black-70'], width: 50}}
        onChange={handleSheetChanges}
      />
    </Layout>
  );
}

export default SearchFriends;

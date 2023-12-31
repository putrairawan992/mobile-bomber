/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {FriendInterface} from '../../../../interfaces/UserInterface';
import {Colors} from '../../../../theme';
import useTheme from '../../../../theme/useTheme';
import {Avatar, Button, Gap, GradientText, Section, Text} from '../../../atoms';

interface FriendBottomSheetProps {
  data: FriendInterface | null;
  isFriend: boolean;
  onConfirm: () => void;
}

export const FriendBottomSheet = ({
  data,
  isFriend,
  onConfirm,
}: FriendBottomSheetProps) => {
  const theme = useTheme();
  return (
    <Section
      padding="0px 16px"
      style={{flex: 1}}
      backgroundColor={theme?.colors.SECTION}>
      <Section isCenter>
        <Gap height={15} />
        <GradientText
          xAxis={1.4}
          colors={['#A060FA', '#C800CC']}
          style={{
            fontSize: 16,
            fontFamily: 'Inter-Bold',
          }}>
          Profile
        </GradientText>
        <Gap height={4} />
        <Avatar
          size="ultra-large"
          url={data?.photoUrl ?? ''}
          alt={data?.fullName as string}
        />
        <Gap height={15} />
        <Text fontWeight="semi-bold" variant="base" label={data?.fullName} />
        <Gap height={4} />
        <Section isRow>
          <Text label={`${data?.age}yr | `} color={Colors['black-40']} />
          <Text label={data?.userName} color={Colors['black-40']} />
        </Section>
      </Section>
      <Gap height={30} />
      <Section
        padding="12px 12px"
        backgroundColor={theme?.colors.SECTION2}
        rounded={8}>
        <Text
          label={data?.bio}
          fontWeight="medium"
          color={Colors['black-20']}
        />
      </Section>
      <Gap height={12} />
      <Section
        padding="12px 12px"
        backgroundColor={theme?.colors.SECTION2}
        rounded={8}
        isRow>
        <View
          style={{
            height: 28,
            width: 28,
            borderRadius: 28,
            backgroundColor: '#D9D9D9',
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: 26,
            height: 28,
            width: 28,
            borderRadius: 28,
            backgroundColor: '#838383',
          }}
        />
        <Text
          label={'Michi and 3 other also in her friendship'}
          fontWeight="medium"
          color={Colors['black-20']}
          style={{marginLeft: 18}}
        />
      </Section>
      <Gap height={15} />
      <Section
        style={{
          position: 'absolute',
          bottom: 20,
          width: '100%',
          alignSelf: 'center',
        }}>
        {isFriend ? (
          <>
            <Button
              type="primary"
              onPress={() => undefined}
              title="Set As Favorites"
            />
            <Gap height={8} />
            <Button type="secondary" onPress={() => undefined} title="Block" />
          </>
        ) : (
          <>
            <Button
              type="primary"
              onPress={() => onConfirm()}
              title="Send Friend Request"
            />
          </>
        )}
      </Section>
    </Section>
  );
};

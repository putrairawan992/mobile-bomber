/* eslint-disable react-native/no-inline-styles */
import {Lock1, Star1, Trash} from 'iconsax-react-native';
import React from 'react';
import {DragHand, Smiley} from '../../../../assets/icons';
import {OptionMenuInterface} from '../../../../interfaces/Interface';
import {FriendInterface} from '../../../../interfaces/UserInterface';
import useTheme from '../../../../theme/useTheme';
import {gradientMapping} from '../../../../utils/config';
import {Gap, GradientText, Section} from '../../../atoms';
import {ListItem} from '../../../molecules';

interface FriendOptionSheetProps {
  data: FriendInterface | null;
  onInviteParty: (data: FriendInterface | null) => void;
}
export const FriendOptionSheet = ({
  data,
  onInviteParty,
}: FriendOptionSheetProps) => {
  const theme = useTheme();

  const OPTIONS_MENU: OptionMenuInterface[] = [
    {
      title: 'Invite to Party',
      icon: <DragHand size={20} color={theme?.colors.ICON} />,
      onPress: () => onInviteParty(data ?? null),
    },
    {
      title: 'Friendship',
      icon: <Smiley size={20} color={theme?.colors.ICON} />,
      onPress: () => undefined,
    },
    {
      title: 'Set Favourites',
      icon: <Star1 size={20} color={theme?.colors.ICON} />,
      onPress: () => undefined,
    },
    {
      title: 'Block',
      icon: <Lock1 size={20} color={theme?.colors.ICON} />,
      onPress: () => undefined,
    },
    {
      title: 'Remove',
      icon: <Trash size={20} color={theme?.colors.ICON} />,
      onPress: () => undefined,
    },
  ];
  return (
    <Section
      padding="0px 16px"
      style={{flex: 1}}
      backgroundColor={theme?.colors.SECTION}>
      <Section isCenter>
        <Gap height={15} />
        <GradientText
          xAxis={1}
          colors={
            gradientMapping['textPrimary' as keyof typeof gradientMapping].color
          }
          style={{
            fontSize: 16,
            fontFamily: 'Inter-Bold',
          }}>
          More option
        </GradientText>
      </Section>
      <Gap height={30} />
      {OPTIONS_MENU.map((item: OptionMenuInterface, idx: number) => (
        <ListItem
          title={item.title}
          icon={item.icon ?? null}
          onPress={item.onPress}
          index={idx}
          key={idx}
        />
      ))}
    </Section>
  );
};

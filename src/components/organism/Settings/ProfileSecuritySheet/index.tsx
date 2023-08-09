/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Colors} from '../../../../theme';
import useTheme from '../../../../theme/useTheme';
import {gradientMapping} from '../../../../utils/config';
import {Gap, GradientText, Section, Switch, Text} from '../../../atoms';

export const ProfileSecuritySheet = () => {
  const theme = useTheme();
  const [isAllowFindMeInExplore, setIsAllowFindMeInExplore] =
    useState<boolean>(false);
  const [isShareNickname, setIsShareNickName] = useState<boolean>(false);
  const [isAllowInviteMe, setIsAllowInviteMe] = useState<boolean>(false);
  return (
    <Section
      style={{flex: 1}}
      padding="0px 16px"
      backgroundColor={theme?.colors.BACKGROUND1}>
      <Section isCenter>
        <GradientText
          xAxis={0.8}
          colors={
            gradientMapping['textPrimary' as keyof typeof gradientMapping].color
          }
          style={{
            fontSize: 16,
            fontFamily: 'Inter-Bold',
          }}>
          Profile Security
        </GradientText>
      </Section>
      <Gap height={26} />
      <Section
        padding="16px 16px"
        backgroundColor={theme?.colors.SECTION}
        rounded={8}>
        <Text variant="base" fontWeight="semi-bold" label="Privacy Setting" />
        <Gap height={15} />
        <Section isRow isBetween>
          <Text label="Allow other find me in explore" />
          <Switch
            value={isAllowFindMeInExplore}
            onValueChange={value => setIsAllowFindMeInExplore(value)}
            backgroundInactive={Colors.black}
          />
        </Section>
        <Gap height={14} />
        <Section isRow isBetween>
          <Text label="Share our nickname" />
          <Switch
            value={isShareNickname}
            onValueChange={value => setIsShareNickName(value)}
            backgroundInactive={Colors.black}
          />
        </Section>
        <Gap height={14} />
        <Section isRow isBetween>
          <Text label="Allow everyone invite me" />
          <Switch
            value={isAllowInviteMe}
            onValueChange={value => setIsAllowInviteMe(value)}
            backgroundInactive={Colors.black}
          />
        </Section>
      </Section>
    </Section>
  );
};

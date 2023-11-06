/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Gap, Layout, Section, Switch, Text} from '../../../components/atoms';
import {Header} from '../../../components/molecules';
import {StyleSheet} from 'react-native';
import {Colors} from '../../../theme';
import useTheme from '../../../theme/useTheme';

export default function Settings() {
  const theme = useTheme();
  const [isAllowFindMeInExplore, setIsAllowFindMeInExplore] =
    useState<boolean>(false);
  const [isShareNickname, setIsShareNickName] = useState<boolean>(false);
  const [isAllowInviteMe, setIsAllowInviteMe] = useState<boolean>(false);
  return (
    <Layout contentContainerStyle={styles.parent}>
      <Header
        transparent
        title="Settings"
        titleStyle={{color: Colors['white-100']}}
        hasBackBtn
      />
      <Gap height={26} />
      <Section
        padding="16px 16px"
        backgroundColor={theme?.colors.SECTION}
        rounded={8}
        style={{marginHorizontal: 16}}>
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
    </Layout>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
});

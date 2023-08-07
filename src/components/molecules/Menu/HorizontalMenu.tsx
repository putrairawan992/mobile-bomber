/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, ScrollView} from 'react-native';
import useTheme from '../../../theme/useTheme';
import {Gap, Section, Text} from '../../atoms';
import {ScaleAnimation} from '../../atoms/animations/ScaleAnimation';

export interface HorizontalMenuInterface {
  id: number;
  title: string;
}

interface HorizontalSectionMenuProps {
  menu: Array<HorizontalMenuInterface>;
  handleSelect: (id: number) => void;
  selectedMenu: number;
}

const HorizontalSectionMenu = ({
  menu,
  handleSelect,
  selectedMenu,
}: HorizontalSectionMenuProps) => {
  const theme = useTheme();

  return (
    <Section isRow padding="16px 16px">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {menu.map((item: HorizontalMenuInterface, i: number) => {
          let isSelected: boolean = Boolean(selectedMenu === item.id);
          return (
            <ScaleAnimation
              onPress={() => handleSelect(item.id)}
              disabled={false}
              scaleTo={0.92}
              key={i}>
              <View
                style={{
                  marginRight: 20,
                  width: 'auto',
                  borderBottomWidth: 2,
                  borderBottomColor: isSelected
                    ? theme?.colors.PRIMARY
                    : 'transparent',
                }}>
                <Text
                  label={item.title}
                  color={
                    isSelected
                      ? theme?.colors.PRIMARY
                      : theme?.colors.TEXT_PRIMARY
                  }
                />
                <Gap height={4} />
              </View>
            </ScaleAnimation>
          );
        })}
      </ScrollView>
    </Section>
  );
};

export default HorizontalSectionMenu;

/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity} from 'react-native';
import useTheme from '../../../../theme/useTheme';
import {Gap, Section, Text} from '../../../atoms';
import {ArrowLeft} from 'iconsax-react-native';
import {Image} from 'react-native';
import {Images} from '../../../../theme';

interface TableLayoutSheetProps {
  hasBackNavigation: boolean;
  onBackNavigation: () => void;
  title: string;
}

export const TableLayoutSheet = ({
  hasBackNavigation,
  onBackNavigation,
  title,
}: TableLayoutSheetProps) => {
  const theme = useTheme();
  return (
    <Section
      padding="0px 16px"
      style={{flex: 1}}
      backgroundColor={theme?.colors.SECTION}>
      {hasBackNavigation && (
        <TouchableOpacity
          style={{position: 'absolute', zIndex: 999, left: 16, top: 16}}
          onPress={() => {
            onBackNavigation();
          }}>
          <ArrowLeft size={24} color={theme?.colors.ICON} />
        </TouchableOpacity>
      )}
      <Section isCenter>
        <Gap height={15} />
        <Text
          variant="base"
          fontWeight="bold"
          label={title}
          color={theme?.colors.WARNING}
          textAlign="center"
        />
      </Section>
      <Gap height={30} />
      <Image
        source={Images.TableLayout}
        style={{
          width: '100%',
          height: 320,
          resizeMode: 'stretch',
          borderRadius: 8,
        }}
      />
    </Section>
  );
};

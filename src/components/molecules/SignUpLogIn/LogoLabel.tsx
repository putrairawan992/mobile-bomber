/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet} from 'react-native';
import {Logo} from '../../../assets/icons';
import useTheme from '../../../theme/useTheme';
import useThemedStyles from '../../../theme/useThemedStyles';
import {GradientText, Section, Spacer, Text} from '../../atoms';

interface LogoLabelPropsI {
  title: string;
  subtitle: string;
}

export const LogoLabel = ({title, subtitle}: LogoLabelPropsI) => {
  const theme = useTheme();
  const s = useThemedStyles(Styles);
  return (
    <Section>
      <Logo size={64} color={theme?.colors.PRIMARY} />
      <Spacer sm />
      <GradientText colors={['#A060FA', '#C800CC']} style={s.headerText}>
        {title}
      </GradientText>
      <Text
        variant="base"
        label={subtitle}
        color={theme?.colors.TEXT_PRIMARY}
        style={{marginBottom: 56}}
      />
    </Section>
  );
};

const Styles = () =>
  StyleSheet.create({
    headerText: {
      fontSize: 32,
      fontFamily: 'Poppins-SemiBold',
    },
  });

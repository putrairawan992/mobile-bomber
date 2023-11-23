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
  colors?: string;
}

export const LogoLabel = ({title, subtitle, colors}: LogoLabelPropsI) => {
  const theme = useTheme();
  const s = useThemedStyles(Styles);
  return (
    <Section>
      <Logo size={55} color={theme?.colors.PRIMARY} />
      <Spacer sm />
      {colors ? (
        <GradientText colors={['#A060FF', '#C800DD']} style={s.headerText}>
          {title}
        </GradientText>
      ) : (
        <Text
          variant="ultra-large"
          label={title}
          color={theme?.colors.PRIMARY}
          style={{marginBottom: 10, fontSize: 32}}
        />
      )}

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

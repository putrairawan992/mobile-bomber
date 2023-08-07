/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {King} from '../../../../assets/icons';
import {TicketInterface} from '../../../../interfaces/BookingInterface';
import {Colors} from '../../../../theme';
import useTheme from '../../../../theme/useTheme';
import {gradientMapping, WIDTH} from '../../../../utils/config';
import {
  EntryAnimation,
  Gap,
  GradientText,
  ScaleAnimation,
  Section,
  Text,
} from '../../../atoms';

interface CardTicketProps {
  data: TicketInterface;
  onSelect: (id: string) => void;
  index: number;
}

export const CardTicket = ({data, onSelect, index}: CardTicketProps) => {
  const theme = useTheme();
  return (
    <EntryAnimation index={index}>
      <ScaleAnimation
        disabled={false}
        scaleTo={0.97}
        onPress={() => onSelect(data.id)}>
        <LinearGradient
          colors={
            gradientMapping[data.title as keyof typeof gradientMapping].color
          }
          start={{x: 0.0, y: 1.0}}
          end={{x: 1.0, y: 1.0}}
          style={{
            width: '100%',
            borderRadius: 8,
            marginBottom: 32,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              marginTop: 2,
              marginBottom: 2,
              width: WIDTH - 34,
              backgroundColor: theme?.colors.BACKGROUND1,
              borderRadius: 8,
              padding: 20,
            }}>
            <Section isRow isBetween>
              <GradientText
                xAxis={0.8}
                colors={
                  gradientMapping[data.title as keyof typeof gradientMapping]
                    .color
                }
                style={{
                  fontSize: 18,
                  fontFamily: 'Inter-Bold',
                  lineHeight: 27,
                }}>
                {data.title}
              </GradientText>
              <Section padding="4px 8px" backgroundColor="#292929" rounded={4}>
                <GradientText
                  xAxis={0.8}
                  colors={
                    gradientMapping[data.title as keyof typeof gradientMapping]
                      .color
                  }
                  style={{
                    fontSize: 14,
                    fontFamily: 'Inter-Bold',
                    lineHeight: 27,
                  }}>
                  {'NT ' + data.price}
                </GradientText>
              </Section>
            </Section>
            <Text label={`qty ${data.qty}`} color={Colors['black-60']} />
            <Gap height={12} />
            <Text label={data.description} />
            <Gap height={20} />
            {Array.isArray(data.features) &&
              data.features.map((feat: string, idx: number) => (
                <Section isRow key={idx} style={{marginBottom: 12}}>
                  <King size={16} color={Colors['black-40']} />
                  <Gap width={12} />
                  <Text
                    variant="small"
                    color={Colors['black-40']}
                    label={feat}
                  />
                </Section>
              ))}
          </View>
        </LinearGradient>
      </ScaleAnimation>
    </EntryAnimation>
  );
};

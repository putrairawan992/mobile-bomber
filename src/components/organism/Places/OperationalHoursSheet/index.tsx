/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Clock, ClockGradient} from '../../../../assets/icons';
import {PlaceOperationalTimeInterface} from '../../../../interfaces/PlaceInterface';
import {Colors} from '../../../../theme';
import useTheme from '../../../../theme/useTheme';
import {gradientMapping} from '../../../../utils/config';
import {dateFormatter} from '../../../../utils/dateFormatter';
import {EntryAnimation, Gap, GradientText, Section, Text} from '../../../atoms';

interface OperationalHoursSheetProps {
  data: PlaceOperationalTimeInterface[];
}

export const OperationalHoursSheet = ({data}: OperationalHoursSheetProps) => {
  const theme = useTheme();
  return (
    <Section
      padding="0px 16px"
      style={{flex: 1}}
      backgroundColor={theme?.colors.BACKGROUND1}>
      <Section isCenter>
        <Gap height={15} />
        <GradientText
          xAxis={0.5}
          colors={
            gradientMapping['textPrimary' as keyof typeof gradientMapping].color
          }
          style={{
            fontSize: 16,
            fontFamily: 'Inter-Bold',
          }}>
          Operational Time
        </GradientText>
      </Section>
      <Gap height={22} />
      <EntryAnimation index={0}>
        <Section backgroundColor="#333" padding="4px 16px" rounded={12}>
          {data.map((item, idx) => {
            const isClose = item.isClose;
            return (
              <EntryAnimation index={idx + 1} key={`${item.day}_${idx}`}>
                <Section isRow style={{marginVertical: 12}}>
                  {isClose ? (
                    <Clock color={Colors['danger-400']} size={16} />
                  ) : (
                    <ClockGradient size={16} />
                  )}
                  <Gap width={4} />
                  <Text
                    label={
                      isClose
                        ? `${item.day}: Close`
                        : `${item.day}: ${item.open} - ${item.close}`
                    }
                    fontWeight="regular"
                    variant="small"
                    color={isClose ? Colors['danger-400'] : undefined}
                  />
                  <Gap width={4} />
                  {dateFormatter(new Date(), 'eeee') === item.day &&
                    !isClose && (
                      <Text
                        label={'(Open)'}
                        color={Colors['success-500']}
                        variant="small"
                        fontWeight="bold"
                      />
                    )}
                </Section>
              </EntryAnimation>
            );
          })}
        </Section>
      </EntryAnimation>
    </Section>
  );
};

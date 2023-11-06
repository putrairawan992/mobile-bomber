/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Clock, ClockGradient} from '../../../../assets/icons';
import {PlaceOperationalTimeInterface} from '../../../../interfaces/PlaceInterface';
import {Colors} from '../../../../theme';
import useTheme from '../../../../theme/useTheme';
import {gradientMapping} from '../../../../utils/config';
import {dateFormatter, getDayNight} from '../../../../utils/dateFormatter';
import {EntryAnimation, Gap, GradientText, Section, Text} from '../../../atoms';
import {ScrollView} from 'react-native-gesture-handler';

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
          Operational time
        </GradientText>
      </Section>
      <Gap height={22} />
      <EntryAnimation index={0}>
        <ScrollView>
          <Section backgroundColor="#333" padding="4px 16px" rounded={12}>
            {data.map((item, idx) => {
              const currentTime =
                new Date().getHours() + '.' + new Date().getMinutes();
              const isOpen = Number(currentTime) > Number(item.open);
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
                          : `${item.day}: ${getDayNight(
                              item.open as string,
                            )} - ${getDayNight(item.close as string)}`
                      }
                      fontWeight="regular"
                      variant="small"
                      color={isClose ? Colors['danger-400'] : undefined}
                    />
                    <Gap width={4} />
                    {dateFormatter(new Date(), 'eeee') === item.day && (
                      <Text
                        label={`(${isOpen ? 'Open' : 'Closed'})`}
                        color={
                          isOpen ? Colors['success-500'] : Colors['danger-400']
                        }
                        variant="small"
                        fontWeight="bold"
                      />
                    )}
                  </Section>
                </EntryAnimation>
              );
            })}
          </Section>
          <Gap height={75} />
        </ScrollView>
      </EntryAnimation>
    </Section>
  );
};

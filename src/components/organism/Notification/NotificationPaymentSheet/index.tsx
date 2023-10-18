/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  CalendarGradient,
  HouseGradient,
  MoneySquare,
  UserCrown,
} from '../../../../assets/icons';
import {BillNotificationInterface} from '../../../../interfaces/NotificationInterface';
import {Colors} from '../../../../theme';
import useTheme from '../../../../theme/useTheme';
import {gradientMapping} from '../../../../utils/config';
import {dateFormatter} from '../../../../utils/dateFormatter';
import {currency} from '../../../../utils/function';
import {Button, Gap, GradientText, Section, Text} from '../../../atoms';

interface NotificationPaymentSheetProps {
  data: BillNotificationInterface | null;
}

export const NotificationPaymentSheet = ({
  data,
}: NotificationPaymentSheetProps) => {
  const theme = useTheme();

  return (
    <Section
      padding="0px 16px"
      style={{flex: 1}}
      backgroundColor={theme?.colors.BACKGROUND1}>
      <Section isCenter>
        <MoneySquare size={48} color={theme?.colors.ICON} />
        <Gap height={4} />
        <GradientText
          xAxis={0.5}
          colors={
            gradientMapping['textPrimary' as keyof typeof gradientMapping].color
          }
          style={{
            fontSize: 16,
            fontFamily: 'Inter-Bold',
          }}>
          Payment Request
        </GradientText>
        <Gap height={16} />
        <Text
          variant="ultra-large"
          fontWeight="bold"
          label={currency(data?.price ?? 0)}
        />
        <Gap height={16} />
      </Section>
      <Section
        padding="12px 12px"
        rounded={8}
        backgroundColor={theme?.colors.SECTION}>
        <Text
          fontWeight="medium"
          label="Hi, mickey this is payment for our food.. don’t forget to pay ya !"
          color={Colors['black-20']}
        />
      </Section>
      <Gap height={12} />
      <Section
        isRow
        style={{justifyContent: 'center'}}
        padding="12px 12px"
        rounded={8}
        backgroundColor={theme?.colors.SECTION}>
        <Section isRow>
          <UserCrown size={20} />
          <Gap width={4} />
          <Text
            variant="small"
            color={Colors['black-30']}
            fontWeight="medium"
            label={data?.hosted}
          />
        </Section>
        <Gap width={18} />
        <Section isRow>
          <HouseGradient size={20} />
          <Gap width={4} />
          <Text
            variant="small"
            color={Colors['black-30']}
            fontWeight="medium"
            label={data?.booking.table}
          />
        </Section>
        <Gap width={18} />
        <Section isRow>
          <CalendarGradient size={20} />
          <Gap width={4} />
          <Text
            variant="small"
            color={Colors['black-30']}
            fontWeight="medium"
            label={dateFormatter(
              new Date(data?.booking.date as string),
              'EEE, dd MMM',
            )}
          />
        </Section>
      </Section>
      <Section
        style={{
          position: 'absolute',
          bottom: 24,
          width: '100%',
          alignSelf: 'center',
        }}>
        <Button type="primary" onPress={() => undefined} title={'Pay'} />
        <Gap height={8} />
        <Button type="secondary" onPress={() => undefined} title={'Cancel'} />
      </Section>
    </Section>
  );
};

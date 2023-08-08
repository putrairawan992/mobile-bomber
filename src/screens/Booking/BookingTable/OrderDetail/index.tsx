/* eslint-disable react-native/no-inline-styles */
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {AddCircle, ArrowLeft} from 'iconsax-react-native';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Building, Calendar, CircleDot, Coupon} from '../../../../assets/icons';
import {
  Button,
  Gap,
  GradientText,
  Section,
  Switch,
  Text,
} from '../../../../components/atoms';
import {TableInterface} from '../../../../interfaces/BookingInterface';
import {PlaceInterface} from '../../../../interfaces/PlaceInterface';
import {Colors, Images} from '../../../../theme';
import useTheme from '../../../../theme/useTheme';
import {WIDTH} from '../../../../utils/config';
import {dateFormatter} from '../../../../utils/dateFormatter';

interface TableOrderDetailProps {
  placeData: PlaceInterface | null;
  selectedTable: TableInterface | null;
  isFullPayment: boolean;
  isSplitBill: boolean;
  toggleSwitchSplitBill: () => void;
  toggleSwitchPayFull: () => void;
  selectedDate: string;
  isWalkIn?: boolean;
  hasBackNavigation?: boolean;
  onBackNavigation?: () => void;
}

export const TableOrderDetail = ({
  placeData,
  selectedTable,
  isFullPayment,
  selectedDate,
  isSplitBill,
  toggleSwitchSplitBill,
  toggleSwitchPayFull,
  isWalkIn,
  hasBackNavigation,
  onBackNavigation,
}: TableOrderDetailProps) => {
  const theme = useTheme();
  return (
    <BottomSheetScrollView
      contentContainerStyle={{
        backgroundColor: theme?.colors.BACKGROUND1,
        paddingHorizontal: 16,
      }}>
      {hasBackNavigation && (
        <TouchableOpacity
          style={{position: 'absolute', zIndex: 999, left: 16}}
          onPress={onBackNavigation}>
          <ArrowLeft size={24} color={theme?.colors.ICON} />
        </TouchableOpacity>
      )}
      <Section isCenter padding="10px 0px">
        <GradientText
          xAxis={1}
          colors={['#C800CC', '#A060FA']}
          style={{
            fontSize: 16,
            fontFamily: 'Inter-Bold',
          }}>
          Order Detail
        </GradientText>
      </Section>
      <Gap height={12} />
      <Section
        isRow
        padding="12px 12px"
        backgroundColor={theme?.colors.SECTION}
        rounded={8}>
        <Section style={{flex: 1}}>
          <Section isRow>
            <Image
              source={{uri: placeData?.coverImage}}
              style={{width: 71, height: 57, borderRadius: 5}}
            />
            <Gap width={10} />
            <Section style={{flex: 1}}>
              <Section isRow isBetween>
                <Text
                  variant="large"
                  fontWeight="bold"
                  label={placeData?.name}
                />
                <Section
                  padding="2px 4px"
                  rounded={4}
                  style={{borderWidth: 1, borderColor: 'blue'}}>
                  <Text
                    variant="small"
                    fontWeight="medium"
                    label="Table Booking"
                  />
                </Section>
              </Section>
              <Gap height={12} />
              <Text
                variant="small"
                fontWeight="medium"
                label={placeData?.address}
                color={Colors['black-50']}
              />
            </Section>
          </Section>
          <Gap height={10} />
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#414141',
              flex: 1,
            }}
          />
          <Gap height={10} />
          <Section isRow isBetween={isWalkIn ? true : false}>
            <Section isRow>
              <Image
                source={Images.UserCrown}
                style={{width: 16, height: 16}}
              />
              <Gap width={4} />
              <Text
                variant="small"
                fontWeight="medium"
                label={'Jean Chen'}
                color={Colors['black-30']}
              />
            </Section>
            {!isWalkIn && (
              <>
                <Gap width={24} />
                <Section isRow>
                  <Building size={16} />
                  <Gap width={4} />
                  <Text
                    variant="small"
                    fontWeight="medium"
                    label={selectedTable?.text}
                    color={Colors['black-30']}
                  />
                </Section>
              </>
            )}
            <Gap width={24} />
            <Section isRow>
              <Calendar size={16} />
              <Gap width={4} />
              <Text
                variant="small"
                fontWeight="medium"
                label={
                  selectedDate
                    ? dateFormatter(new Date(selectedDate), 'EEE, dd MMM yyy')
                    : ''
                }
                color={Colors['black-30']}
              />
            </Section>
          </Section>
        </Section>
      </Section>
      <Gap height={12} />
      <Section
        isRow
        padding="12px 12px"
        backgroundColor={theme?.colors.SECTION}
        rounded={8}
        isBetween>
        <Section style={{width: WIDTH - 128}}>
          <Text fontWeight="bold" label="Pay in full" />
          <Gap height={4} />
          <Text
            variant="small"
            label="Pay the minimum spend (NT 30,000) now and receive 5% off"
            color={Colors['black-40']}
          />
        </Section>
        <Switch
          value={isFullPayment}
          onValueChange={() => toggleSwitchPayFull()}
          backgroundInactive={Colors.black}
        />
      </Section>
      <Gap height={12} />
      <Section
        padding="12px 12px"
        backgroundColor={theme?.colors.SECTION}
        rounded={8}
        style={{flex: 1}}>
        <Text variant="base" fontWeight="semi-bold" label="Bill Detail" />
        <Gap height={10} />
        <Section isRow isBetween>
          <Section>
            <Text label={selectedTable?.text} />
            <Text
              label="Normal Pay"
              color={Colors['black-40']}
              variant="small"
            />
          </Section>
          <Text
            textAlign="right"
            label={
              selectedTable?.minOrder
                ? 'NT ' + selectedTable?.minOrder.toString()
                : ''
            }
          />
        </Section>
        {isFullPayment && (
          <>
            <Gap height={8} />
            <Section isRow isBetween>
              <Section>
                <Text label="Discount" />
                <Text label="5%" color={Colors['black-40']} variant="small" />
              </Section>
              <Text
                label={
                  selectedTable?.minOrder
                    ? 'NT ' + (selectedTable?.minOrder * 0.05).toString()
                    : ''
                }
              />
            </Section>
          </>
        )}
        <Gap height={8} />
        <Section isRow isBetween>
          <Section>
            <Text label="Service Fee" />
            <Text label="5%" color={Colors['black-40']} variant="small" />
          </Section>
          <Text
            label={
              selectedTable?.minOrder
                ? 'NT ' + (selectedTable?.minOrder * 0.05).toString()
                : ''
            }
          />
        </Section>
        <Gap height={20} />
        <Section isRow isBetween>
          <Text label="Total" fontWeight="bold" />
          <Text
            label={
              selectedTable?.minOrder
                ? isFullPayment
                  ? 'NT ' + selectedTable.minOrder.toString()
                  : 'NT ' +
                    (
                      selectedTable.minOrder +
                      selectedTable?.minOrder * 0.05
                    ).toString()
                : ''
            }
            fontWeight="bold"
          />
        </Section>
      </Section>
      <Gap height={20} />
      <Section
        padding="16px 16px"
        backgroundColor={theme?.colors.SECTION}
        rounded={8}
        style={{flex: 1}}>
        <Section isRow isBetween>
          <Text fontWeight="bold" label="Payment Method" />
          <AddCircle color={theme?.colors.ICON} size={24} />
        </Section>
        <Gap height={20} />
        <Section isRow>
          <CircleDot size={16} color={Colors['info-500']} />
          <Gap width={4} />
          <Text fontWeight="medium" label="VISA +64" />
        </Section>
      </Section>
      <Gap height={20} />
      <Section
        padding="16px 16px"
        backgroundColor={theme?.colors.SECTION}
        rounded={8}
        isRow
        isBetween>
        <Text fontWeight="bold" label="Split bill" />
        <Switch
          value={isSplitBill}
          onValueChange={() => toggleSwitchSplitBill()}
          backgroundInactive={Colors.black}
        />
      </Section>
      <Gap height={20} />
      <Section
        padding="16px 16px"
        backgroundColor={theme?.colors.SECTION}
        rounded={8}
        isRow
        style={{flex: 1}}>
        <Coupon size={32} color={Colors['warning-500']} />
        <Text
          fontWeight="bold"
          label="      Apply promo to get special discount"
        />
      </Section>

      <Gap height={20} />
      <Button type="primary" title="Confirm" onPress={() => undefined} />
      <Gap height={20} />
    </BottomSheetScrollView>
  );
};

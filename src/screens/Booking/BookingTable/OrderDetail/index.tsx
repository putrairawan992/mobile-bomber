/* eslint-disable react-native/no-inline-styles */
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {AddCircle, ArrowLeft} from 'iconsax-react-native';
import React, {useState} from 'react';
import {Image, Platform, Switch, TouchableOpacity, View} from 'react-native';
import {
  Building,
  Calendar,
  CircleDot,
  Close,
  Coupon,
} from '../../../../assets/icons';
import {
  Button,
  DefaultText,
  Gap,
  GradientText,
  Section,
  Text,
} from '../../../../components/atoms';
import {TableInterface} from '../../../../interfaces/BookingInterface';
import {
  CouponInterface,
  PlaceInterface,
} from '../../../../interfaces/PlaceInterface';
import {Colors, Images} from '../../../../theme';
import useTheme from '../../../../theme/useTheme';
import {WIDTH} from '../../../../utils/config';
import {dateFormatter} from '../../../../utils/dateFormatter';
import {IcChevronRight} from '../../../../theme/Images';
import {images} from '../../../../utils/images';
import colors from '../../../../styles/colors';
import ModalBookingTablePromotion from '../../../../components/molecules/Modal/ModalBookingTablePromotion';
import {currency} from '../../../../utils/function';

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
  onPay: () => void;
  isLoading: boolean;
  coupons: CouponInterface[];
  onCouponApplied: (coupon: CouponInterface) => void;
  onRemoveCoupon: (coupon: CouponInterface) => void;
}

export const TableOrderDetail = ({
  placeData,
  selectedTable,
  isFullPayment,
  selectedDate,
  // isSplitBill,
  // toggleSwitchSplitBill,
  toggleSwitchPayFull,
  isWalkIn,
  hasBackNavigation,
  onBackNavigation,
  onPay,
  isLoading,
  coupons,
  onCouponApplied,
  onRemoveCoupon,
}: TableOrderDetailProps) => {
  const theme = useTheme();

  const [showPromo, setShowPromo] = useState<boolean>(false);

  return (
    <BottomSheetScrollView
      contentContainerStyle={{
        backgroundColor: theme?.colors.BACKGROUND1,
        paddingHorizontal: 16,
        borderTopWidth: 1,
        borderTopColor: theme?.colors.BACKGROUND1,
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
          Order detail
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
            label={`Pay the minimum spend (${currency(
              Number(selectedTable?.minOrder),
            )}) now and receive 5% off`}
            color={Colors['black-40']}
          />
        </Section>
        <Switch
          trackColor={{false: '#767577', true: theme?.colors.WARNING}}
          thumbColor={'#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitchPayFull}
          value={isFullPayment}
          style={{
            ...(Platform.OS === 'ios' && {
              transform: [{scaleX: 0.6}, {scaleY: 0.6}],
            }),
          }}
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
            label={currency(Number(selectedTable?.minOrder))}
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
              <Text label={currency(Number(selectedTable?.minOrder) * 0.05)} />
            </Section>
          </>
        )}
        <Gap height={8} />
        <Section isRow isBetween>
          <Section>
            <Text label="Service Fee" />
            <Text label="5%" color={Colors['black-40']} variant="small" />
          </Section>
          <Text label={currency(Number(selectedTable?.minOrder) * 0.05)} />
        </Section>
        {coupons?.length ? (
          <>
            <Gap height={8} />
            <Section isRow isBetween>
              <Section>
                <Text label="Coupon Applied" />
                <Text
                  label={currency(coupons[0].disc)}
                  color={Colors['black-40']}
                  variant="small"
                />
              </Section>
              <Text label={currency(Number(selectedTable?.minOrder) * 0.05)} />
            </Section>
          </>
        ) : null}
        <Gap height={20} />
        <Section isRow isBetween>
          <Text label="Total" fontWeight="bold" />
          <Text
            label={
              selectedTable?.minOrder
                ? isFullPayment
                  ? currency(
                      selectedTable.minOrder -
                        (coupons?.length ? coupons[0].disc : 0),
                    ).toString()
                  : currency(
                      selectedTable.minOrder +
                        selectedTable?.minOrder * 0.05 -
                        (coupons?.length ? coupons[0].disc : 0),
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
        padding="12px 12px"
        backgroundColor={theme?.colors.SECTION}
        rounded={8}>
        {coupons?.map((promo, key) => {
          return (
            <View className="flex-row mb-3" key={key}>
              <Image
                className="w-[48] h-[50]"
                source={images.discountPercent}
              />
              <View className="bg-black flex-1 justify-center px-3 rounded-tr-lg rounded-br-lg border-[0.5px] border-neutral-600 border-l-transparent flex-row items-center">
                <DefaultText
                  title={promo.title}
                  titleClassName="font-inter-semibold flex-1"
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => onRemoveCoupon(promo)}>
                  <Close size={22} color={colors.white} />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setShowPromo(true)}>
          <Section isRow isBetween>
            <Section isRow>
              <Coupon size={32} color={Colors['warning-500']} />
              <Gap width={8} />
              <Text
                fontWeight="bold"
                color={Colors['white-100']}
                label="Apply promo to get special discount"
              />
            </Section>
            <Image
              source={IcChevronRight}
              resizeMode="contain"
              className="w-[7.5] h-[13.5]"
            />
          </Section>
        </TouchableOpacity>
      </Section>

      <Gap height={20} />
      <Button
        type="primary"
        title="Pay"
        onPress={onPay}
        isLoading={isLoading}
      />
      <Gap height={20} />

      <ModalBookingTablePromotion
        show={showPromo}
        hide={() => setShowPromo(false)}
        onApplied={onCouponApplied}
        placeData={placeData}
        appliedCoupons={coupons?.map(el => el.couponId)}
      />
    </BottomSheetScrollView>
  );
};

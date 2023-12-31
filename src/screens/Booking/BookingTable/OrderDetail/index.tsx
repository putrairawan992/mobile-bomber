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
  TouchableSection,
} from '../../../../components/atoms';
import {
  CardPaymentInterface,
  TableInterface,
} from '../../../../interfaces/BookingInterface';
import {
  CouponInterface,
  PlaceInterface,
} from '../../../../interfaces/PlaceInterface';
import {Colors, Images} from '../../../../theme';
import useTheme from '../../../../theme/useTheme';
import {WIDTH, gradientMapping} from '../../../../utils/config';
import {dateFormatter} from '../../../../utils/dateFormatter';
import {
  IcAmericanExpress,
  IcChevronRight,
  IcMasterCard,
  IcVisaLogo,
} from '../../../../theme/Images';
import {images} from '../../../../utils/images';
import colors from '../../../../styles/colors';
import ModalBookingTablePromotion from '../../../../components/molecules/Modal/ModalBookingTablePromotion';
import {currency, detectCreditCardType} from '../../../../utils/function';
import {PillsGradient} from '../../../../components/molecules';

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
  paymentList?: CardPaymentInterface[];
  selectedPayment?: CardPaymentInterface | null;
  onCouponApplied: (coupon: CouponInterface) => void;
  onRemoveCoupon: (coupon: CouponInterface) => void;
  onAddPayment: () => void;
  setSelectedPayment: (value: CardPaymentInterface) => void;
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
  paymentList,
  selectedPayment,
  onCouponApplied,
  onRemoveCoupon,
  onAddPayment,
  setSelectedPayment,
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
                <PillsGradient
                  colors={
                    gradientMapping[
                      'textPrimary' as keyof typeof gradientMapping
                    ].color
                  }
                  onSelectOnMap={() => undefined}
                  title="Table Booking"
                />
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
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          padding: 12,
          backgroundColor: theme?.colors.SECTION,
          borderRadius: 8,
        }}
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
          <TouchableOpacity onPress={onAddPayment}>
            <AddCircle color={theme?.colors.ICON} size={24} />
          </TouchableOpacity>
        </Section>
        <Gap height={20} />
        {!paymentList?.length && (
          <Text
            color={Colors['gray-400']}
            label="There are no payment method, add one"
          />
        )}
        {paymentList?.map((item, idx) => {
          let imageUrl = IcMasterCard;
          switch (detectCreditCardType(item.cardNumber)) {
            case 'Visa':
              imageUrl = IcVisaLogo;
              break;
            case 'AmericanExpress':
              imageUrl = IcAmericanExpress;
          }
          return (
            <TouchableSection
              isRow
              key={`card_${idx}`}
              style={{marginBottom: 8}}
              onPress={() => setSelectedPayment(item)}>
              {selectedPayment?.id === item.id ? (
                <CircleDot size={16} color={Colors['info-500']} />
              ) : (
                <View
                  style={{
                    height: 12,
                    width: 12,
                    marginLeft: 2,
                    marginRight: 2,
                    borderRadius: 6,
                    borderWidth: 1.5,
                    borderColor: Colors['black-20'],
                  }}
                />
              )}
              <Gap width={6} />
              <Image
                source={imageUrl}
                style={{width: 40, height: 20}}
                resizeMode="contain"
              />
              <Gap width={6} />
              <Text
                fontWeight="medium"
                label={'- ' + item.cardNumber.split(' - ').reverse()[0]}
              />
            </TouchableSection>
          );
        })}
      </Section>
      {coupons?.length > 0 && <Gap height={20} />}
      {coupons?.length > 0 && (
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
        </Section>
      )}

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

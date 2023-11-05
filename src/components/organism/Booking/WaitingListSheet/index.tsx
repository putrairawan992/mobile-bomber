/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useState} from 'react';
import {
  TouchableOpacity,
  Text as RNText,
  LayoutAnimation,
  View,
} from 'react-native';
import useTheme from '../../../../theme/useTheme';
import {Button, Gap, Section, Text, TextInput} from '../../../atoms';
import {ArrowLeft} from 'iconsax-react-native';
import {Colors} from '../../../../theme';
import {WAITING_LIST_TEXT} from '../../../../utils/data';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useKeyboardVisible} from '../../../../hooks/useKeyboardVisible';
import {PayloadWaitingListInterface} from '../../../../interfaces/BookingInterface';
import {NightlifeService} from '../../../../service/NightlifeService';

interface WaitingListSheetProps {
  hasBackNavigation: boolean;
  onBackNavigation: () => void;
  step: number;
  onChangeStep: (step: number) => void;
  onFinish: () => void;
  data: PayloadWaitingListInterface;
}

export const WaitingListSheet = ({
  hasBackNavigation,
  onBackNavigation,
  step,
  onChangeStep,
  onFinish,
  data,
}: WaitingListSheetProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const theme = useTheme();
  const isKeyboardVisible = useKeyboardVisible();
  let EMAIL_REGX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Email address is required')
        .matches(EMAIL_REGX, 'Invalid email address'),
    }),
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: values => handleJoinWaitingList(values.email),
  });

  const handleJoinWaitingList = async (email: string) => {
    try {
      setIsLoading(true);
      const response = await NightlifeService.postWaitingList({
        payload: {...data, email_address: email, status: 'not_open_yet'},
      });
      setIsLoading(false);
      if (!response.error) {
        onNextStep(2);
      }
    } catch (error: any) {
      setIsLoading(false);
    }
  };

  const onNextStep = useCallback((value: number) => {
    LayoutAnimation.configureNext({
      duration: 500,
      update: {
        type: 'easeInEaseOut',
      },
    });
    onChangeStep(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BottomSheetScrollView
      contentContainerStyle={{
        backgroundColor: theme?.colors.SECTION,
        paddingHorizontal: 16,
        height: '100%',
        flex: 1,
        borderTopWidth: 1,
        borderTopColor: theme?.colors.SECTION,
      }}>
      {hasBackNavigation && step === 1 && (
        <TouchableOpacity
          style={{position: 'absolute', zIndex: 999, left: 16, top: 16}}
          onPress={() => {
            onBackNavigation();
            formik.setFieldError('email', undefined);
          }}>
          <ArrowLeft size={24} color={theme?.colors.ICON} />
        </TouchableOpacity>
      )}
      <Section isCenter>
        <Gap height={15} />
        <Text
          variant="base"
          fontWeight="bold"
          label={
            step === 1 ? 'Waiting list' : 'You are registered on waiting list'
          }
          color={theme?.colors.WARNING}
          textAlign="center"
        />
      </Section>
      <Gap height={30} />
      {step === 1 ? (
        <Section>
          <Text
            variant="base"
            fontWeight="regular"
            label="WHAT IS WAITING LIST"
            textAlign="center"
            color={Colors['black-10']}
          />
          <Gap height={20} />
          <Text
            label={WAITING_LIST_TEXT[0]}
            textAlign="center"
            color={Colors['black-10']}
          />
          <Gap height={16} />
          <RNText
            style={{
              fontFamily: 'Inter',
              fontWeight: '500',
              fontSize: 14,
              color: Colors['black-10'],
              textAlign: 'center',
            }}>
            {WAITING_LIST_TEXT[1]}
            <RNText
              style={{
                fontFamily: 'Inter-Italic',
                fontWeight: '500',
                fontSize: 14,
                color: Colors['black-10'],
                textAlign: 'center',
                fontStyle: 'italic',
              }}>
              {WAITING_LIST_TEXT[2]}
            </RNText>
          </RNText>
          <Gap height={16} />
          <Text
            label={WAITING_LIST_TEXT[3]}
            textAlign="center"
            color={Colors['black-10']}
          />
          <Section padding="20px 0px">
            <TextInput
              value={formik.values.email}
              errorText={formik.errors.email}
              onChangeText={value => {
                formik.setFieldValue('email', value);
                formik.setFieldError('email', undefined);
              }}
              placeholder="Input your email address"
            />
          </Section>
        </Section>
      ) : (
        <Text
          label="When the host cancel their booking then you we will
          inform you and you can back to bomber and book
          your table"
          textAlign="center"
          color={Colors['black-10']}
        />
      )}

      {!isKeyboardVisible && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            bottom: 32,
            alignSelf: 'center',
          }}>
          {step === 1 ? (
            <>
              <Button
                type="primary"
                onPress={() => formik.handleSubmit()}
                title="Continue Whitelist"
                isLoading={isLoading}
              />
              <Button
                type="textButton"
                onPress={() => {
                  onBackNavigation();
                  formik.setFieldError('email', undefined);
                }}
                title="Cancel Join"
              />
            </>
          ) : (
            <Button
              type="primary"
              onPress={onFinish}
              title="Gotcha, back to home"
            />
          )}
        </View>
      )}
    </BottomSheetScrollView>
  );
};

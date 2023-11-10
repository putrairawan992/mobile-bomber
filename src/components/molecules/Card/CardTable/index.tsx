/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {TableInterface} from '../../../../interfaces/BookingInterface';
import {
  Button,
  EntryAnimation,
  Gap,
  Section,
  Text,
  TouchableSection,
} from '../../../atoms';
import {Platform, UIManager, LayoutAnimation, View} from 'react-native';
import {currency} from '../../../../utils/function';
import {Colors} from '../../../../theme';
import {TablePriviliege} from '../../../../screens/Booking/BookingTable/TableList/TablePriviliege';

type Props = {
  data: TableInterface;
  index: number;
  handleExpand: (data: TableInterface) => void;
  isExpand: boolean;
  onSelect: () => void;
};

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const CardTable = ({data, index, handleExpand, isExpand, onSelect}: Props) => {
  const [isExpandState, setIsExpandState] = useState<boolean>(isExpand);

  useEffect(() => {
    onHandleExpand(isExpand);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpand]);

  const onHandleExpand = useCallback((isShow: boolean) => {
    LayoutAnimation.configureNext({
      duration: 500,
      update: {
        type: 'easeInEaseOut',
      },
    });
    setIsExpandState(isShow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <EntryAnimation index={index}>
      <TouchableSection
        padding="12px 8px"
        onPress={() => handleExpand(data)}
        backgroundColor="#303030"
        rounded={8}
        style={{marginBottom: 12}}>
        <>
          <Text fontWeight="semi-bold" label={data.text} />
          <Gap height={2} />
          <Section isRow isBetween>
            <Text
              variant="small"
              fontWeight="medium"
              label={`min deposit: ${currency(data.minOrder)}`}
              color={Colors['black-10']}
            />
            <Section isRow>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 10,
                  backgroundColor: !data.table_status
                    ? Colors['success-500']
                    : Colors['danger-400'],
                }}
              />
              <Gap width={2} />
              <Text
                variant="small"
                fontWeight="medium"
                label={!data.table_status ? 'Available' : 'Booked'}
                color={Colors['black-10']}
              />
            </Section>
          </Section>
          {isExpandState && (
            <>
              <Gap height={20} />
              <TablePriviliege tableData={data} />
              <Gap height={20} />
              <Button
                type="primary"
                title={!data.table_status ? 'Select' : 'Join waiting list'}
                onPress={onSelect}
              />
            </>
          )}
        </>
      </TouchableSection>
    </EntryAnimation>
  );
};

export default CardTable;

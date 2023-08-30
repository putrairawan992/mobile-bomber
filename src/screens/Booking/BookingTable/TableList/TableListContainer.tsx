import React from 'react';
import {View} from 'react-native';
import RadioButton from '.';
import {TableInterface} from '../../../../interfaces/BookingInterface';

interface RadioButtonProps {
  values: any;
  onPress: (value: TableInterface) => void;
  selected: TableInterface | null;
}

export default function TableListContainer({
  values,
  onPress,
  selected,
}: RadioButtonProps) {
  const _renderRadioButtons = () => {
    return (values || []).map((listItem: TableInterface, idx: number) => {
      const isSelected = !!selected && selected.tableId === listItem.tableId;
      return (
        <RadioButton
          key={idx}
          onRadioButtonPress={value => onPress(value)}
          isChecked={isSelected}
          data={listItem}
        />
      );
    });
  };
  return <View>{_renderRadioButtons()}</View>;
}

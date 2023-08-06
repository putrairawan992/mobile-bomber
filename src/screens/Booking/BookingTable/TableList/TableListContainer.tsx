import React from 'react';
import {View} from 'react-native';
import RadioButton from '.';
import {TableInterface} from '../../../../interfaces/BookingInterface';

interface RadioButtonProps {
  values: any;
  onPress: (value: number) => void;
  selected: TableInterface | null;
}

export default function TableListContainer({
  values,
  onPress,
  selected,
}: RadioButtonProps) {
  const _renderRadioButtons = () => {
    return (values || []).map((listItem: any, idx: number) => {
      const isSelected = !!selected && selected.text === listItem.text;
      return (
        <RadioButton
          key={idx}
          onRadioButtonPress={() => onPress(idx)}
          isChecked={isSelected}
          data={listItem}
        />
      );
    });
  };
  return <View>{_renderRadioButtons()}</View>;
}

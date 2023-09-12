/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {Section, Text} from '../../atoms';
import {Colors} from '../../../theme';

const DateTimeDisplay = ({value, type, isDanger}: any) => {
  return (
    <Text
      label={value}
      variant="base"
      fontWeight="medium"
      color={isDanger ? Colors['danger-400'] : '#AB5CFA'}
    />
  );
};

export default DateTimeDisplay;

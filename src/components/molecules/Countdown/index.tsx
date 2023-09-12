/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import DateTimeDisplay from './DateTimeDisplay';
import {useCountdown} from '../../../hooks/useCountdown';
import {Section, Text} from '../../atoms';
import {Colors} from '../../../theme';

const ShowCounter = ({days, hours, minutes, seconds}: any) => {
  return (
    <Section isRow>
      <DateTimeDisplay
        value={minutes}
        type={'Minutes'}
        isDanger={seconds <= 10}
      />
      <Text
        label=":"
        color={seconds <= 10 ? Colors['danger-400'] : '#AB5CFA'}
      />
      <DateTimeDisplay
        value={seconds}
        type={'Seconds'}
        isDanger={seconds <= 10}
      />
    </Section>
  );
};

interface CountDownInterface {
  targetDate: any;
  component: JSX.Element;
}

const CountdownTimer = ({targetDate, component}: CountDownInterface) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return component;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer;

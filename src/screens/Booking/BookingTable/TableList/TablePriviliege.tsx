/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Couple, Dollar, King, Sofa} from '../../../../assets/icons';
import {Gap, Section, Text} from '../../../../components/atoms';
import {
  ListItemInterface,
  TableInterface,
} from '../../../../interfaces/BookingInterface';
import {Colors} from '../../../../theme';
import {currency} from '../../../../utils/function';

interface TablePriviliegeProps {
  tableData: TableInterface | null;
}

export const TablePriviliege = ({tableData}: TablePriviliegeProps) => {
  const PRIVILIEGE_DATA: ListItemInterface[] = [
    {
      title: 'Private Table & Couch',
      subtitle: 'With security guard',
      icon: <Sofa color={Colors['white-70']} size={20} />,
    },
    {
      title: 'VIP Access',
      subtitle: 'Shorten 30 mins waiting time',
      icon: <King color={Colors['white-70']} size={20} />,
    },
    {
      title: 'VIP Restroom',
      subtitle: 'Private restroom with limited access',
      icon: <Couple color={Colors['white-70']} size={20} />,
    },
    {
      title: 'Minimum Order',
      subtitle: currency(Number(tableData?.minOrder)),
      icon: <Dollar color={Colors['white-70']} size={20} />,
    },
    {
      title: 'Free Access',
      subtitle: '15 people',
      icon: <King color={Colors['white-70']} size={20} />,
    },
  ];
  return (
    <Section>
      {PRIVILIEGE_DATA.map((item, idx) => (
        <Section key={idx} isRow style={{marginBottom: 12}}>
          {item.icon}
          <Gap width={8} />
          <Section>
            <Text
              fontWeight="semi-bold"
              label={item.title}
              color={Colors['white-70']}
            />
            <Gap height={4} />
            <Text
              variant="small"
              color={Colors['black-60']}
              label={item.subtitle}
            />
          </Section>
        </Section>
      ))}
    </Section>
  );
};

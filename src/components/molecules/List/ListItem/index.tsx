/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  EntryAnimation,
  Gap,
  Section,
  Text,
  TouchableSection,
} from '../../../atoms';

interface ListItemProps {
  title: string;
  icon?: React.ReactNode | null;
  onPress: () => void;
  index: number;
}

export const ListItem = ({title, icon, onPress, index}: ListItemProps) => {
  return (
    <EntryAnimation index={index}>
      <TouchableSection
        onPress={onPress}
        style={{
          borderBottomColor: '#3D3D3D',
          borderBottomWidth: 1,
          marginBottom: 16,
        }}>
        <Section isRow>
          {!!icon && (
            <>
              {icon}
              <Gap width={12} />
            </>
          )}
          <Text variant="base" fontWeight="semi-bold" label={title} />
        </Section>
        <Gap height={16} />
      </TouchableSection>
    </EntryAnimation>
  );
};

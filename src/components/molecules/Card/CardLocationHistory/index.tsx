/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  EntryAnimation,
  Gap,
  Section,
  Text,
  TouchableSection,
} from '../../../atoms';
import {Colors} from '../../../../theme';
import {PlaceDetailInterface} from '../../../../interfaces/UserInterface';
import useTheme from '../../../../theme/useTheme';
import {Clock} from 'iconsax-react-native';

interface CardLocationHistoryProps {
  item: PlaceDetailInterface;
  index: number;
  onSelect: (data: PlaceDetailInterface) => void;
}

export const CardLocationHistory = ({
  item,
  index,
  onSelect,
}: CardLocationHistoryProps) => {
  const theme = useTheme();
  return (
    <EntryAnimation index={index}>
      <TouchableSection
        onPress={() => onSelect(item)}
        backgroundColor={theme?.colors.SHEET_CONTAINER}
        isRow
        padding="8px 12px"
        rounded={8}
        style={{marginBottom: 12}}>
        <>
          <Clock color={Colors['white-100']} size={20} />
          <Gap width={12} />
          <Section style={{flex: 1}}>
            <Text
              label={item.name}
              fontWeight="bold"
              color={Colors['white-100']}
            />
            <Gap height={4} />
            <Text
              label={item.formatted_address}
              fontWeight="bold"
              color={'#D8D8D8'}
              variant="small"
            />
          </Section>
        </>
      </TouchableSection>
    </EntryAnimation>
  );
};

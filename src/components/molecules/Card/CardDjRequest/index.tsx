/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {DjRequestSongInterface} from '../../../../interfaces/SongInterface';
import {
  EntryAnimation,
  Gap,
  Section,
  Text,
  TouchableSection,
} from '../../../atoms';
import {Colors} from '../../../../theme';
import {currency} from '../../../../utils/function';
import useTheme from '../../../../theme/useTheme';
import {Image} from 'react-native';

type Props = {
  data: DjRequestSongInterface;
  index: number;
  onSelect: (data: DjRequestSongInterface) => void;
};

const CardDjRequest = ({data, index, onSelect}: Props) => {
  const theme = useTheme();
  return (
    <EntryAnimation index={index}>
      <TouchableSection
        onPress={() => onSelect(data)}
        padding="12px 12px"
        rounded={12}
        backgroundColor="#222"
        style={{
          marginBottom: 16,
          borderWidth: 1,
          borderColor: theme?.colors.PRIMARY,
        }}>
        <>
          <Section isRow isBetween>
            <Text
              color={Colors['white-100']}
              label={`${data.title} - ${data.artis}`}
            />
            <Text color={Colors['black-30']} label={currency(data.fee)} />
          </Section>
          <Gap height={4} />
          <Text
            color={Colors['black-30']}
            label="played around 1.30am"
            variant="small"
          />
          <Gap height={12} />
          <Text
            color={Colors['black-30']}
            label="Thanks to"
            variant="extra-small"
          />
          <Gap height={2} />
          <Section isRow>
            <Image
              source={{uri: data.requestedPhotoUrl}}
              style={{width: 20, height: 20, borderRadius: 20}}
            />
            <Gap width={4} />
            <Text
              color={Colors['warning-500']}
              label={data.requestedName}
              variant="extra-small"
            />
          </Section>
        </>
      </TouchableSection>
    </EntryAnimation>
  );
};

export default CardDjRequest;

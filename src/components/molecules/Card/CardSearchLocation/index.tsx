/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';

import ParsedText from 'react-native-parsed-text';

import {Section, Spacer, Text} from '../../../atoms';
import {Colors} from '../../../../theme';
import {WIDTH} from '../../../../utils/config';
import {GooglePlaceData} from 'react-native-google-places-autocomplete';

interface CardSearchLocationProps {
  item: GooglePlaceData;
  text: string;
}

export const CardSearchLocation = ({
  item,
  text = '',
}: CardSearchLocationProps) => {
  var re = new RegExp(text, 'gi');
  return (
    <Section
      backgroundColor="#171717"
      isRow
      style={{zIndex: 999, flex: 1, width: WIDTH * 0.7}}>
      <Section>
        <ParsedText
          style={{
            fontFamily: 'Inter',
            fontSize: 14,
            fontWeight: '600',
            color: '#fff',
          }}
          parse={[
            {
              pattern: re,
              style: {
                fontFamily: 'Inter',
                fontSize: 14,
                fontWeight: '600',
                color: Colors['warning-500'],
              },
              onPress: () => {
                return;
              },
            },
          ]}
          childrenProps={{allowFontScaling: true}}>
          {item.structured_formatting.main_text}
        </ParsedText>
        <Spacer xs />
        <Text variant="small" color="#B3B4B5" label={item.description} />
      </Section>
    </Section>
  );
};

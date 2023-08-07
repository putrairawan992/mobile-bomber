/* eslint-disable-line @typescript-eslint/no-shadow */
import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Section} from '../../../../components/atoms';
import {ThemeInterface} from '../../../../theme/ThemeProvider';
import useTheme from '../../../../theme/useTheme';
import useThemedStyles from '../../../../theme/useThemedStyles';
import {WIDTH} from '../../../../utils/config';
import Text from '../../../../components/atoms/Text/Text';

interface RadioButtonProps {
  isChecked: boolean;
  data: any;
  onRadioButtonPress: any;
}

export default function RadioButton({
  isChecked,
  data,
  onRadioButtonPress,
}: RadioButtonProps) {
  const theme = useTheme();
  const s = useThemedStyles(styles);
  const _renderCheckedView = () => {
    return isChecked ? <View style={[s.radioButtonIconInnerIcon]} /> : null;
  };

  return (
    <TouchableOpacity style={s.mainContainer} onPress={onRadioButtonPress}>
      <Section isRow style={{width: WIDTH - 130}}>
        <Section isRow>
          <View style={[s.radioButtonIcon]}>{_renderCheckedView()}</View>
          <View style={[s.radioButtonTextContainer]}>
            <Text label={data.text} />
          </View>
        </Section>
        <Text label={`NT ${data.minOrder}`} color={theme?.colors.PRIMARY} />
      </Section>
    </TouchableOpacity>
  );
}

// eslint-disable-next-line @typescript-eslint/no-shadow
const styles = (theme: ThemeInterface) =>
  StyleSheet.create({
    mainContainer: {
      height: 40,
      marginLeft: 10,
      marginRight: 10,
      //   justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
    },
    radioButtonIcon: {
      backgroundColor: 'gray',
      height: 19,
      width: 19,
      borderRadius: 30 / 2,
      marginRight: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    radioButtonIconInnerIcon: {
      height: 19,
      width: 19,
      backgroundColor: theme.colors.PRIMARY,
      borderRadius: 25 / 2,
      borderWidth: 1,
      borderColor: 'white',
    },
    radioButtonTextContainer: {
      flex: 5,
      height: 50,
      justifyContent: 'center',
      paddingLeft: 10,
    },
  });

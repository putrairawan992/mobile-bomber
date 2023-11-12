import React, {useState} from 'react';
import {TouchableHighlight, View} from 'react-native';
import {
  Button,
  DefaultText,
  Layout,
  Section,
  Spacer,
} from '../../components/atoms';
import {Header} from '../../components/molecules';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParams} from '../../navigation/MainScreenStack';
import CardBookingOrderNotTable from '../../components/molecules/Card/CardBookingOrderNotTable';
import {ScrollView} from 'react-native';

type Props = NativeStackScreenProps<MainStackParams, 'ScanOnTable', 'MyStack'>;

export default function ScanOnTable({navigation}: Props) {
  const [activeTheme, setActiveTheme] = useState<number>(0);
  return (
    <Layout
      contentContainerStyle={{flex: 1, backgroundColor: '#1E1E1E'}}
      isScrollable={false}>
      <Header
        transparent
        title="X33 - Omni Taiwan"
        centerIsTrue={false}
        titleStyle={{color: '#fff', fontSize: 14}}
        onBackPress={() => navigation.navigate('Nightlife', {isOrder: false})}
        hasBackBtn
      />
      <ScrollView style={{padding: 15}}>
        <View className="bg-[#2D2D2D] rounded-xl p-4">
          <DefaultText
            title="There are some order that still on going"
            titleClassName="text-center font-inter-medium text-white"
          />
          {[1, 2, 3, 4].map((list: any, i: number) => {
            return (
              <CardBookingOrderNotTable
                setActiveTheme={setActiveTheme}
                activeTheme={activeTheme}
                index={i}
              />
            );
          })}
          <Spacer height={10} />
          <TouchableHighlight
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              width: 350,
              borderWidth: 1,
              borderStyle: 'dashed',
              borderColor: '#484848',
              padding: 12,
            }}>
            <DefaultText
              title="NEW ORDER"
              titleClassName="text-center font-inter-bold text-white"
            />
          </TouchableHighlight>
        </View>
      </ScrollView>
      <Spacer height={10} />
      <Section>
        <Button
          noRound={true}
          type="primary"
          style={{borderWidth: 0}}
          title="Use This Order"
          onPress={() => navigation.navigate('WineryOrder', {isNotTable: true})}
        />
      </Section>
    </Layout>
  );
}

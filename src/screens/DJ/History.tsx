/* eslint-disable react-native/no-inline-styles */
import {ScrollView} from 'react-native';
import React from 'react';
import {Gap, Layout, Section, Text} from '../../components/atoms';
import styles from '../Styles';
import {CardDjRequestHistory, Header} from '../../components/molecules';
import {HEIGHT} from '../../utils/config';
import {DJ_REQUEST_DATA} from '../../utils/data';

const History = () => {
  return (
    <Layout contentContainerStyle={styles.container} backgroundColor="#000">
      <Header
        hasBackBtn
        transparent
        title="History"
        titleStyle={{color: '#fff'}}
      />
      <Gap height={30} />
      <Text
        variant="base"
        fontWeight="bold"
        label="Today"
        style={{marginLeft: 42}}
      />
      <Gap height={12} />
      <Section padding="0px 28px">
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{height: HEIGHT * 0.65}}>
          {DJ_REQUEST_DATA.map((item, index) => (
            <CardDjRequestHistory
              data={item}
              index={index}
              key={`history_${index}`}
              isShowBorder={DJ_REQUEST_DATA.length === index + 1 ? false : true}
            />
          ))}
        </ScrollView>
      </Section>
    </Layout>
  );
};

export default History;

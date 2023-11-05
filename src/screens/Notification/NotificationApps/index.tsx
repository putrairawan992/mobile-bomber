import {ScrollView} from 'react-native';
import React from 'react';

// import CardNotificationApps from '../../../components/Card/CardNotificationApps';
// import DefaultText from '../../../components/DefaultText';
import {Gap, Text} from '../../../components/atoms';
import styles from '../Styles';
import {
  TODAY_APPS_NOTIFICATION,
  YESTERDAY_APPS_NOTIFICATION,
} from '../../../utils/data';
import CardNotificationApps from '../../../components/molecules/Notification/CardNotificationApps';

export default function NotificationApps() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.contentContainer}>
      <Gap height={20} />
      <Text label="Today" variant="base" fontWeight="bold" />
      <Gap height={12} />
      {TODAY_APPS_NOTIFICATION.map((item, index) => (
        <CardNotificationApps
          data={item}
          index={index}
          key={`today_${index}`}
          isShowBorder={
            TODAY_APPS_NOTIFICATION.length === index + 1 ? false : true
          }
        />
      ))}
      <Gap height={20} />
      <Text label="Yesterday" variant="base" fontWeight="bold" />
      <Gap height={12} />
      {YESTERDAY_APPS_NOTIFICATION.map((item, index) => (
        <CardNotificationApps
          data={item}
          index={index}
          key={`yesterday_${index}`}
          isShowBorder={
            YESTERDAY_APPS_NOTIFICATION.length === index + 1 ? false : true
          }
        />
      ))}
    </ScrollView>
  );
}

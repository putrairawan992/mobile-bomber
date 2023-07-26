import * as React from 'react';
import {Content} from '../components/atoms';

import Container from '../components/atoms/Container';
import {Header} from '../components/molecules';
import useTheme from '../theme/useTheme';
import styles from './Styles';

// type Props = NativeStackScreenProps<MainStackParams, 'Home', 'MyStack'>;

function NightlifeScreen() {
  const theme = useTheme();
  return (
    <Container>
      <Content
        hasHeader
        contentContainerStyle={{
          ...styles.container,
          backgroundColor: theme?.colors.BACKGROUND1,
        }}>
        <Header
          transparent
          hasLocation
          hasNotification
          hasLogo
          onLocationPress={() => console.log('joss')}
        />
      </Content>
    </Container>
  );
}

export default NightlifeScreen;

/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';

import { MMKVLoader } from 'react-native-mmkv-storage';
// import { MMKVLoader } from 'react-native-mmkv-storage';
import { NavigationContainer } from '@react-navigation/native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import useTheme from '../theme/useTheme';
import AuthScreenStack from './AuthScreenStack';
import { ReduxState } from '../store';
import { loginSuccess } from '../store/user/userActions';
import MainScreenStack from './MainScreenStack';

const MMKV = new MMKVLoader().initialize(); // Returns an MMKV Instance

function Routes() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    async function getLoginStatus() {
      const userAuth = await MMKV.getStringAsync('userAuth');
      if (userAuth) {
        console.log('login otomatis');
        dispatch(loginSuccess(JSON.parse(userAuth)));
      }
    }
    getLoginStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { isLogin, user } = useSelector(
    (state: ReduxState) => state.user,
    shallowEqual,
  );

  const theme = useTheme();
  console.log('is login', isLogin, user);
  return (
    <NavigationContainer>
      {isLogin ? <MainScreenStack /> : <AuthScreenStack />}
    </NavigationContainer>
  );
}

export default Routes;

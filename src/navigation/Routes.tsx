import * as React from 'react';

import {MMKVLoader} from 'react-native-mmkv-storage';
import {NavigationContainer} from '@react-navigation/native';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import AuthScreenStack from './AuthScreenStack';
import {ReduxState} from '../store';
import {loginSuccess} from '../store/user/userActions';
import MainScreenStack from './MainScreenStack';

const MMKV = new MMKVLoader().initialize(); // Returns an MMKV Instance

function Routes() {
  const dispatch = useDispatch();

  const {isLogin} = useSelector(
    (state: ReduxState) => state.user,
    shallowEqual,
  );

  React.useEffect(() => {
    async function getLoginStatus() {
      const userAuth = await MMKV.getStringAsync('userAuth');
      if (userAuth) {
        dispatch(loginSuccess(JSON.parse(userAuth)));
      }
    }
    getLoginStatus();
  }, [dispatch]);

  return (
    <NavigationContainer>
      {!isLogin ? <MainScreenStack /> : <AuthScreenStack />}
    </NavigationContainer>
  );
}

export default Routes;

import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {shallowEqual, useSelector} from 'react-redux';
import AuthScreenStack from './AuthScreenStack';
import {ReduxState} from '../store';
import MainScreenStack from './MainScreenStack';

function Routes() {
  const {isLogin} = useSelector(
    (state: ReduxState) => state.user,
    shallowEqual,
  );

  // React.useEffect(() => {
  //   async function getLoginStatus() {
  //     const userAuth = await MMKV.getStringAsync('userAuth');
  //     if (userAuth) {
  //       dispatch(loginSuccess(JSON.parse(userAuth)));
  //     }
  //   }
  //   getLoginStatus();
  // }, [dispatch]);

  return (
    <NavigationContainer>
      {isLogin ? <MainScreenStack /> : <AuthScreenStack />}
    </NavigationContainer>
  );
}

export default Routes;

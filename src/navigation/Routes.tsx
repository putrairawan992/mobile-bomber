import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import AuthScreenStack from './AuthScreenStack';
import {ReduxState} from '../store';
import MainScreenStack from './MainScreenStack';
import {navigationRef} from './RootNavigation';
import {getStorage} from '../service/mmkvStorage';
import {loginSuccess} from '../store/user/userActions';

function Routes() {
  const {isLogin} = useSelector(
    (state: ReduxState) => state.user,
    shallowEqual,
  );

  const dispatch = useDispatch();
  const checkSession = async () => {
    const authData = await getStorage('userAuth');
    if (authData) {
      dispatch(loginSuccess(JSON.parse(authData)));
    }
  };

  React.useEffect(() => {
    checkSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      {isLogin ? <MainScreenStack /> : <AuthScreenStack />}
    </NavigationContainer>
  );
}

export default Routes;

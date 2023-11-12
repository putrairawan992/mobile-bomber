/* eslint-disable @typescript-eslint/no-shadow */
import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import AuthScreenStack from './AuthScreenStack';
import {ReduxState} from '../store';
import MainScreenStack from './MainScreenStack';
import {navigationRef} from './RootNavigation';
import {getStorage} from '../service/mmkvStorage';
import {loginSuccess, setUserType} from '../store/user/userActions';
import DjScreenStack from './DJScreenStack';

function Routes() {
  const {isLogin, userType} = useSelector(
    (state: ReduxState) => state.user,
    shallowEqual,
  );

  const dispatch = useDispatch();
  const checkSession = async () => {
    const authData = await getStorage('userAuth');
    const typeOfUser = await getStorage('userType');
    if (authData) {
      dispatch(loginSuccess(JSON.parse(authData)));
      dispatch(setUserType(typeOfUser ?? ''));
    }
  };

  React.useEffect(() => {
    checkSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const linking = {
    // Prefixes accepted by the navigation container, should match the added schemes
    prefixes: ['bomber://'],
    // Route config to map uri paths to screens
    config: {
      // Initial route name to be added to the stack before any further navigation,
      // should match one of the available screens
      initialRouteName: 'Main' as const,
      screens: {
        // myapp://home -> HomeScreen
        Main: 'main',
        // myapp://details/1 -> DetailsScreen with param id: 1
        Event: 'event',
        Notification: 'notification',
      },
    },
  };

  return (
    <NavigationContainer ref={navigationRef} linking={linking as any}>
      {isLogin && userType === 'regular' ? (
        <MainScreenStack />
      ) : isLogin && userType === 'dj' ? (
        <DjScreenStack />
      ) : (
        <AuthScreenStack />
      )}
    </NavigationContainer>
  );
}

export default Routes;

/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { BackHandler, ToastAndroid } from 'react-native';

import * as types from '../actions/types';

const backHandler = () => (dispatch, getState) => {
  BackHandler.addEventListener('hardwareBackPress', () => {
    try {
      const { nav, app } = getState();
      const { routes } = nav;
      const length = routes.length || 0;
      if (length === 1) {
        const { lastBack } = app;
        const currentTime = new Date().getTime();
        if (!(!!lastBack && lastBack + 10 * 1000 > currentTime)) {
          dispatch({
            type: types.SET_LAST_BACK_TIME,
            payload: {
              lastBack: currentTime,
            },
          });
          ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
        } else {
          return false;
        }
      }
      return true;
    } catch (error) {}
  });
};

export default backHandler;

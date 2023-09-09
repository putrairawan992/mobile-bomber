import {
  LOGIN_SUCCESS,
  LOG_OUT,
  SET_USER_TYPE,
  UPDATE_USER_LOCATION,
} from './userTypes';

import {
  UserInterface,
  UserLocationInterface,
} from '../../interfaces/UserInterface';

export const loginSuccess = (payload: UserInterface) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const handleLogOut = () => ({
  type: LOG_OUT,
});

export const updateUserLocation = (payload: UserLocationInterface) => ({
  type: UPDATE_USER_LOCATION,
  payload,
});

export const setUserType = (payload: string) => ({
  type: SET_USER_TYPE,
  payload,
});

import {
  UserInterface,
  UserLocationInterface,
} from '../../interfaces/UserInterface';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOG_OUT = 'LOG_OUT';
export const UPDATE_USER_LOCATION = 'UPDATE_USER_LOCATION';
export const SET_USER_TYPE = 'SET_USER_TYPE';
export const SET_FCM_TOKEN = 'SET_FCM_TOKEN';

export interface LoginSuccessI {
  type: typeof LOGIN_SUCCESS;
  payload: UserInterface;
}

export interface LogOutI {
  type: typeof LOG_OUT;
}

export interface UpdateUserLocationI {
  type: typeof UPDATE_USER_LOCATION;
  payload: UserLocationInterface;
}

export interface SetUserTypeI {
  type: typeof SET_USER_TYPE;
  payload: string;
}

export interface SetFcmTokenI {
  type: typeof SET_FCM_TOKEN;
  payload: string;
}

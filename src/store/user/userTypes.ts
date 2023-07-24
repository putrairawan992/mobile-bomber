import {UserInterface} from '../../interfaces/UserInterface';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOG_OUT = 'LOG_OUT';

export interface LoginSuccessI {
  type: typeof LOGIN_SUCCESS;
  payload: UserInterface;
}

export interface LogOutI {
  type: typeof LOG_OUT;
}

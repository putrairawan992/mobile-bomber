/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {LOGIN_SUCCESS, LOG_OUT} from './userTypes';

import {APIResponse} from '../../interfaces/BaseApiResponse';
// import Conn from '../../service/Conn';
import {
  LoginPayloadInterface,
  UserInterface,
} from '../../interfaces/UserInterface';

export const loginSuccess = (payload: UserInterface) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const handleLogOut = () => ({
  type: LOG_OUT,
});

import {APIResponse} from '../interfaces/BaseApiResponse';
import {
  LoginPayloadInterface,
  SignUpPayloadInterface,
} from '../interfaces/UserInterface';
import ax from './axios';

const URL = 'global_api';

export const AuthService = {
  postRegister: async (
    payload: SignUpPayloadInterface,
  ): Promise<APIResponse<unknown>> => {
    const response = await ax.post(`${URL}/customer_sign_up/`, payload);
    return response.data;
  },
  postLogin: async (
    payload: LoginPayloadInterface,
  ): Promise<APIResponse<unknown>> => {
    const response = await ax.post(`${URL}/customer_sign_in/`, payload);
    return response.data;
  },
};

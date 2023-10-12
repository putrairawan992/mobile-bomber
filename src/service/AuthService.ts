/* eslint-disable @typescript-eslint/no-unused-vars */
import Config from 'react-native-config';
import {APIResponse} from '../interfaces/BaseApiResponse';
import {
  LoginPayloadInterface,
  SignUpPayloadInterface,
  UserInterface,
} from '../interfaces/UserInterface';
import {AppDispatch} from '../store';
import {setProfile} from '../store/profile';
import ax from './axios';
import {getStorage} from './mmkvStorage';

const URL = 'global_api';

export const AuthService = {
  postRegister: async (
    payload: SignUpPayloadInterface,
  ): Promise<APIResponse<unknown>> => {
    const response = await ax.post(
      `${Config.API_ENDPOINT}/global_api/customer_sign_up`,
      payload,
    );
    return response.data;
  },
  postLogin: async (
    payload: LoginPayloadInterface,
  ): Promise<APIResponse<UserInterface>> => {
    const response = await ax.post(
      `${Config.API_ENDPOINT}/global_api/customer_sign_in`,
      payload,
    );
    return response.data;
  },
  checkRegisteredEmail: async ({
    email,
  }: {
    email: string;
  }): Promise<APIResponse<UserInterface[]>> => {
    const response = await ax.get(`${URL}/get_profile_by_email/${email}`);
    return response.data;
  },
  putFcmToken: async ({
    user_id,
    token,
  }: {
    user_id: string;
    token: string;
  }): Promise<APIResponse<UserInterface[]>> => {
    const response = await ax.put(`${URL}/update_fcm_token`, {
      user_id,
      token,
    });
    return response.data;
  },
};

export const getUserProfile = () => async (dispatch: AppDispatch) => {
  const user: any = await getStorage('userAuth');
  const userId = JSON.parse(user).id;
  ax.get(`/profile/get_user_profile/${userId}`)
    .then(res => dispatch(setProfile(res.data.data)))
    .catch(err => console.log('err get user profile', err.response?.data));
};

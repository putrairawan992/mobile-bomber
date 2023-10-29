/* eslint-disable @typescript-eslint/no-unused-vars */
import Config from 'react-native-config';
import {APIResponse} from '../interfaces/BaseApiResponse';
import ax from './axios';
import {PaymentListInterface} from '../interfaces/Interface';
import axios from 'axios';

const URL = 'profile';

export const ProfileService = {
  deleteCustomerPaymentList: async ({
    payload,
  }: {
    payload: {id: string; customer_id: string};
  }): Promise<APIResponse<unknown>> => {
    const response = await axios.delete(
      `${Config.API_ENDPOINT}/${URL}/remove_customer_payment_list`,
      {data: payload},
    );
    return response.data;
  },
  defaultCustomerPaymentList: async ({
    payload,
  }: {
    payload: {id: string; customer_id: string};
  }): Promise<APIResponse<unknown>> => {
    const response = await ax.put(
      `${Config.API_ENDPOINT}/${URL}/modify_default_customer_payment_list`,
      payload,
    );
    return response.data;
  },
  addCustomerPaymentList: async ({
    payload,
  }: {
    payload: PaymentListInterface;
  }): Promise<APIResponse<unknown>> => {
    const response = await ax.post(
      `${Config.API_ENDPOINT}/${URL}/post_add_customer_payment_list`,
      payload,
    );
    return response.data;
  },
  getCustomerPaymentList: async ({
    id,
  }: {
    id: string;
  }): Promise<APIResponse<any[]>> => {
    const response = await ax.get(
      `${Config.API_ENDPOINT}/${URL}/get_add_customer_payment_list/${id}`,
    );
    return response.data;
  },
  updateProflie: async ({
    payload,
    data,
  }: {
    payload: any;
    data?: any;
  }): Promise<APIResponse<unknown>> => {
    const response = await axios.put(
      `${Config.API_ENDPOINT}/${URL}/modify_user_profile?customer_id=${payload.customer_id}&
      username=${payload.username}&
      photo_url=${payload.photo_url}&
      bio=${payload.bio}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          type: 'formData',
        },
        transformRequest: vData => {
          return vData; // thats enough
        },
      },
    );
    return response.data;
  },
};

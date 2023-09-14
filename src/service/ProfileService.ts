/* eslint-disable @typescript-eslint/no-unused-vars */
import Config from 'react-native-config';
import {APIResponse} from '../interfaces/BaseApiResponse';
import ax from './axios';
import {PaymentListInterface} from '../interfaces/Interface';

const URL = 'profile';

export const ProfileService = {
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
};

/* eslint-disable @typescript-eslint/no-unsafe-return */
import {APIResponse} from '../interfaces/BaseApiResponse';
import {CountryInterface} from '../interfaces/CountryInterface';
import ax from './axios';

const URL = 'name';

export const CountryService = {
  getCountryList: async (
    name: string,
  ): Promise<APIResponse<Array<CountryInterface>>> => {
    const response = await ax.get(`${URL}/${name}`);
    return response.data;
  },
};

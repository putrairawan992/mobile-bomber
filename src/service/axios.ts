/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from 'axios';

const ax = axios.create({
  baseURL: 'https://restcountries.com/v3.1/',
});

ax.interceptors.request.use(
  async (config: any) => {
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error: any) => {
    Promise.reject(error);
  },
);

export default ax;

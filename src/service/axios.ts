import axios from 'axios';
import config from '../config';

const ax = axios.create({
  baseURL: config.apiEndpoint,
});

ax.interceptors.request.use(
  async (configuration: any) => {
    configuration.headers['Content-Type'] = 'application/json';
    configuration.headers['x-api-key'] = config.apiKey;
    return configuration;
  },
  (error: any) => {
    Promise.reject(error);
  },
);

export default ax;

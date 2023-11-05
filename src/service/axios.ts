import axios from 'axios';
import Config from 'react-native-config';

const ax = axios.create({
  baseURL: Config.API_ENDPOINT,
});

ax.interceptors.request.use(
  async (configuration: any) => {
    configuration.headers['Content-Type'] = 'application/json';
    // configuration.headers['x-api-key'] = Config.API_KEY;
    return configuration;
  },
  (error: any) => {
    Promise.reject(error);
  },
);

export default ax;

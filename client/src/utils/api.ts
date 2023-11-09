import axios, { AxiosResponse } from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.BASE_URL,
});

export const nonAuthApi = axios.create({
  baseURL: import.meta.env.BASE_URL,
});

api.interceptors.request.use(config => {
  const tokens = JSON.parse(localStorage.getItem('tokens') || '{}');
  if (Object.keys(tokens).length === 0) return config;
  config.headers['Authorization'] = `bearer ${tokens.accessToken}`;
  return config;
});

api.interceptors.response.use(
  resonse => resonse,
  async error => {
    console.log(error);
    if (error.response.status === 401) {
      const authData = JSON.parse(localStorage.getItem('token') || '{}');
      const payload = {
        accessToken: authData.accessToken,
        refreshToken: authData.refreshToken,
      };

      const response = await api.post('/sessions', payload);
      localStorage.setItem('tokens', JSON.stringify(response.data.data));
      error.config.headers['Authorization'] = `bearer ${response.data.data.accessToken}`;
      return axios(error.config);
    } else {
      return Promise.reject(error);
    }
  },
);

export type { AxiosResponse };

import axios, { AxiosResponse, AxiosError } from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  config => {
    const tokens = JSON.parse(localStorage.getItem('tokens') || '{}');
    console.log(tokens);
    if (Object.keys(tokens).length === 0) return config;
    config.headers['Authorization'] = `Bearer ${tokens.accessToken}`;
    return config;
  },
  error => Promise.reject(error),
);

api.interceptors.response.use(
  resonse => resonse,
  async error => {
    const originalConfig = error.config;
    if (originalConfig.url !== '/sessions/logout') {
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const authData = JSON.parse(localStorage.getItem('token') || '{}');
          const payload = {
            accessToken: authData.accessToken,
            refreshToken: authData.refreshToken,
          };
          const response = await api.post('/sessions', payload);
          localStorage.setItem('tokens', JSON.stringify(response.data.data));
          originalConfig.headers['Authorization'] = `bearer ${response.data.data.accessToken}`;
          return api(originalConfig);
        } catch (error) {
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  },
);

export type { AxiosResponse, AxiosError };

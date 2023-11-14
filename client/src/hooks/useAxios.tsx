import { useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { useToastContext } from '@/contexts/toast';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const useAxios = () => {
  const { showToast } = useToastContext();

  useEffect(() => {
    const tokens = JSON.parse(localStorage.getItem('tokens') || '{}');
    const requestIntercept = api.interceptors.request.use(
      config => {
        if (Object.keys(tokens).length === 0) return config;
        console.log(config);
        if (!config.headers['Authorization'] || !config.url?.includes('/sessions')) {
          config.headers['Authorization'] = `Bearer ${tokens?.accessToken}`;
        }
        return config;
      },
      error => Promise.reject(error),
    );

    const responseIntercept = api.interceptors.response.use(
      response => response,
      async error => {
        console.log(error.config);
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?._retry) {
          prevRequest._retry = true;
          try {
            const response = await api.post('/sessions/refresh', {
              refreshToken: tokens?.refreshToken,
            });
            localStorage.setItem('tokens', JSON.stringify(response.data));
            console.log(response.data.accessToken);
            prevRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
            return api(prevRequest);
          } catch (error) {
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, []);

  const apiErrorHandler = (e: unknown) => {
    const error = e as AxiosError<{ errors: { msg: string }[] } | { message: string }>;
    if (error.response?.data) {
      if ('errors' in error.response.data) {
        showToast(error.response.data.errors.map((e: { msg: string }) => ({ message: e.msg })));
      } else {
        showToast([{ message: error.response.data.message }]);
      }
    } else {
      showToast([{ message: 'Something went wrong' }]);
    }
  };

  return { api, apiErrorHandler };
};

export default useAxios;

export type { AxiosResponse, AxiosError };

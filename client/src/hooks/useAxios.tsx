import { useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { useToastContext } from '@/contexts/toast';
import { useAuthContext } from '@/contexts/auth';
import { useNavigate } from 'react-router-dom';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const useAxios = () => {
  const { showToast } = useToastContext();
  const { sessionCleanup } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const requestIntercept = api.interceptors.request.use(
      config => {
        const tokens = JSON.parse(localStorage.getItem('tokens') || '{}');
        if (Object.keys(tokens).length === 0) return config;
        if (!config.url?.includes('/sessions')) {
          config.headers['Authorization'] = `Bearer ${tokens?.accessToken}`;
        }
        return config;
      },
      error => Promise.reject(error),
    );

    const responseIntercept = api.interceptors.response.use(
      response => response,
      async error => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          try {
            const tokens = JSON.parse(localStorage.getItem('tokens') || '{}');
            const response = await api.post('/sessions/refresh', {
              refreshToken: tokens?.refreshToken,
            });
            prevRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
            localStorage.setItem('tokens', JSON.stringify(response.data));
            return api(prevRequest);
          } catch (error) {
            // If user logged out from all devices, redirect to login page
            if ((error as AxiosError<{ message: string }>).response?.data.message === 'Invalid session') {
              sessionCleanup();
              navigate('/login');
            }
          }
        }
        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [navigate, sessionCleanup]);

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

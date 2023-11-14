import { AxiosRequestConfig } from 'axios';
import { useState, useEffect } from 'react';
import useAxios from './useAxios';

type Callback<T> = (() => void) | ((args: T) => void) | React.Dispatch<React.SetStateAction<T>>;

interface FetchProps<T> {
  url: string;
  options?: AxiosRequestConfig<T> | undefined;
  callback?: Callback<T>;
}

function useFetch<T>({ url, options }: FetchProps<T>): { data: T; loading: boolean; error: string | null } {
  const { api } = useAxios();
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api(url, options);
        setData(data);
      } catch (error) {
        setError((error as { message: string }).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [options, url, api]);

  return { data: data as T, loading, error };
}

export default useFetch;

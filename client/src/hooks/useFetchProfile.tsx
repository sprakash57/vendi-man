import { User, useAuthContext } from '@/contexts/auth';
import useAxios, { AxiosResponse } from '@/hooks/useAxios';

const useFetchProfile = () => {
  const { setUser } = useAuthContext();
  const { api, apiErrorHandler } = useAxios();
  const fetchProfile = async () => {
    try {
      const { data: profileData }: AxiosResponse<{ data: User }> = await api.get('/users');
      setUser(profileData.data);
    } catch (error) {
      apiErrorHandler(error);
    }
  };
  return { fetchProfile };
};

export default useFetchProfile;

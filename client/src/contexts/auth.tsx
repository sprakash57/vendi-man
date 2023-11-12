import { useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToastContext } from './toast';
import useAxios, { AxiosResponse } from '@/hooks/useAxios';

interface User {
  _id: string;
  username: string;
  role: string;
  deposit: number;
}

interface LoginPayload {
  username: string;
  password: string;
}

interface LoginResponse {
  status: string;
  message: string;
  data: {
    message: string;
    accessToken: string;
    refreshToken: string;
  };
}

type AuthContextType = {
  user: User | null;
  login: (payload: LoginPayload) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
} as AuthContextType);

const useAuthContext = () => useContext(AuthContext);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { api, apiErrorHandler } = useAxios();
  const { showToast } = useToastContext();
  const [user, setUser] = useState<User | null>(() => {
    const tokens = localStorage.getItem('tokens');
    if (tokens) {
      const parsedTokens = JSON.parse(tokens);
      return jwtDecode(parsedTokens.accessToken);
    }
    return null;
  });

  const login = async (payload: LoginPayload) => {
    try {
      const { data: responseData }: AxiosResponse<LoginResponse> = await api.post('/sessions', payload);
      localStorage.setItem('tokens', JSON.stringify(responseData.data));
      setUser(jwtDecode(responseData.data.accessToken));
      navigate('/');
      showToast([{ message: responseData.message || 'Success', mode: 'success' }]);
    } catch (e) {
      apiErrorHandler(e);
    }
  };

  const logout = async () => {
    try {
      const { data: responseData }: AxiosResponse<LoginResponse> = await api.put('/sessions/logout');
      showToast([{ message: responseData.message || 'Success', mode: 'success' }]);
    } catch (e) {
      apiErrorHandler(e);
    } finally {
      localStorage.removeItem('tokens');
      setUser(null);
      navigate('/login');
    }
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export { useAuthContext, AuthContextProvider };

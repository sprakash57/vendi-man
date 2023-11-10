import { api, AxiosError, AxiosResponse } from '@/utils/api';
import { useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToastContext } from './toast';

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
    } catch (e: unknown) {
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
    }
  };

  const logout = async () => {
    await api.put('/sessions/logout');
    localStorage.removeItem('tokens');
    setUser(null);
    navigate('/');
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export { useAuthContext, AuthContextProvider };

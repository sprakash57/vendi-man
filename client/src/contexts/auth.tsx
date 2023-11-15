import { useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToastContext } from './toast';
import useAxios, { AxiosResponse } from '@/hooks/useAxios';

export interface User {
  _id: string;
  username: string;
  role: string;
  deposit: number;
  accessToken: string;
  createdAt: string;
  updatedAt: string;
  multiSessionAlert: string;
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
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (payload: LoginPayload) => void;
  logout: () => void;
  sessionCleanup: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  login: () => {},
  logout: () => {},
  sessionCleanup: () => {},
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
      const decoded = jwtDecode(parsedTokens.accessToken) as User;
      return {
        _id: decoded._id,
        username: decoded.username,
        role: decoded.role,
        deposit: decoded.deposit,
        accessToken: parsedTokens.accessToken,
        createdAt: decoded.createdAt,
        updatedAt: decoded.updatedAt,
        multiSessionAlert: '',
      };
    }
    return null;
  });

  const sessionCleanup = () => {
    localStorage.removeItem('tokens');
    setUser(null);
    navigate('/login');
  };

  const login = async (payload: LoginPayload) => {
    try {
      const { data: sessionData }: AxiosResponse<LoginResponse> = await api.post('/sessions', payload);
      localStorage.setItem('tokens', JSON.stringify(sessionData.data));
      const decoded = jwtDecode(sessionData.data.accessToken) as User;
      setUser({ ...decoded, multiSessionAlert: sessionData.data.message });
      navigate('/');
      showToast([{ message: sessionData.data.message || sessionData.message || 'Success', mode: 'success' }]);
    } catch (e) {
      apiErrorHandler(e);
    }
  };

  const logout = async () => {
    try {
      await api.delete('/sessions/logout');
      showToast([{ message: 'Success', mode: 'success' }]);
    } catch (e) {
      apiErrorHandler(e);
    } finally {
      sessionCleanup();
    }
  };

  const loadProfile = async () => {
    try {
      const { data: profileData }: AxiosResponse<{ data: User }> = await api.get('/users');
      setUser(profileData.data);
    } catch (error) {
      apiErrorHandler(error);
    }
  };

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, []);

  return <AuthContext.Provider value={{ user, login, logout, setUser, sessionCleanup }}>{children}</AuthContext.Provider>;
};

export { useAuthContext, AuthContextProvider };

import { api, AxiosResponse } from '@/utils/api';
import { useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const [user, setUser] = useState<User | null>(() => {
    const tokens = localStorage.getItem('tokens');
    if (tokens) {
      const parsedTokens = JSON.parse(tokens);
      return jwtDecode(parsedTokens.accessToken);
    }
    return null;
  });

  const login = async (payload: LoginPayload) => {
    const { data: responseData }: AxiosResponse<LoginResponse> = await api.post('/sessions', payload);
    localStorage.setItem('tokens', JSON.stringify(responseData.data));
    setUser(jwtDecode(responseData.data.accessToken));
    navigate('/catalog');
  };

  const logout = async () => {
    await api.put('/sessions');
    localStorage.removeItem('tokens');
    setUser(null);
    navigate('/');
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export { useAuthContext, AuthContextProvider };

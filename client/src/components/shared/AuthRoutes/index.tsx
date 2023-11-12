import { useAuthContext } from '@/contexts/auth';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

const AuthRoutes = ({ children }: Props) => {
  const { user } = useAuthContext();

  if (user) return children;
  return <Navigate to='/login' />;
};

export default AuthRoutes;

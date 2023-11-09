import { Routes, Route } from 'react-router-dom';
import Profile from '@/routes/Profile';
import Auth from '@/routes/Auth';
import AuthRoutes from '@/components/shared/AuthRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Auth />} />
      <Route
        path='/profile'
        element={
          <AuthRoutes>
            <Profile />
          </AuthRoutes>
        }
      />
    </Routes>
  );
};

export default AppRoutes;

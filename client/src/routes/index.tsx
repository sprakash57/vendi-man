import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './Profile';
import Auth from './Auth';

// Assume that isAuthenticated is a boolean value indicating whether the user is authenticated or not
const isAuthenticated = true;

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/profile' element={isAuthenticated ? <Profile /> : <Auth />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

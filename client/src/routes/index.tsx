import { Routes, Route } from 'react-router-dom';
import Profile from '@/routes/Profile';
import Auth from '@/routes/Auth';
import AuthRoutes from '@/components/shared/AuthRoutes';
import Products from '@/routes/Product/Products';
import ProductDetails from '@/routes/Product/ProductDetails';
import Register from '@/routes/Auth/Register';
import AddProduct from '@/routes/Product/AddProduct';
import Upload from '@/routes/Upload';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Register />} />
      <Route
        path='/'
        element={
          <AuthRoutes>
            <Products />
          </AuthRoutes>
        }
      />
      <Route
        path='/products/:id'
        element={
          <AuthRoutes>
            <ProductDetails />
          </AuthRoutes>
        }
      />
      <Route
        path='/products/create'
        element={
          <AuthRoutes>
            <AddProduct />
          </AuthRoutes>
        }
      />
      <Route
        path='/profile'
        element={
          <AuthRoutes>
            <Profile />
          </AuthRoutes>
        }
      />
      <Route
        path='/upload'
        element={
          <AuthRoutes>
            <Upload />
          </AuthRoutes>
        }
      />
    </Routes>
  );
};

export default AppRoutes;

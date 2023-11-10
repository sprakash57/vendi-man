import { BrowserRouter } from 'react-router-dom';
import Layout from '@/components/shared/Layout';
import AppRoutes from '@/routes';
import { AuthContextProvider } from '@/contexts/auth';
import { ToastProvider } from './contexts/toast';

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthContextProvider>
          <Layout>
            <AppRoutes />
          </Layout>
        </AuthContextProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;

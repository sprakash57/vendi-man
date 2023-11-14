import { BrowserRouter } from 'react-router-dom';
import Layout from '@/components/shared/Layout';
import AppRoutes from '@/routes';
import { AuthContextProvider } from '@/contexts/auth';
import { ToastProvider } from './contexts/toast';
import { ModalProvider } from './contexts/modals';

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthContextProvider>
          <ModalProvider>
            <Layout>
              <AppRoutes />
            </Layout>
          </ModalProvider>
        </AuthContextProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter } from 'react-router-dom';
import Layout from '@/components/shared/Layout';
import AppRoutes from '@/routes';
import { AuthContextProvider } from './contexts/auth';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Layout>
          <AppRoutes />
        </Layout>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;

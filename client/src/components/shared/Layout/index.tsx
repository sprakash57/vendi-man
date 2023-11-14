import React from 'react';
import s from './index.module.scss';
import { useAuthContext } from '@/contexts/auth';
import { Link } from 'react-router-dom';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <main>
      <nav className={s.nav}>
        <h3>Vendi-Man</h3>
        {user && (
          <ul className={s.nav__items}>
            <li>Balance: € {user.deposit}</li>
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
            <li>
              <Link to='/'>Products</Link>
            </li>
            <li role='button' onClick={handleLogout}>
              Logout
            </li>
          </ul>
        )}
      </nav>
      <section className={s.container}>{children}</section>
    </main>
  );
};

export default Layout;

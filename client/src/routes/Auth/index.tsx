import React, { useEffect, useState } from 'react';
import s from './index.module.scss';
import { useAuthContext } from '@/contexts/auth';
import Branding from '@/components/Branding';
import { Link, useNavigate } from 'react-router-dom';

const Auth = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const { login, user } = useAuthContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    login({ username: userData.username, password: userData.password });
  };
  // Redirect to home if user is logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <>
      <Branding />
      <form className={s.form} onSubmit={handleLogin}>
        <h3>Create Account</h3>
        <div className={s.form__fields}>
          <input placeholder='Username' type='text' name='username' value={userData.username} onChange={handleChange} />
          <input placeholder='Password' type='password' name='password' value={userData.password} onChange={handleChange} />
          <hr className={s.divider} />
          <div className={s.form__actions}>
            <button type='submit' data-variant='primary'>
              Login
            </button>
            <Link to='/register'>Register</Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default Auth;

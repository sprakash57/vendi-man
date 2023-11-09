import React, { useState } from 'react';
import CoinSelector from '@/components/CoinSelector';
import s from './index.module.scss';
import { useAuthContext } from '@/contexts/auth';
import { nonAuthApi } from '@/utils/api';
import Branding from '@/components/Branding';

const Auth = () => {
  const [iseNewUser, setIsNewUser] = useState(true);
  const [deposit, setDeposit] = useState(0);
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    role: 'buyer',
  });
  const { login } = useAuthContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleAuthPage = () => {
    setIsNewUser(prev => !prev);
  };

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (iseNewUser) {
      try {
        await nonAuthApi.post('/users', { ...userData, deposit });
        setIsNewUser(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      login({ username: userData.username, password: userData.password });
    }
  };

  return (
    <>
      <Branding />
      <form className={s.form} onSubmit={handleLogin}>
        <h3>Create Account</h3>
        <div className={s.form__fields}>
          <input placeholder='Username' type='text' name='username' value={userData.username} onChange={handleChange} />
          <input placeholder='Password' type='password' name='password' value={userData.password} onChange={handleChange} />
          {iseNewUser && (
            <>
              <input
                placeholder='Confirm Password'
                type='text'
                name='consfirmPassword'
                value={userData.confirmPassword}
                onChange={handleChange}
              />
              <div>
                <p>Select role</p>
                <div className={s.role}>
                  <label>
                    <input
                      type='radio'
                      name='role'
                      value='buyer'
                      checked={userData.role === 'buyer'}
                      onChange={handleChange}
                    />
                    Buyer
                  </label>
                  <label>
                    <input
                      type='radio'
                      name='role'
                      value='seller'
                      checked={userData.role === 'seller'}
                      onChange={handleChange}
                    />
                    Seller
                  </label>
                </div>
              </div>
              <CoinSelector deposit={deposit} setDeposit={setDeposit} />
            </>
          )}
          <hr className={s.divider} />
          <div className={s.form__actions}>
            <button type='submit' data-variant='primary'>
              {iseNewUser ? 'Register' : 'Login'}
            </button>
            <button type='button' onClick={toggleAuthPage}>
              {iseNewUser ? 'Already registered' : 'New User'}?
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Auth;

import React, { useState } from 'react';
import Branding from '@/components/Branding';
import { useToastContext } from '@/contexts/toast';
import s from './index.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import useAxios, { AxiosResponse } from '@/hooks/useAxios';

const Register = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    role: 'buyer',
    deposit: 0,
  });
  const { showToast } = useToastContext();
  const navigate = useNavigate();
  const { api, apiErrorHandler } = useAxios();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddUser = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const { data }: AxiosResponse<{ message: string }> = await api.post('/users', userData);
      showToast([{ message: data.message, mode: 'success' }]);
      navigate('/login');
    } catch (e: unknown) {
      apiErrorHandler(e);
    }
  };

  return (
    <>
      <Branding />
      <form className={s.form} onSubmit={handleAddUser}>
        <h3>Create Account</h3>
        <div className={s.form__fields}>
          <input placeholder='Username' type='text' name='username' value={userData.username} onChange={handleChange} />
          <input placeholder='Password' type='password' name='password' value={userData.password} onChange={handleChange} />
          <input
            placeholder='Confirm Password'
            type='password'
            name='confirmPassword'
            value={userData.confirmPassword}
            onChange={handleChange}
          />
          <div className={s.form__fields__role}>
            <label>Select role:</label>
            <div>
              <label>
                <input type='radio' name='role' value='buyer' checked={userData.role === 'buyer'} onChange={handleChange} />
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
          <div className={s.form__deposit}>
            <label>Deposit: {userData.deposit || ''}</label>
            <input placeholder='Deposit' type='number' name='deposit' value={userData.deposit} onChange={handleChange} />
            <small>*Amount should be multiple of 5 and less than 101</small>
          </div>
          <hr className={s.divider} />
          <div className={s.form__actions}>
            <button type='submit' data-variant='primary'>
              Register
            </button>
            <Link to='/login'>Already have an account?</Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default Register;

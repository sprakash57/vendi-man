import React, { useState } from 'react';
import { api, AxiosError, AxiosResponse } from '@/utils/api';
import Branding from '@/components/Branding';
import { useToastContext } from '@/contexts/toast';
import s from './index.module.scss';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    role: 'buyer',
    depositAmount: 0,
  });
  const { showToast } = useToastContext();
  const navigate = useNavigate();

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
      const error = e as AxiosError<{ message: string } | { errors: { msg: string }[] }>;
      if (error.response?.data) {
        if ('errors' in error.response.data) {
          showToast(error.response.data.errors.map((e: { msg: string }) => ({ message: e.msg })));
        } else {
          showToast([{ message: error.response.data.message }]);
        }
      } else {
        showToast([{ message: 'Something went wrong' }]);
      }
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
            <label>Deposit: {userData.depositAmount || ''}</label>
            <input
              placeholder='Deposit'
              type='number'
              name='depositAmount'
              value={userData.depositAmount}
              onChange={handleChange}
            />
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
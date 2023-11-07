import React, { useState } from 'react';
import styles from './index.module.css';
import CoinSelector from '../../components/CoinSelector';

interface Payload {
  username: string;
  password: string;
  confirmPassword: string;
  deposit: number;
  role: string;
}

const Auth = () => {
  const [iseNewUser, setIsNewUser] = useState(false);
  const [deposit, setDeposit] = useState(0);
  const [status, setStatus] = useState('');
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    role: 'buyer',
  });

  const resetForm = () => {
    setIsNewUser(false);
  };

  const createNewUser = async (payload: Payload) => {
    try {
      const response = await fetch('http://localhost:4000/api/v1/users', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await response.json();
      resetForm();
      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleAuthPage = () => {
    setIsNewUser(prev => !prev);
  };

  const handleNewUser = () => {
    const payload = { ...credentials, deposit };
    createNewUser(payload);
  };

  return (
    <section className={styles.form}>
      <label className={styles.form__fields}>
        Username:
        <input type='text' name='username' value={credentials.username} onChange={handleChange} />
      </label>
      <label className={styles.form__fields}>
        Password:
        <input type='password' name='password' value={credentials.password} onChange={handleChange} />
      </label>
      {iseNewUser && (
        <>
          <label className={styles.form__fields}>
            Confirm Password:
            <input type='password' name='confirmPassword' value={credentials.confirmPassword} onChange={handleChange} />
          </label>
          <div>
            <p>What is your role?</p>
            <label className={styles.form__fields}>
              <input type='radio' value='buyer' name='role' checked={credentials.role === 'buyer'} onChange={handleChange} />
              Buyer
            </label>
            <label className={styles.form__fields}>
              <input
                type='radio'
                value='seller'
                name='role'
                checked={credentials.role === 'seller'}
                onChange={handleChange}
              />
              Seller
            </label>
          </div>
          <CoinSelector deposit={deposit} setDeposit={setDeposit} />
        </>
      )}
      <button onClick={handleNewUser}>{iseNewUser ? 'Register' : 'Login'}</button>
      <button onClick={toggleAuthPage}>{iseNewUser ? 'Already registered' : 'New User'}?</button>
      {status === 'success' && <p>Successfully registered</p>}
      {status === 'error' && <p>Something went wrong. Please try again</p>}
    </section>
  );
};

export default Auth;

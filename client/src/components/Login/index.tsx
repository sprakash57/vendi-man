import React, { useState } from 'react';
import CoinSelector from '../CoinSelector';

interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

const Login: React.FC<LoginProps> = () => {
  const [iseNewUser, setIsNewUser] = useState(false);
  const [deposit, setDeposit] = useState(0);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    role: 'buyer',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleAuthPage = () => {
    setIsNewUser(prev => !prev);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = { ...credentials, deposit };
    console.log(payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type='text' value={credentials.username} onChange={handleChange} />
      </label>
      <label>
        Password:
        <input type='password' value={credentials.password} onChange={handleChange} />
      </label>
      <label>
        Confirm Password:
        <input type='password' value={credentials.password} onChange={handleChange} />
      </label>
      <div>
        <label>
          <input type='radio' value='buyer' name='role' checked={credentials.role === 'buyer'} onChange={handleChange} />
          Buyer
        </label>
        <label>
          <input type='radio' value='seller' name='role' checked={credentials.role === 'seller'} onChange={handleChange} />
          Seller
        </label>
        <label>
          Deposit:
          <CoinSelector deposit={deposit} setDeposit={setDeposit} />
        </label>
      </div>
      <button type='submit'>Login</button>
      <button onClick={toggleAuthPage}>{iseNewUser ? 'New User' : 'Already registered'}?</button>
    </form>
  );
};

export default Login;

import { useState } from 'react';
import { useAuthContext } from '@/contexts/auth';
import useAxios from '@/hooks/useAxios';
import { useToastContext } from '@/contexts/toast';
import { formatDate, capitalize } from '@/helpers/utils';
import s from './index.module.scss';

const Profile = () => {
  const { user, setUser, sessionCleanup } = useAuthContext();
  const { showToast } = useToastContext();
  const [deposit, setDeposit] = useState(5);
  const [editing, setEditing] = useState(false);
  const { api, apiErrorHandler } = useAxios();

  const handleDeposit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeposit(Number(e.target.value));
  };

  const handleConfirmDeposit = async () => {
    if (user) {
      try {
        const { data: depositData } = await api.post('/users/deposit', { depositAmount: deposit });
        setUser({ ...user, deposit: depositData.data.deposit });
        showToast([{ message: 'Balance updated', mode: 'success' }]);
        setEditing(false);
      } catch (error) {
        apiErrorHandler(error);
      }
    }
  };

  const handleAccountDelete = async () => {
    try {
      const { data: responseData } = await api.delete('/users');
      showToast([{ message: responseData.message || 'Success', mode: 'success' }]);
      sessionCleanup();
    } catch (error) {
      apiErrorHandler(error);
    }
  };

  const handleLogoutAll = async () => {
    try {
      const { data: responseData } = await api.put('/sessions/logout/all');
      showToast([{ message: responseData.message || 'Success', mode: 'success' }]);
      sessionCleanup();
    } catch (error) {
      apiErrorHandler(error);
    }
  };

  return (
    <section className={s.profile}>
      <h2>{user?.username}</h2>
      <div className={s.profile__bio}>
        <p>Role: {capitalize(user?.role)}</p>
        <p>Balance: € {user?.deposit}</p>
        <p>Account created at {formatDate(new Date(user?.createdAt || ''))}</p>
      </div>
      <hr className={s.profile__divider} />
      <div className={s.profile__section}>
        <h3>Top Up wallet</h3>
        <div className={s.profile__section__row}>
          {editing && (
            <>
              <input id='deposit' type='number' min={5} value={deposit} onChange={handleDeposit} />
              <button onClick={handleConfirmDeposit} data-variant='primary'>
                Confirm
              </button>
            </>
          )}
          <button onClick={() => setEditing(prev => !prev)} data-variant='secondary'>
            {editing ? 'Cancel' : 'Top Up'}
          </button>
        </div>
      </div>
      {user?.multiSessionAlert && (
        <div className={s.profile__section}>
          <h3>Log me out from all other devices</h3>
          <div className={s.profile__section__row}>
            <button data-variant='danger-outline' onClick={handleLogoutAll}>
              Log out
            </button>
          </div>
        </div>
      )}
      <div className={s.profile__section}>
        <h3>Delete my account</h3>
        <div className={s.profile__section__row}>
          <button data-variant='danger' onClick={handleAccountDelete}>
            Delete
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;

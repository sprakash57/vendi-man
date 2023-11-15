import { useState } from 'react';
import { useAuthContext } from '@/contexts/auth';
import useAxios from '@/hooks/useAxios';
import { useToastContext } from '@/contexts/toast';
import { formatDate, capitalize } from '@/helpers/utils';
import s from './index.module.scss';
import { useModalContext } from '@/contexts/modals';

const Profile = () => {
  const { user, setUser, sessionCleanup } = useAuthContext();
  const { showToast } = useToastContext();
  const { api, apiErrorHandler } = useAxios();
  const { openModal } = useModalContext();

  const [deposit, setDeposit] = useState(5);
  const [editing, setEditing] = useState(false);

  const handleDeposit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeposit(Number(e.target.value));
  };

  const handleConfirmDeposit = async () => {
    if (user) {
      try {
        const { data: depositData } = await api.post('/users/deposit', { deposit });
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
      showToast([{ message: responseData.message, mode: 'success' }]);
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

  const handleBalanceReset = async () => {
    try {
      await api.put('/users/deposit/reset');
      user && setUser({ ...user, deposit: 0 });
      showToast([{ message: 'Balance reset to 0', mode: 'success' }]);
    } catch (error) {
      apiErrorHandler(error);
    }
  };

  const handleOpenResetModal = () => {
    openModal(true, {
      title: 'Are you sure? This will reset your balance to 0.',
      confirmAction: handleBalanceReset,
    });
  };

  const handleOpenDeleteModal = () => {
    openModal(true, {
      title: 'Are you sure? This will delete your account and all your data.',
      confirmAction: handleAccountDelete,
    });
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
      {user?.role === 'buyer' && (
        <div className={s.profile__section}>
          <h3>Reset balance</h3>
          <div className={s.profile__section__row}>
            <button data-variant='danger-outline' onClick={handleOpenResetModal}>
              Reset
            </button>
          </div>
        </div>
      )}
      <div className={s.profile__section}>
        <h3>Delete my account</h3>
        <div className={s.profile__section__row}>
          <button data-variant='danger' onClick={handleOpenDeleteModal}>
            Delete
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;

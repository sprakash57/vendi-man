import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '@/components/Modals';
import { useModalContext } from '@/contexts/modals';
import styles from './index.module.scss';

const ConfirmModal = () => {
  const navigate = useNavigate();
  const { isModalOpen, openModal, pageDetails } = useModalContext();
  const { confirmAction, redirectTo, title } = pageDetails;

  const handleClose = useCallback(() => {
    openModal(false);
  }, [openModal]);

  const handleConfirm = () => {
    confirmAction && confirmAction();
    handleClose();
    redirectTo && navigate(redirectTo);
  };

  const handleCancel = () => {
    handleClose();
  };

  return (
    <Modal isOpen={isModalOpen} onClose={handleClose}>
      <section className={styles.delete}>
        <header className={styles.delete__header}>
          <h4>{title || 'Are you sure about this?'}</h4>
        </header>
        <footer className={styles.delete__footer}>
          <button data-variant='danger-outline' onClick={handleConfirm}>
            Confirm
          </button>
          <button data-variant='secondary' onClick={handleCancel}>
            Cancel
          </button>
        </footer>
      </section>
    </Modal>
  );
};

export default ConfirmModal;

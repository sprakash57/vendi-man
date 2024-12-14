import { useMemo } from 'react';
import styles from './index.module.scss';

interface Props {
  mode?: string;
  onClose: () => void;
  message: string;
}

export const Toast = ({ mode = 'error', onClose, message }: Props) => {
  const iconClasses = useMemo(() => [styles.toast__icon, styles[mode]].join(' '), [mode]);

  const toastIcon = useMemo(() => {
    switch (mode) {
      case 'error':
        return (
          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' className={iconClasses}>
            <path
              d='M18.36 19.78L12 13.41l-6.36 6.37-1.42-1.42L10.59 12 4.22 5.64l1.42-1.42L12 10.59l6.36-6.36 1.41 1.41L13.41 12l6.36 6.36-1.41 1.42z'
              fill='white'
            />
          </svg>
        );
      default:
        return (
          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' className={iconClasses}>
            <path d='M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z' fill='white' />
          </svg>
        );
    }
  }, [mode, iconClasses]);

  return (
    <div onClick={onClose} className={styles.toast}>
      <div className={styles.toast__content}>
        {toastIcon}
        <p>{message}</p>
      </div>
      <span className={styles.toast__close}>X</span>
    </div>
  );
};

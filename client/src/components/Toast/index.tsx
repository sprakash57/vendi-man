import { useMemo } from 'react';
import styles from './index.module.scss';

interface Props {
  mode?: string;
  onClose: () => void;
  message: string;
}

export const Toast = ({ mode = 'error', onClose, message }: Props) => {
  const classes = useMemo(() => [styles.toast, styles[mode]].join(' '), [mode]);

  return (
    <div onClick={onClose} className={classes}>
      <div className={styles.message}>{message}</div>
      <span className={styles.close}>X</span>
    </div>
  );
};

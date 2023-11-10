import { useRef } from 'react';
import style from './index.module.css';
import Portal from '@/components/shared/Portal';
import useHandleOutsideClick from '@/hooks/useHandleOutsideClick';

interface Props {
  isOpen: boolean;
  outsideClickClose?: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ isOpen, children, onClose, outsideClickClose = true }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useHandleOutsideClick(containerRef, () => {
    isOpen && outsideClickClose && onClose();
  });

  if (!isOpen) {
    return null;
  }

  return (
    <Portal wrapperId='app-modal'>
      {isOpen && (
        <section className={style.modal__overlay} aria-hidden={!isOpen}>
          <div className={style.modal} ref={containerRef}>
            <button className={style.modal__closebtn} onClick={onClose}>
              X
            </button>
            <div className={style.modal__content} data-testid='modal-content'>
              {children}
            </div>
          </div>
        </section>
      )}
    </Portal>
  );
};

export default Modal;

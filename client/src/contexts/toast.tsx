import { createContext, useState, useContext, useEffect } from 'react';
import Portal from '@/components/shared/Portal';
import { Toast } from '@/components/Toast';

/**
 * [
          { id: '1', mode: 'error', message: 'some dummy message' },
          { id: '2', mode: 'error', message: 'some dummy message' },
          { id: '3', mode: 'info', message: 'some dummy message' },
        ]
 */

interface ToastContent {
  message: string;
  mode?: string;
}

interface Toast extends ToastContent {
  id: string;
}

interface ToastContextValue {
  showToast: (toasts: ToastContent[]) => void;
}

const ToastContext = createContext<ToastContextValue>({
  showToast: () => {},
});

const useToastContext = () => useContext(ToastContext);

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (messages: ToastContent[]) => {
    const toasts = messages.map((m, i) => ({ id: `${Date.now()}${i}`, message: m.message, mode: m?.mode || 'error' }));
    setToasts(prevToasts => [...prevToasts, ...toasts]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setToasts(prevToasts => {
        if (prevToasts.length > 0) {
          return prevToasts.slice(1);
        }
        return prevToasts;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleClose = (id: string) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Portal>
        {toasts.map(({ id, mode, message }) => (
          <Toast key={id} mode={mode} message={message} onClose={() => handleClose(id)} />
        ))}
      </Portal>
    </ToastContext.Provider>
  );
};

export { useToastContext, ToastProvider };

import { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children, wrapperId = 'app-portal' }: { children: React.ReactNode; wrapperId?: string }) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    let isCreated = false;
    let element = document.getElementById(wrapperId) as HTMLElement;

    if (!element) {
      isCreated = true;
      element = document.createElement('div');
      element.setAttribute('id', wrapperId);
      Object.assign(element.style, { position: 'fixed', bottom: '40px', left: '10px' });
      document.body.appendChild(element);
    }

    setWrapperElement(element);

    return () => {
      if (isCreated && element?.parentNode) {
        document.parentNode?.removeChild(element);
      }
    };
  }, [wrapperId]);

  if (wrapperElement === null) return null;
  return createPortal(children, document.getElementById(wrapperId) as HTMLElement);
};

export default Portal;

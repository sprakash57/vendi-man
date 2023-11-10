import { useEffect, useRef, MutableRefObject } from 'react';

const useHandleOutsideClick = <T extends HTMLElement>(ref: MutableRefObject<T | null>, callback: () => void) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const captureOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callbackRef.current();
      }
    };

    document.addEventListener('mousedown', captureOutsideClick);

    return () => {
      document.removeEventListener('mousedown', captureOutsideClick);
    };
  }, [ref]);
};

export default useHandleOutsideClick;

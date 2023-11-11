import { useState } from 'react';
import s from './index.module.scss';

const Toggle = ({ label = '', onToggle }: { label?: string; onToggle: (isActive: boolean) => void }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    onToggle(!isActive);
  };

  return (
    <section className={s.container}>
      <div className={s.container__switch} data-active={isActive}>
        <div className={s.container__switch__button} data-active={isActive} onClick={handleClick}></div>
      </div>
      <p>{label}</p>
    </section>
  );
};

export default Toggle;

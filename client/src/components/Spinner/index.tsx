import s from './index.module.scss';

const Spinner = ({ size = 30 }) => {
  return (
    <div className={s.spinner}>
      <span className={s.spinner__path} style={{ width: `${size}px`, height: `${size}px` }} />
    </div>
  );
};

export default Spinner;

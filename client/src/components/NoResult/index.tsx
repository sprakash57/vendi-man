import style from './index.module.scss';

interface Props {
  message: string;
  description?: string;
}

const NoResult = ({ message, description = '' }: Props) => {
  return (
    <div className={style.noResult}>
      <h3>{message}</h3>
      <p>{description}</p>
    </div>
  );
};

export default NoResult;

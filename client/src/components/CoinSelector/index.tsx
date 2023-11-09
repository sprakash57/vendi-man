import s from './index.module.scss';
const CoinSelector = ({
  deposit = 0,
  setDeposit,
}: {
  deposit: number;
  setDeposit: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const handleCoinClick = (value: number) => {
    if (deposit + value <= 100 && deposit + value >= 0) {
      setDeposit(deposit + value);
    }
  };

  return (
    <section className={s.coins}>
      <p>{`Deposit: ${deposit}`}</p>
      <div className={s.coins__button}>
        <div className={s.coin}>
          <button type='button' onClick={() => handleCoinClick(-5)}>
            -
          </button>
          <span>5</span>
          <button type='button' onClick={() => handleCoinClick(5)}>
            +
          </button>
        </div>
        <div className={s.coin}>
          <button type='button' onClick={() => handleCoinClick(-10)}>
            -
          </button>
          <span>10</span>
          <button type='button' onClick={() => handleCoinClick(10)}>
            +
          </button>
        </div>
        <div className={s.coin}>
          <button type='button' onClick={() => handleCoinClick(-20)}>
            -
          </button>
          <span>20</span>
          <button type='button' onClick={() => handleCoinClick(20)}>
            +
          </button>
        </div>
        <div className={s.coin}>
          <button type='button' onClick={() => handleCoinClick(-50)}>
            -
          </button>
          <span>50</span>
          <button type='button' onClick={() => handleCoinClick(50)}>
            +
          </button>
        </div>
        <div className={s.coin}>
          <button type='button' onClick={() => handleCoinClick(-100)}>
            -
          </button>
          <span>100</span>
          <button type='button' onClick={() => handleCoinClick(100)}>
            +
          </button>
        </div>
      </div>
    </section>
  );
};

export default CoinSelector;

import s from './index.module.css';
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
      <p>{!!deposit && `Deposit: ${deposit}`}</p>
      <div>
        <div className={s.coin}>
          <button onClick={() => handleCoinClick(-5)}>-</button>
          <span>5</span>
          <button onClick={() => handleCoinClick(5)}>+</button>
        </div>
        <div className={s.coin}>
          <button onClick={() => handleCoinClick(-10)}>-</button>
          <span>10</span>
          <button onClick={() => handleCoinClick(10)}>+</button>
        </div>
        <div className={s.coin}>
          <button onClick={() => handleCoinClick(-20)}>-</button>
          <span>20</span>
          <button onClick={() => handleCoinClick(20)}>+</button>
        </div>
        <div className={s.coin}>
          <button onClick={() => handleCoinClick(-50)}>-</button>
          <span>50</span>
          <button onClick={() => handleCoinClick(50)}>+</button>
        </div>
        <div className={s.coin}>
          <button onClick={() => handleCoinClick(-100)}>-</button>
          <span>100</span>
          <button onClick={() => handleCoinClick(100)}>+</button>
        </div>
      </div>
    </section>
  );
};

export default CoinSelector;

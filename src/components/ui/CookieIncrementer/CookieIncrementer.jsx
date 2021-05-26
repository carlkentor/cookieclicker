import { useToolShop } from "context";
import styles from "./cookieincrementer.module.scss";
const CookieIncrementer = () => {
  const { balance, incrementBalance, currentMultiplier } = useToolShop();
  return (
    <div className={styles.container}>
      <h4>Cookie Wallet</h4>
      <h2 id="current_balance" data-testid="current_balance">
        {balance}
      </h2>
      <h3>x {currentMultiplier}</h3>
      <button
        className={styles.cookie__btn}
        data-testid="increment_current_balance"
        onClick={() => incrementBalance(balance + currentMultiplier)}
      ></button>
    </div>
  );
};

export default CookieIncrementer;

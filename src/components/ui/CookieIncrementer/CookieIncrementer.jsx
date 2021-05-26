import { useToolShop } from "context";
import styles from "./cookieincrementer.module.scss";
const CookieIncrementer = () => {
  const { balance, incrementBalance } = useToolShop();
  console.log(balance);
  return (
    <div className={styles.container}>
      <h4>Cookie Wallet</h4>
      <h2 id="current_balance" data-testid="current_balance">
        {balance}
      </h2>
      <button
        data-testid="increment_current_balance"
        onClick={() => incrementBalance(balance + 1)}
      >
        Cash out
      </button>
    </div>
  );
};

export default CookieIncrementer;

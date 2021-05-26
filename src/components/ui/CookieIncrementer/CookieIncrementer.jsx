import styles from "./cookieincrementer.module.scss";
const CookieIncrementer = () => {
  return (
    <div className={styles.container}>
      <h4>Cookie Wallet</h4>
      <h2 id="current_balance" data-testid="current_balance"></h2>
      <button data-testid="increment_current_balance">Cash out</button>
    </div>
  );
};

export default CookieIncrementer;

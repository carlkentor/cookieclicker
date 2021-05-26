import styles from "./toolitem.module.scss";
import { useToolShop } from "context";

const ToolItem = ({ id, type, name, price }) => {
  const { purchaseTool, balance } = useToolShop();
  const canAfford = balance >= price;

  return (
    <div
      className={`${styles.container} ${
        !canAfford ? styles.to__expensive : ""
      }`}
    >
      <div className={styles.container__heading}>
        <div className={styles.container__heading__info}>
          <span>{name}</span>
          <span>{price} cookies</span>
        </div>
      </div>
      <div className={styles.container__body}>
        <button disabled={!canAfford} onClick={() => purchaseTool(id)}>
          Buy
        </button>
      </div>
    </div>
  );
};

export default ToolItem;

import styles from "./inventorytoolitem.module.scss";
import { useToolShop } from "context";

const InventoryToolItem = ({ id, type, name, price, owned }) => {
  const { sellTool } = useToolShop();

  return (
    <div>
      <div className={styles.container__heading}>
        <div className={styles.container__heading__info}>
          <span>{name}</span>
          <span>{price} cookies</span>
        </div>
      </div>
      <div className={styles.container__body}>
        <button onClick={() => sellTool(id)}>Sell</button>
      </div>
    </div>
  );
};

export default InventoryToolItem;

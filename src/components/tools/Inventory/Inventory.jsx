import styles from "./inventory.module.scss";
import { InventoryToolItem } from "components/tools";
import { useToolShop } from "context";
const ToolInventory = () => {
  const { inventory } = useToolShop();
  return (
    <div className={styles.container}>
      <h2>Inventory</h2>
      <div className={styles.body}>
        <ul>
          {inventory &&
            inventory.map((tool) => (
              <li key={tool.id}>
                <InventoryToolItem {...tool} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ToolInventory;

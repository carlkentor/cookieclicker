import styles from "./tools.module.scss";
import ToolItem from "../ToolItem";
import { useToolShop } from "context";
const ToolInventory = () => {
  const { tools } = useToolShop();
  return (
    <div className={styles.container}>
      <h2>Tool Shop</h2>
      <div className={styles.body}>
        <ul>
          {tools &&
            tools.map((tool) => (
              <li key={tool.id}>
                <ToolItem {...tool} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ToolInventory;

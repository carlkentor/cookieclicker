import styles from "./grid.module.scss";
import { nanoid } from "nanoid";
const Grid = ({ children }) => {
  return (
    <div data-testid="grid" className={styles.grid}>
      {children &&
        children.map((child) => (
          <div key={nanoid()} className={styles.grid__item}>
            {child}
          </div>
        ))}
    </div>
  );
};

export default Grid;

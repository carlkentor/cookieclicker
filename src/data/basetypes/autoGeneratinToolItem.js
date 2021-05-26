import ToolItem from "./toolItem";

class AutoGeneratingToolItem extends ToolItem {
  constructor({ id, name, type, price, level, batchInterval, batchAmount }) {
    super(id, name, "auto", type, price, level);
    this.batchInterval = batchInterval;
    this.batchAmount = batchAmount;
  }
}

export default AutoGeneratingToolItem;

import ToolItem from "./toolItem";

class ClickableToolItem extends ToolItem {
  constructor({
    id,
    name,
    type,
    price,
    level,
    clickTreshold,
    clickMultiplier,
  }) {
    super(id, name, "clickable", type, price, level);
    this.clickTreshold = clickTreshold;
    this.clickMultiplier = clickMultiplier;
  }
}
export default ClickableToolItem;

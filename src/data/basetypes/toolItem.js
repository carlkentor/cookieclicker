class ToolItem {
  constructor(id, name, type, price, level) {
    this.id = id;
    this.name = `${name} lvl ${level}`;
    this.type = type;
    this.price = price;
    this.level = level;
  }
}
export default ToolItem;

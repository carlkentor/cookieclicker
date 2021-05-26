import { ClickableToolItem, AutoGeneratingToolItem } from "./basetypes";

const createAutoGeneratingToolItem = (toolItem, index) => {
  const autoGeneratingToolItem = {
    ...toolItem,
    batchInterval: index * 20000,
    batchAmount: index * 1000,
  };
  return new AutoGeneratingToolItem({ ...autoGeneratingToolItem });
};

const createClickableToolItem = (toolItem, index) => {
  const clickableToolItem = {
    ...toolItem,
    clickTreshold: index * 1000,
    clickMultiplier: index * 2,
  };
  return new ClickableToolItem({ ...clickableToolItem });
};

export const buildToolLevels = (name, type, basePrice, amount = 10) => {
  let currentPrice = basePrice;
  const tools = [...new Array(amount)].map((p, i) => {
    const mathFriendlyIndex = i + 1;

    const fifteenPercentageIncrease = (price) => price * 0.15 * i;
    currentPrice += parseInt(fifteenPercentageIncrease(basePrice));

    const toolItem = {
      id: `${name}__${i}`,
      name: name,
      type: type,
      price: currentPrice,
      level: mathFriendlyIndex,
    };
    return type === "auto"
      ? createAutoGeneratingToolItem(toolItem, mathFriendlyIndex)
      : createClickableToolItem(toolItem, mathFriendlyIndex);
  });
  return tools;
};

const grandmas = buildToolLevels("Grandma", "clickable", 10, 10);
const factories = buildToolLevels("Factory", "auto", 40, 10);
const banks = buildToolLevels("Bank", "auto", 100, 5);
const mines = buildToolLevels("Mine", "auto", 200, 5);

const allTools = [...grandmas, ...factories, ...banks, ...mines];

const sorted = allTools.sort((n, v) => {
  const compareLevel = n.price - v.price;
  return compareLevel;
});

export const tools = sorted;

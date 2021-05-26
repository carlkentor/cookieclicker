import { buildToolLevels } from "./tools.js";
test("buildToolLevels", () => {
  const grandmas = buildToolLevels("Grandma", "clickable", 50, 10);
  //   const factories = buildToolLevels("Factory", "auto", 100, 10);
  //   const banks = buildToolLevels("Bank", "auto", 200, 5);
  //   const mines = buildToolLevels("Mine", "auto", 300, 5);
  expect(grandmas).toBeInstanceOf(Array);
});

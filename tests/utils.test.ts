import { slugify } from "../src/utils/slugify";

test("test slugification", () => {
  const inputStr = "Warfare Lore";
  const outputString = slugify(inputStr);
  expect(outputString).toStrictEqual("warfare-lore");
});

test("test slugification without spaces", () => {
  const inputStr = "Arcana";
  const outputString = slugify(inputStr);
  expect(outputString).toStrictEqual("arcana");
});

test("test slugification with multiple spaces", () => {
  const inputStr = "Warfare Knowitall Lore";
  const outputString = slugify(inputStr);
  expect(outputString).toStrictEqual("warfare-knowitall-lore");
});

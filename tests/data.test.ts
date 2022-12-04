import { Branches, Skills } from "../src/data/branches";

test("Try accessing skills via enum", () => {
  let key = Branches.CascadeBearers;
  let skills = Skills[key];
  expect(skills).toStrictEqual(["Arcana", "Occultism", "Religion"]);
});

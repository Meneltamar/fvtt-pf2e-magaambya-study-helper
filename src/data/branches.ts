export enum Branches {
  CascadeBearers = "Cascade Bearers",
  EmeraldBoughs = "Emerald Boughs",
  RainScribes = "Rain Scribes",
  TempestSunMages = "Tempest-Sun Mages",
  Uzunjati = "Uzunjati",
}

type skills = Partial<Record<Branches, string[]>>;

export const Skills: skills = {
  "Cascade Bearers": ["Arcana", "Occultism", "Religion"],
  "Emerald Boughs": ["Deception", "Diplomacy", "Society"],
  "Rain Scribes": ["Medicine", "Nature", "Survival"],
  "Tempest-Sun Mages": ["Intimidation", "Performance"],
  Uzunjati: ["Crafting"],
};

type slugs = Record<Branches, string>;

export const Slugs: slugs = {
  "Cascade Bearers": "branch:cascade-bearers",
  "Emerald Boughs": "branch:emerald-boughs",
  "Rain Scribes": "branch:rain-scribes",
  "Tempest-Sun Mages": "branch:tempest-sun-mages",
  Uzunjati: "branch:uzunjati",
};

export const SKILL_DICTIONARY = {
  acr: "acrobatics",
  arc: "arcana",
  ath: "athletics",
  cra: "crafting",
  dec: "deception",
  dip: "diplomacy",
  itm: "intimidation",
  med: "medicine",
  nat: "nature",
  occ: "occultism",
  prf: "performance",
  rel: "religion",
  soc: "society",
  ste: "stealth",
  sur: "survival",
  thi: "thievery",
} as const;
export const SKILL_LONG_FORMS = new Set(Object.values(SKILL_DICTIONARY));

export const SKILL_DICTIONARY_REVERSE = Object.fromEntries(
  Object.entries(SKILL_DICTIONARY).map(([abbrev, value]) => [value, abbrev])
);

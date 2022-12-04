export enum Branches {
  CascadeBearers = "Cascade Bearers",
  EmeraldBoughs = "Emerald Boughs",
  RainScribes = "Rain Scribes",
  TempestSunMages = "Tempest-Sun Mages",
  Uzunjati = "Uzunjati",
}

type skills = Partial<Record<Branches, string[]>>;

export const Skills: skills = {
  "Cascade Bearers": ["arcana", "occultism", "religion", "academia-lore"],
  "Emerald Boughs": ["deception", "diplomacy", "society"],
  "Rain Scribes": ["medicine", "nature", "survival"],
  "Tempest-Sun Mages": ["intimidation", "performance", "warfare-lore"],
  Uzunjati: ["crafting"],
};

import { Branches } from "./branches";

export type BranchData = {
  firstBranch: Branches;
  firstBranchLevel: number;
  firstBranchLore: string;
  firstBranchStars: number;
  secondBranch: Branches;
  secondBranchLevel: number;
  secondBranchLore: string;
  secondBranchStars: number;
};

let Misty: BranchData = {
  firstBranch: Branches.CascadeBearers,
  secondBranch: Branches.EmeraldBoughs,
  firstBranchLevel: 2,
  secondBranchLevel: 3,
  firstBranchStars: 0,
  secondBranchStars: 0,
  firstBranchLore: "Warfare Lore",
  secondBranchLore: "Your Mama Lore",
};

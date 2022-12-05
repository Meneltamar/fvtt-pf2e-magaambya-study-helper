import { BranchData } from "src/data/actor-data";
import { Branches, Skills } from "../data/branches";
import { MagaambyaStudyHelper } from "./MagaambyaStudyHelper";

type BranchOverviewData = {
  branches: Branches[];
  actor: Actor;
  magaambyaData: BranchData;
};

export class BranchOverviewForm extends FormApplication<
  FormApplicationOptions,
  BranchOverviewData
> {
  actor: any;
  magaambyaData: BranchData;
  constructor(actor: Actor) {
    super(actor);
    this.actor = actor;
    // @ts-ignore
    this.magaambyaData = actor.getFlag(
      MagaambyaStudyHelper.ID,
      MagaambyaStudyHelper.FLAGS.BRANCHDATA
    );
    if (!this.magaambyaData) {
      // @ts-ignore
      actor.setFlag(
        MagaambyaStudyHelper.ID,
        MagaambyaStudyHelper.FLAGS.BRANCHDATA,
        {
          firstBranch: Branches.CascadeBearers,
          firstBranchLevel: 0,
          firstBranchStars: 0,
          secondBranch: Branches.EmeraldBoughs,
          secondBranchLevel: 0,
          secondBranchStars: 0,
        }
      );
      // @ts-ignore
      this.magaambyaData = actor.getFlag(
        MagaambyaStudyHelper.ID,
        MagaambyaStudyHelper.FLAGS.BRANCHDATA
      );
    }
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["form"],
      popOut: true,
      id: "branch-overview",
      title: "Branch Overview",
    });
  }
  getData() {
    return {
      branches: [
        Branches.CascadeBearers,
        Branches.EmeraldBoughs,
        Branches.RainScribes,
        Branches.TempestSunMages,
        Branches.Uzunjati,
      ],
      actor: this.actor,
      magaambyaData: this.magaambyaData,
    };
  }

  get template(): string {
    return MagaambyaStudyHelper.TEMPLATES.branchOverview;
  }

  protected async _updateObject(event: Event, formData?: any): Promise<void> {
    const updatedFlag: BranchData = {
      firstBranch: formData.firstBranch,
      firstBranchLevel: formData.firstBranchLevel,
      // firstBranchLore: formData.firstBranchLore,
      firstBranchStars: 0,
      secondBranch: formData.secondBranch,
      secondBranchLevel: formData.secondBranchLevel,
      // secondBranchLore: formData.secondBranchLore,
      secondBranchStars: 0,
    };
    this.actor.setFlag(
      MagaambyaStudyHelper.ID,
      MagaambyaStudyHelper.FLAGS.BRANCHDATA,
      updatedFlag
    );
  }
}

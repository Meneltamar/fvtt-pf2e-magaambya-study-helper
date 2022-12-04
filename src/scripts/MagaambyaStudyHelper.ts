import { BranchData } from "src/data/actor-data";
import { Branches, Skills } from "../data/branches";
import { levelingDialog } from "./LevelingDialog";

declare const game: Game;

export class MaagambyaStudyHelper {
  static ID = "magaambya-study-helper";

  static FLAGS = {
    BRANCHDATA: "branch-data",
  };

  static SETTINGS = {};

  static TEMPLATES = {
    branchOverview: `modules/${this.ID}/templates/branch-overview.html`,
  };

  static log(force, ...args) {
    const shouldLog =
      force ||
      //      @ts-ignore
      game.modules.get("_dev-mode")?.api?.getPackageDebugValue(this.ID);

    if (shouldLog) {
      console.log(this.ID, "|", ...args);
    }
  }

  static initialize() {
    Hooks.on("renderCharacterSheetPF2e", (app, html, obj) => {
      let actor = app.object;
      let element = html.find(".window-header .window-title");
      if (element.length != 1) return;
      let button = $(
        `<a class="popout" style><i class="fas fa-book"></i>Magaambya Helper</a>`
      );
      button.on("click", () => {
        const bof = new BranchOverviewForm(actor).render(true);
      });
      element.after(button);
    });
    Hooks.on("renderBranchOverviewForm", (app, html, obj) => {
      let actor = app.object;
      const {
        firstBranchLevel,
        secondBranchLevel,
        firstBranch,
        secondBranch,
        firstBranchLore,
        secondBranchLore,
      } = actor.getFlag(
        MaagambyaStudyHelper.ID,
        MaagambyaStudyHelper.FLAGS.BRANCHDATA
      );
      const button = $("#firstBranchButton") as JQuery<HTMLButtonElement>;
      button.on("click", function () {
        levelingDialog(firstBranch, firstBranchLevel, actor, firstBranchLore);
      });
      const secondbutton = $(
        "#secondBranchButton"
      ) as JQuery<HTMLButtonElement>;
      secondbutton.on("click", function () {
        levelingDialog(
          secondBranch,
          secondBranchLevel,
          actor,
          secondBranchLore
        );
      });
    });
  }
}

type BranchOverviewData = {
  branches: Branches[];
  actor: Actor;
  magaambyaData: BranchData;
  lores: string[];
};

class BranchOverviewForm extends FormApplication<
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
      MaagambyaStudyHelper.ID,
      MaagambyaStudyHelper.FLAGS.BRANCHDATA
    );
    if (!this.magaambyaData) {
      // @ts-ignore
      actor.setFlag(
        MaagambyaStudyHelper.ID,
        MaagambyaStudyHelper.FLAGS.BRANCHDATA,
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
        MaagambyaStudyHelper.ID,
        MaagambyaStudyHelper.FLAGS.BRANCHDATA
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
      lores: this.actor.items
        .filter((item) => item.type == "lore")
        .map((lore) => lore.name),
    };
  }

  get template(): string {
    return MaagambyaStudyHelper.TEMPLATES.branchOverview;
  }

  protected async _updateObject(event: Event, formData?: any): Promise<void> {
    const updatedFlag: BranchData = {
      firstBranch: formData.firstBranch,
      firstBranchLevel: formData.firstBranchLevel,
      firstBranchLore: formData.firstBranchLore,
      firstBranchStars: 0,
      secondBranch: formData.secondBranch,
      secondBranchLevel: formData.secondBranchLevel,
      secondBranchLore: formData.secondBranchLore,
      secondBranchStars: 0,
    };
    this.actor.setFlag(
      MaagambyaStudyHelper.ID,
      MaagambyaStudyHelper.FLAGS.BRANCHDATA,
      updatedFlag
    );
  }
}

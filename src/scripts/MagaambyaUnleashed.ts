import { makeArray } from "jquery";
import { BranchData } from "src/data/actor-data";
import { Branches } from "../data/branches";

declare const game: Game;

export class MagaambyaUnleashed {
  static ID = "magaambya-unleashed";

  static FLAGS = {
    MAGAAMBYAUNLEASHED: "MAGAAMBYAUNLEASHED",
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
      let actor = obj.actor as Actor;
      let element = html.find(".window-header .window-title");
      if (element.length != 1) return;
      let button = $(
        `<a class="popout" style><i class="fas fa-book"></i>Magaambya Unleashed</a>`
      );
      button.on("click", () => {
        new MyFormApplication(actor).render(true);
      });
      element.after(button);
    });
  }
}

type MyData = {
  branches: Branches[];
  actor: Actor;
  magaambyaData: BranchData;
};

class MyFormApplication extends FormApplication<
  FormApplicationOptions,
  MyData
> {
  actor: Actor;
  magaambyaData: BranchData;
  constructor(actor: Actor) {
    super(actor);
    this.actor = actor;
    // @ts-ignore
    this.magaambyaData = actor.getFlag(
      MagaambyaUnleashed.ID,
      MagaambyaUnleashed.FLAGS.BRANCHDATA
    );
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["form"],
      popOut: true,
      id: "branch-overview",
      title: "My FormApplication",
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
    return MagaambyaUnleashed.TEMPLATES.branchOverview;
  }

  protected async _updateObject(
    event: Event,
    formData?: object
  ): Promise<void> {
    console.log(formData);
  }
}

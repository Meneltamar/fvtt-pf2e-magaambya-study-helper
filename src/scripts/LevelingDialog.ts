import { Branches, Skills } from "../data/branches";
import { dcByLevel } from "../utils/dcByLevel";
declare const game: any;
declare const token: Token;
declare const actor: Actor;
// All actions here are pulled from "game.pf2e.actions"

export function levellingDialog(branch: Branches, currentLevel: number, actor) {
  const skill_list = Skills[branch];

  const options = Object.entries(skill_list)
    .map(([arrayPos, displayName]) => [
      `<option value="${displayName}">${displayName}</option>`,
    ])
    .join();

  const content = `<form>
        <div class="form-group">
            <label>Skill:</label>
            <select name="skill-selector">${options}</select>
        </div>
    </form>`;
  const dc = dcByLevel.get(currentLevel);
  new Dialog({
    title: "Choose which skill to roll",
    content,
    buttons: {
      ok: {
        label: "<span class='pf2-icon'>1</span> Roll selected skill",
        callback: (html: any) => {
          const skill = html.find("[name=skill-selector]")[0].value as string;
          console.log(skill);
          actor.skills[skill.toLowerCase()].check.roll({ dc: dc });
        },
      },
      cancel: {
        label: "<span class='pf2-icon'>R</span> Cancel",
      },
    },
    default: "cancel",
  }).render(true);
}

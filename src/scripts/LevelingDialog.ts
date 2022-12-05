import { Branches, Skills, Slugs } from "../data/branches";
import { dcByLevel } from "../utils/dcByLevel";
import { SKILL_DICTIONARY_REVERSE } from "../data/branches";
import { slugify } from "../utils/slugify";
declare const game: any;
declare const token: Token;
declare const actor: Actor;
// All actions here are pulled from "game.pf2e.actions"

export function levelingDialog(branch: Branches, currentLevel: number, actor) {
  const skill_list = [...Skills[branch]];
  if (branch == Branches.Uzunjati) {
    const lores: string[] = actor.items
      .filter((item) => item.type == "lore")
      .map((lore) => lore.name);
    skill_list.push(...lores);
  }

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
          const slugSkill = slugify(skill);
          const options = new Set(["action:study", Slugs[branch]]);
          actor.skills[slugSkill].check.roll({
            extraRollOptions: options,
            dc: { 
              label: `Study at ${branch}: ${skill}`,
              value: dc,
              adjustments: [] },
          });
        },
      },
      cancel: {
        label: "<span class='pf2-icon'>R</span> Cancel",
      },
    },
    default: "cancel",
  }).render(true);
}

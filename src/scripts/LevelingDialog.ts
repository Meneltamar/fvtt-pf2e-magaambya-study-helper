import { Branches, Skills } from "../data/branches";
import { dcByLevel } from "../utils/dcByLevel";
import { SKILL_DICTIONARY_REVERSE } from "../data/branches";
import { slugify } from "../utils/slugify";
declare const game: any;
declare const token: Token;
declare const actor: Actor;
// All actions here are pulled from "game.pf2e.actions"

export function levelingDialog(
  branch: Branches,
  currentLevel: number,
  actor,
  lore: string
) {
  const skill_list = [...Skills[branch]];
  skill_list.push(lore);
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
          if (skill.toLowerCase() in SKILL_DICTIONARY_REVERSE) {
            actor.skills[skill.toLowerCase()].check.roll({ dc: dc });
          } else {
            const skillKey = slugify(skill);
            const options = actor.getRollOptions([
              "all",
              "skill-check",
              skillKey,
            ]);
            game.pf2e.Check.roll(
              new game.pf2e.CheckModifier(
                `<p class="compact-text">${skill} Skill Check</p>`,
                actor.system.skills[skillKey],
                []
              ),
              {
                actor: actor,
                type: "skill-check",
                options,
                dc: {
                  value: dc,
                },
              },
              event
            );
          }
        },
      },
      cancel: {
        label: "<span class='pf2-icon'>R</span> Cancel",
      },
    },
    default: "cancel",
  }).render(true);
}

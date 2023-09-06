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
        <div class="form-group">
          <label>Is Cram?</label>
          <input name="isCram" type="checkbox">
        </div>
        ${branch === Branches.RainScribes 
          ? `<div class="form-group">
            <label>Is Highbram's Advantage?</label>
            <input name="isFriendHighbram" type="checkbox">
          </div>` 
          : ''}
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
          const isCram = html.find("[name=isCram]")[0]?.checked ?? false;
          if (isCram) options.add("action:cram");
          const isFriendHighbram = html.find("[name=isFriendHighbram]")[0]?.checked ?? false;
          const amount = 1 + Number(isCram) + Number(isCram && isFriendHighbram);

          for (let i = 0;i < amount; i++) {
            actor.skills[slugSkill].check.roll({
              extraRollOptions: options,
              dc: { 
                label: `${isCram ? 'Cram' : 'Study'} at ${branch}: ${skill} DC`,
                value: dc,
                adjustments: []
              },
            });
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

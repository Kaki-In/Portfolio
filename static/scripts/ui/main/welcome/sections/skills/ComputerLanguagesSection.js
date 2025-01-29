import { SKILL_TYPE_COMPUTER_LANGAGE } from "../../../../../local_user/world/skills/Skill.js";
import { SkillsSection } from "./SkillsSection.js";

export class ComputerLanguagesSection extends SkillsSection
{
    constructor(local_user, notifications, switch_history)
    {
        super("common.title.computer-languages", SKILL_TYPE_COMPUTER_LANGAGE, local_user, notifications, switch_history);
    }
}

import { SKILL_TYPE_HOBBIE } from "../../../../../local_user/world/skills/Skill.js";
import { SkillsSection } from "./SkillsSection.js";

export class HobbiesSection extends SkillsSection
{
    constructor(local_user, notifications, switch_history)
    {
        super("common.title.hobbies", SKILL_TYPE_HOBBIE, local_user, notifications, switch_history);
    }
}

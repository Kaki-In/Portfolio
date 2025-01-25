import { SKILL_TYPE_HARD_SKILL } from "../../../../local_user/world/skills/Skill.js";
import { SkillsSection } from "./SkillsSection.js";

export class HardSkillsSection extends SkillsSection
{
    constructor(local_user, notifications)
    {
        super("common.title.hard-skills", SKILL_TYPE_HARD_SKILL, local_user, notifications);
    }
}

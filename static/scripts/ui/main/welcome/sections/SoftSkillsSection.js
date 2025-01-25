import { SKILL_TYPE_SOFT_SKILL } from "../../../../local_user/world/skills/Skill.js";
import { SkillsSection } from "./SkillsSection.js";

export class SoftSkillsSection extends SkillsSection
{
    constructor(local_user, notifications)
    {
        super("common.title.soft-skills", SKILL_TYPE_SOFT_SKILL, local_user, notifications);
    }
}

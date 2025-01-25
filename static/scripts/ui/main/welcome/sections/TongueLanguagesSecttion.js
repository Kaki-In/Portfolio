import { SKILL_TYPE_TONGUE_LANGAGE } from "../../../../local_user/world/skills/Skill.js";
import { SkillsSection } from "./SkillsSection.js";

export class TongueLanguagesSection extends SkillsSection
{
    constructor(local_user, notifications)
    {
        super("common.title.spoken-languages", SKILL_TYPE_TONGUE_LANGAGE, local_user, notifications);
    }
}

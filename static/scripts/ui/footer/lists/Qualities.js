import { FooterList } from "../../components/FooterList.js";

export class SoftSkillsList extends FooterList
{
    constructor(local_user) 
    {
        super("Mes qualités");

        this._soft_skills_action = this.addAction("Mes qualités");

        local_user.translator.multiTranslate((soft_skills) => {
            this.title = soft_skills;
            this._soft_skills_action.innerHTML = soft_skills;

        }, "common.title.soft-skills");
    }
}



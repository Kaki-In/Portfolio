import { Skill } from "../skills/Skill.js";

export class ExperienceDetails
{
    constructor(experience, skills)
    {
        this._experience = experience;

        this._skills = [];
        for (let skill_data of skills)
        {
            this._skills.push(new Skill(skill_data.name, skill_data.type, skill_data.logo));
        }
    }

    get experience()
    {
        return this._experience;
    }

    get skills()
    {
        return this._skills;
    }
}




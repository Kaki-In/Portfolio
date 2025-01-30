import { Skill } from "../skills/Skill.js";

export class ProjectDetails
{
    constructor(project, skills)
    {
        this._project = project;

        this._skills = [];
        for (let skill_data of skills)
        {
            this._skills.push(new Skill(skill_data.name, skill_data.type, skill_data.logo));
        }
    }

    get project()
    {
        return this._project;
    }

    get skills()
    {
        return this._skills;
    }
}




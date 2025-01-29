import { Skill } from "./Skill.js";
import { SkillDetails } from "./SkillDetails.js";

export class SkillsList
{
    constructor(api)
    {
        this._api = api;
    }

    async getSkillDetails(name)
    {
        let data = await this._api.sendAction("get-skill-details", { name });

        return new SkillDetails(new Skill(name, data.type, data.logo), data['experiences-uses'], data['projects-uses']);
    }

    async getAllSkills()
    {
        let data = await this._api.sendAction("get-skills");

        let result = [];

        for (let skill_data of data)
        {
            result.push(new Skill(skill_data.name, skill_data.type, skill_data.logo));
        }

        return result;
    }

    async getSkillsOfType(type)
    {
        let data = await this._api.sendAction("get-skills", { type });

        let result = [];

        for (let skill_data of data)
        {
            result.push(new Skill(skill_data.name, skill_data.type, skill_data.logo));
        }

        return result;
    }
}



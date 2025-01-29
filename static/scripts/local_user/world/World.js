import { ExperiencesList } from "./experiences/ExperiencesList.js";
import { ProjectsList } from "./projects/ProjectsList.js";
import { SkillsList } from "./skills/SkillsList.js";

export class World
{
    constructor(api)
    {
        this._api = api;

        this._skills = new SkillsList(this._api);
        this._experiences = new ExperiencesList(this._api);
        this._projects = new ProjectsList(this._api);
    }

    get skills()
    {
        return this._skills;
    }

    get experiences()
    {
        return this._experiences;
    }

    get projects()
    {
        return this._projects;
    }
}

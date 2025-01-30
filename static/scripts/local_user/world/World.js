import { ExperiencesList } from "./experiences/ExperiencesList.js";
import { ProjectsList } from "./projects/ProjectsList.js";
import { SkillsList } from "./skills/SkillsList.js";

export class World
{
    constructor(api, pages_retriever)
    {
        this._skills = new SkillsList(api, pages_retriever);
        this._experiences = new ExperiencesList(api, pages_retriever);
        this._projects = new ProjectsList(api, pages_retriever);
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

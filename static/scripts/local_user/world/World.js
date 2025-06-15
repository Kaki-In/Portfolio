import { ExperiencesList } from "./experiences/ExperiencesList.js";
import { ProjectsList } from "./projects/ProjectsList.js";
import { SkillsList } from "./skills/SkillsList.js";
import { CountriesList } from "./countries/CountriesList.js";
import { LocationsList } from "./locations/LocationsList.js";

export class World
{
    constructor(api, pages_retriever)
    {
        this._skills = new SkillsList(api, pages_retriever);
        this._experiences = new ExperiencesList(api, pages_retriever);
        this._projects = new ProjectsList(api, pages_retriever);
        this._countries = new CountriesList(api, pages_retriever);
        this._locations = new LocationsList(api, pages_retriever);
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

    get countries()
    {
        return this._countries;
    }

    get locations()
    {
        return this._locations;
    }
}

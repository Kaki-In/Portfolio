import { SkillsList } from "./skills/SkillsList.js";

export class World
{
    constructor(api)
    {
        this._api = api;

        this._skills = new SkillsList(this._api);
    }

    get skills()
    {
        return this._skills;
    }
}

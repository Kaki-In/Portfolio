import { Experience } from "./Experience.js";

export class ExperiencesList
{
    constructor(api)
    {
        this._api = api;
    }

    async getAllExperiences()
    {
        let data = await this._api.sendAction("get-experiences");

        let result = [];

        for (let experience_data of data)
        {
            result.push(new Experience(experience_data.name, experience_data.type, experience_data.thumbnail, new Date(experience_data['date-from']), experience_data['date-to']?new Date(experience_data['date-to']):null));
        }

        return result;
    }

    async getExperiencesOfType(type)
    {
        let data = await this._api.sendAction("get-experiences", { type });

        let result = [];

        for (let experience_data of data)
        {
            result.push(new Experience(experience_data.name, experience_data.type, experience_data.thumbnail, new Date(experience_data['date-from']), experience_data['date-to']?new Date(experience_data['date-to']):null));
        }

        return result;
    }
}



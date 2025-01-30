import { Experience } from "./Experience.js";
import { ExperienceDetails } from "./ExperienceDetails.js";

export class ExperiencesList
{
    constructor(api, pages_retriever)
    {
        this._api = api;
        this._pages_retriever = pages_retriever;
    }

    async getExperienceDetails(name)
    {
        let data = await this._api.sendAction("get-experience-details", { name });

        return new ExperienceDetails(new Experience(this._pages_retriever, data.name, data.type, data.thumbnail, new Date(data['date-from']), data['date-to']?new Date(data['date-to']):null), data['skills']);
    }

    async getAllExperiences()
    {
        let data = await this._api.sendAction("get-experiences");

        let result = [];

        for (let experience_data of data)
        {
            result.push(new Experience(this._pages_retriever, experience_data.name, experience_data.type, experience_data.thumbnail, new Date(experience_data['date-from']), experience_data['date-to']?new Date(experience_data['date-to']):null));
        }

        return result;
    }

    async getExperiencesOfType(type)
    {
        let data = await this._api.sendAction("get-experiences", { type });

        let result = [];

        for (let experience_data of data)
        {
            result.push(new Experience(this._pages_retriever, experience_data.name, experience_data.type, experience_data.thumbnail, new Date(experience_data['date-from']), experience_data['date-to']?new Date(experience_data['date-to']):null));
        }

        return result;
    }
}



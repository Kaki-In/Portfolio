import { Project } from "./Project.js";

export class ProjectsList
{
    constructor(api, pages_retriever)
    {
        this._api = api;
        this._pages_retriever = pages_retriever;
    }

    async getAllProjects()
    {
        let data = await this._api.sendAction("get-projects");

        let result = [];

        for (let project_data of data)
        {
            result.push(new Project(this._pages_retriever, project_data.name, project_data.type, project_data.thumbnail, new Date(project_data['date-from']), project_data['date-to']?new Date(project_data['date-to']):null, project_data.finished, project_data.location));
        }

        return result;
    }

    async getProjectsOfType(type)
    {
        let data = await this._api.sendAction("get-projects", { type });

        let result = [];

        for (let project_data of data)
        {
            result.push(new Project(this._pages_retriever, project_data.name, project_data.type, project_data.thumbnail, new Date(project_data['date-from']), project_data['date-to']?new Date(project_data['date-to']):null, project_data.finished, project_data.location));
        }

        return result;
    }
}



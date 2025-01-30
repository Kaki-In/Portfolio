import { Project } from "./Project.js";
import { ProjectDetails } from "./ProjectDetails.js";

export class ProjectsList
{
    constructor(api, pages_retriever)
    {
        this._api = api;
        this._pages_retriever = pages_retriever;
    }

    async getProjectDetails(name)
    {
        let data = await this._api.sendAction("get-project-details", { name });

        return new ProjectDetails(new Project(this._pages_retriever, data.name, data.type, data.thumbnail, new Date(data['date-from']), data['date-to']?new Date(data['date-to']):null, data.finished, data.location), data['skills']);
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



import { Experience } from "../experiences/Experience.js";
import { Project } from "../projects/Project.js";

export class SkillDetails
{
    constructor(skill, used_experiences, used_projects, pages_retriever)
    {
        this._skill = skill;

        this._used_experiences = [];
        for (let experience_data of used_experiences)
        {
            this._used_experiences.push(new Experience(pages_retriever, experience_data.name, experience_data.type, experience_data.thumbnail, new Date(experience_data['date-from']), experience_data['date-to']?new Date(experience_data['date-to']):null));
        }

        this._used_projects = [];
        for (let project_data of used_projects)
        {
            this._used_projects.push(new Project(pages_retriever, project_data.name, project_data.type, project_data.thumbnail, new Date(project_data['date-from']), project_data['date-to']?new Date(project_data['date-to']):null, project_data.finished, project_data.link, project_data.location));
        }
    }

    get skill()
    {
        return this._skill;
    }

    get used_experiences()
    {
        return this._used_experiences;
    }

    get used_projects()
    {
        return this._used_projects;
    }
}




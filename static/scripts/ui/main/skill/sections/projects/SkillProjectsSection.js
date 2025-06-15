import { appendChild, Component } from "../../../../components/Component.js";
import { SkillProjectThumbnail } from "./SkillProjectThumbnail.js";

export class SkillProjectsSection extends Component
{
    constructor(title, projects, local_user, notifications, switch_history)
    {
        let { div, title: title_element, projects_div } = createSkillProjectSection();
        super(div);

        this._projects_div = projects_div;

        local_user.translator.multiTranslate((title) => {
            title_element.innerHTML = title;
        }, title);

        this.prepare(projects, local_user, notifications, switch_history);
    }

    async prepare(projects, local_user, notifications, switch_history)
    {
        let i = 0;

        for (let project of projects)
        {
            this.addProject(project, local_user, notifications, switch_history, i%2);
            ++i;
        }
    }

    addProject(project, local_user, notifications, switch_history, odd)
    {
        let thumbnail = new SkillProjectThumbnail(project, local_user, notifications, switch_history);
        thumbnail.isOdd = odd;

        appendChild(this._projects_div, thumbnail);
    }
}

function createSkillProjectSection()
{
    let div = document.createElement("div");
    div.classList.add("projects-section");

    let title = div.appendChild(document.createElement("h2"));

    let projects_div = div.appendChild(document.createElement("div"));
    projects_div.classList.add("projects-list");

    return {
        div,
        title,
        projects_div
    }
}


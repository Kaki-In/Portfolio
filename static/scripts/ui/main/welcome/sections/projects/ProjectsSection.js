import { appendChild, Component, removeChild } from "../../../../components/Component.js";
import { LoadingSVG } from "../../../../components/svgs/LoadingSvg.js";
import { observeAppearition } from "../../../../utils/animate-observer.js";
import { ProjectThumbnail } from "./ProjectThumbnail.js";

export class ProjectsSection extends Component
{
    constructor(title, type, local_user, notifications, switch_history)
    {
        let { div, title: title_element, projects_div, loading_svg } = createProjectSection();
        super(div);

        this._projects_div = projects_div;
        this._loading_svg = loading_svg;

        local_user.translator.multiTranslate((title) => {
            title_element.innerHTML = title;
        }, title);

        this.prepare(type, local_user, notifications, switch_history);
    }

    async prepare(type, local_user, notifications, switch_history)
    {
        let i = 0;

        for (let project of await local_user.world.projects.getProjectsOfType(type))
        {
            this.addProject(project, local_user, notifications, switch_history, i%2);
            ++i;
        }

        removeChild(this.element, this._loading_svg);
    }

    addProject(project, local_user, notifications, switch_history, odd)
    {
        let thumbnail = new ProjectThumbnail(project, local_user, notifications, switch_history);
        thumbnail.isOdd = odd;

        appendChild(this._projects_div, thumbnail);

        observeAppearition(thumbnail.element);
    }
}

function createProjectSection()
{
    let div = document.createElement("div");
    div.classList.add("projects-section");

    let title = div.appendChild(document.createElement("h2"));

    let projects_div = div.appendChild(document.createElement("div"));
    projects_div.classList.add("projects-list");

    let loading_svg = appendChild(div, new LoadingSVG());
    loading_svg.start();

    return {
        div,
        title,
        projects_div,
        loading_svg
    }
}


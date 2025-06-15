import { CssParser } from "../../../local_user/pages/CssParser.js";
import { DivTranslator } from "../../../local_user/pages/DivTranslator.js";
import { appendChild, Component, removeChild } from "../../components/Component.js";
import { ImageComponent } from "../../components/Image.js";
import { LoadingSVG } from "../../components/svgs/LoadingSvg.js";
import { ProjectSkillsSection } from "./sections/skills/ProjectSkillsSection.js";

export class ProjectPage extends Component
{
    constructor(local_user, notifications, switch_history)
    {
        let { div, image, title, loading_svg } = createProjectPage();
        super(div);

        this._loading_svg = loading_svg;
        this._title = title;
        this._image = image;

        this.prepare(local_user, notifications, switch_history);
    }

    async prepare(local_user, notifications, switch_history)
    {
        let name = switch_history.state.project;

        let project_details;

        try {
            project_details = await local_user.world.projects.getProjectDetails(name);
        } catch (exc) {
            console.log(exc);
            switch_history.goBack();
            return;
        }

        removeChild(this.element, this._loading_svg);
        
        this._image.base64 = project_details.project.thumbnail;

        let page = await project_details.project.getPage();

        let div = document.createElement("div");
        div.id = "project-page-" + name.replaceAll(".", "_");
        div.classList.add("project-page");
        div.innerHTML = "<p id='not-finished-text' translated>common.not-finished</p>" + page.html;
        new DivTranslator(local_user.translator).translate(div);

        let style = div.appendChild(document.createElement("style"));
        style.setAttribute("scoped", '');
        style.innerHTML = new CssParser().parse("#project-page-" + name.replaceAll(".", "_"), page.css);

        let script = div.appendChild(document.createElement("script"));
        script.innerHTML = page.javascript;

        this.element.appendChild(div);

        if (project_details.skills.length) appendChild(this.element, new ProjectSkillsSection("common.projects.related-skills", project_details.skills, local_user, notifications, switch_history))

        local_user.translator.multiTranslate((title) => {
            this._title.innerHTML = title;
        }, "project." + name + ".title")
    }
}

function createProjectPage()
{
    let div = document.createElement("div");
    div.id = "project";

    let banner = div.appendChild(document.createElement("div"));
    banner.classList.add("project-banner");

    let image = appendChild(banner, new ImageComponent());
    let title = banner.appendChild(document.createElement("h1"));

    let loading_svg = appendChild(div, new LoadingSVG());
    loading_svg.start();

    return {
        div,
        image,
        title,
        loading_svg
    }
}


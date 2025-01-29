import { appendChild, Component, removeChild } from "../../components/Component.js";
import { Image } from "../../components/Image.js";
import { SVGAnimation } from "../../components/SVGAnimation.js";
import { SkillExperiencesSection } from "./sections/experiences/SkillExperiencesSection.js";
import { SkillProjectsSection } from "./sections/projects/SkillProjectsSection.js";

export class SkillPage extends Component
{
    constructor(local_user, notifications, switch_history)
    {
        let { div, title: title_element, text, image, loading_svg } = createSkillPage(local_user, notifications, switch_history);

        super(div);

        this._title = title_element;
        this._text = text;
        this._image = image;
        this._svg = loading_svg;

        this.prepare(local_user, notifications, switch_history);
    }

    async prepare(local_user, notifications, switch_history)
    {
        let name = switch_history.state.skill;

        let skill_details;

        try {
            skill_details = await local_user.world.skills.getSkillDetails(name);
        } catch (exc) {
            switch_history.goBack();
            return;
        }

        this._image.base64 = skill_details.skill.logo;

        if (skill_details.used_experiences.length) appendChild(this.element, new SkillExperiencesSection("common.skills.used-experiences", skill_details.used_experiences, local_user, notifications, switch_history))
        if (skill_details.used_projects.length) appendChild(this.element, new SkillProjectsSection("common.skills.used-projects", skill_details.used_projects, local_user, notifications, switch_history))

        local_user.translator.multiTranslate((title, description) => {
            this._title.innerHTML = title;
            this._text.innerHTML = description;
        }, "skills." + name, "skills." + name + ".description");

        removeChild(this.element, this._svg);

    }
}

function createSkillPage(local_user, notifications, switch_history)
{
    let div = document.createElement("div");
    div.id = "skill";

    let banner = div.appendChild(document.createElement("div"));
    banner.classList.add("skill-banner");

    let image = appendChild(banner, new Image());

    let title = banner.appendChild(document.createElement("h1"));

    let text = div.appendChild(document.createElement("p"));

    let loading_svg = appendChild(div, new SVGAnimation(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
          <ellipse style="fill: rgba(255, 0, 0, 0); stroke: rgb(255, 0, 0); stroke-width: 50px; stroke-miterlimit: 5.03; transform-box: fill-box; transform-origin: 50% 50%; stroke-dasharray: 251.23, 1130.52;" cx="250" cy="250" rx="200" ry="200">
            <animate attributeName="stroke-dasharray" values="1004.9, 251.23;251.23, 1004.9;1004.9, 251.23" begin="0s" dur="2.05s" fill="freeze" keyTimes="0; 0.50008; 1" calcMode="spline" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1" repeatCount="indefinite"></animate>
            <animateTransform type="rotate" additive="sum" attributeName="transform" values="-180;180" begin="0s" dur="0.74s" keyTimes="0; 1" fill="freeze" repeatCount="indefinite"></animateTransform>
            <animateTransform type="rotate" additive="sum" attributeName="transform" values="0;0;-180" dur="2.03s" fill="freeze" keyTimes="0; 0.500337; 1" calcMode="spline" keySplines="0 0 1 1; 0.42 0 0.58 1"></animateTransform>
          </ellipse>
        </svg>
    `));
    loading_svg.element.classList.add("loading");
    loading_svg.start();

    return {
        div,
        title,
        text,
        image,
        loading_svg
    }
}


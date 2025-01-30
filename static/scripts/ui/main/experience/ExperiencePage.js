import { CssParser } from "../../../local_user/pages/CssParser.js";
import { DivTranslator } from "../../../local_user/pages/DivTranslator.js";
import { appendChild, Component, removeChild } from "../../components/Component.js";
import { Image } from "../../components/Image.js";
import { SVGAnimation } from "../../components/SVGAnimation.js";
import { ExperienceSkillsSection } from "./sections/skills/ExperienceSkillsSection.js";

export class ExperiencePage extends Component
{
    constructor(local_user, notifications, switch_history)
    {
        let { div, image, title, loading_svg } = createExperiencePage();
        super(div);

        this._loading_svg = loading_svg;
        this._title = title;
        this._image = image;

        this.prepare(local_user, notifications, switch_history);
    }

    async prepare(local_user, notifications, switch_history)
    {
        let name = switch_history.state.experience;

        let experience_details;

        try {
            experience_details = await local_user.world.experiences.getExperienceDetails(name);
        } catch (exc) {
            switch_history.goBack();
            return;
        }

        removeChild(this.element, this._loading_svg);
        
        this._image.base64 = experience_details.experience.thumbnail;

        let page = await experience_details.experience.getPage();

        let div = document.createElement("div");
        div.id = "experience-page-" + name.replaceAll(".", "_");
        div.classList.add("experience-page");
        div.innerHTML = "<p id='not-finished-text' translated>common.not-finished</p>" + page.html;
        new DivTranslator(local_user.translator).translate(div);

        let style = div.appendChild(document.createElement("style"));
        style.setAttribute("scoped", '');
        style.innerHTML = new CssParser().parse("#experience-page-" + name.replaceAll(".", "_"), page.css);

        let script = div.appendChild(document.createElement("script"));
        script.innerHTML = page.javascript;

        this.element.appendChild(div);

        appendChild(this.element, new ExperienceSkillsSection("common.experiences.related-skills", experience_details.skills, local_user, notifications, switch_history))

        local_user.translator.multiTranslate((title) => {
            this._title.innerHTML = title;
        }, "experiences." + name + ".title")
    }
}

function createExperiencePage()
{
    let div = document.createElement("div");
    div.id = "experience";

    let banner = div.appendChild(document.createElement("div"));
    banner.classList.add("experience-banner");

    let image = appendChild(banner, new Image());
    let title = banner.appendChild(document.createElement("h1"));

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
        image,
        title,
        loading_svg
    }
}


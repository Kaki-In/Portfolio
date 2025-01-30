import { appendChild, Component, removeChild } from "../../../../components/Component.js";
import { LoadingSVG } from "../../../../components/svgs/LoadingSvg.js";
import { observeAppearition } from "../../../../utils/animate-observer.js";
import { ExperienceThumbnail } from "./ExperienceThumbnail.js";

export class ExperiencesSection extends Component
{
    constructor(title, type, local_user, notifications, switch_history)
    {
        let { div, title: title_element, experiences_div, loading_svg } = createExperienceSection();
        super(div);

        this._experiences_div = experiences_div;
        this._loading_svg = loading_svg;

        local_user.translator.multiTranslate((title) => {
            title_element.innerHTML = title;
        }, title);

        this.prepare(type, local_user, notifications, switch_history);
    }

    async prepare(type, local_user, notifications, switch_history)
    {
        let i = 0;

        for (let experience of await local_user.world.experiences.getExperiencesOfType(type))
        {
            this.addExperience(experience, local_user, notifications, switch_history, i%2);
            ++i;
        }

        removeChild(this.element, this._loading_svg);
    }

    addExperience(experience, local_user, notifications, switch_history, odd)
    {
        let thumbnail = new ExperienceThumbnail(experience, local_user, notifications, switch_history);
        thumbnail.isOdd = odd;

        appendChild(this._experiences_div, thumbnail);

        observeAppearition(thumbnail.element);
    }
}

function createExperienceSection()
{
    let div = document.createElement("div");
    div.classList.add("experiences-section");

    let title = div.appendChild(document.createElement("h2"));

    let experiences_div = div.appendChild(document.createElement("div"));
    experiences_div.classList.add("experiences-list");

    let loading_svg = appendChild(div, new LoadingSVG());
    loading_svg.start();

    return {
        div,
        title,
        experiences_div,
        loading_svg
    }
}


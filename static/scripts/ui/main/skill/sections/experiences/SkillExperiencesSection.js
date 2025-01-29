import { appendChild, Component } from "../../../../components/Component.js";
import { SkillExperienceThumbnail } from "./SkillExperienceThumbnail.js";

export class SkillExperiencesSection extends Component
{
    constructor(title, experiences, local_user, notifications, switch_history)
    {
        let { div, title: title_element, experiences_div } = createExperienceSection();
        super(div);

        this._experiences_div = experiences_div;

        local_user.translator.multiTranslate((title) => {
            title_element.innerHTML = title;
        }, title);

        this.prepare(experiences, local_user, notifications, switch_history);
    }

    async prepare(experiences, local_user, notifications, switch_history)
    {
        let i = 0;

        for (let experience of experiences)
        {
            this.addExperience(experience, local_user, notifications, switch_history, i%2);
            ++i;
        }
    }

    addExperience(experience, local_user, notifications, switch_history, odd)
    {
        let thumbnail = new SkillExperienceThumbnail(experience, local_user, notifications, switch_history);
        thumbnail.isOdd = odd;

        appendChild(this._experiences_div, thumbnail);
    }
}

function createExperienceSection()
{
    let div = document.createElement("div");
    div.classList.add("experiences-section");

    let title = div.appendChild(document.createElement("h2"));

    let experiences_div = div.appendChild(document.createElement("div"));
    experiences_div.classList.add("experiences-list");

    return {
        div,
        title,
        experiences_div
    }
}


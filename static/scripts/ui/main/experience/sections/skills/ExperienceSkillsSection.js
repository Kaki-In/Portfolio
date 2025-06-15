import { appendChild, Component } from "../../../../components/Component.js";
import { ExperienceSkillThumbnail } from "./ExperienceSkillThumbnail.js";

export class ExperienceSkillsSection extends Component
{
    constructor(name, skills, local_user, notifications, switch_history)
    {
        let { div, title, content_div } = createExperienceSkillsSection();
        super(div);

        this._title = title;
        this._content = content_div;

        local_user.translator.multiTranslate((soft_skills) => {
            this._title.innerHTML = soft_skills;
        }, name);

        this.prepare(skills, local_user, notifications, switch_history);
    }

    async prepare(skills, local_user, notifications, switch_history)
    {
        for (let skill of skills)
        {
            this.addSkillThumbnail(skill, local_user, notifications, switch_history);
        }
    }

    addSkillThumbnail(skill, local_user, notifications, switch_history)
    {
        appendChild(this._content, new ExperienceSkillThumbnail(skill, local_user, notifications, switch_history));
    }

}

function createExperienceSkillsSection()
{
    let div = document.createElement("div");
    div.classList.add("skills-section");

    let title = div.appendChild(document.createElement("h2"));

    let content_div = div.appendChild(document.createElement("div"));
    content_div.classList.add("skills-list");

    return {
        div,
        title,
        content_div
    }
}

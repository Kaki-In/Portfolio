import { appendChild, Component } from "../../../../components/Component.js";
import { Image } from "../../../../components/Image.js";

export class SkillProjectThumbnail extends Component
{
    constructor(project, local_user, notifications, switch_history)
    {
        let { div, title: title_element, text, date_text, image } = createProjectThumbnail();
        super(div);

        image.base64 = project.thumbnail;

        local_user.translator.multiTranslate((title, intro, date_from, date_to, date_at, date_to_today) => {
            let language = local_user.preferences.language;

            title_element.innerHTML = title;
            text.innerHTML = intro

            if (project.date_to === null)
            {
                date_text.innerHTML = date_from + " " + project.date_from.toLocaleDateString(language) + " " + date_to_today;
            } else if (project.date_from.toDateString() == project.date_to.toDateString()) {
                date_text.innerHTML = date_at + " " + project.date_from.toLocaleDateString(language);
            } else {
                date_text.innerHTML = date_from + " " + project.date_from.toLocaleDateString(language) + " " + date_to + " " + project.date_to.toLocaleDateString(language);
            }
        }, "project." + project.name + ".title", "project." + project.name + ".intro", "date.from", "date.to", "date.at", "date.to-today");
    }

    get isOdd()
    {
        return this.element.classList.contains("odd");
    }

    set isOdd(enabled)
    {
        if (enabled)
        {
            this.element.classList.add("odd");
        } else {
            this.element.classList.remove("odd");
        }
    }
}

function createProjectThumbnail()
{
    let div = document.createElement("div");
    div.classList.add("project-thumbnail");

    let image = appendChild(div, new Image());

    let description_div = div.appendChild(document.createElement("div"));
    description_div.classList.add("project-description");

    let title = description_div.appendChild(document.createElement("h3"));
    let text = description_div.appendChild(document.createElement("p"));
    text.classList.add("project-intro");

    let date_text = description_div.appendChild(document.createElement("p"));
    date_text.classList.add("project-dates");
    
    return {
        div,
        image,
        title,
        text,
        date_text,
    };
}


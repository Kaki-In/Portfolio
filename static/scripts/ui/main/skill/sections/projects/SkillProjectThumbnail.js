import { appendChild, Component } from "../../../../components/Component.js";
import { ImageComponent } from "../../../../components/Image.js";

export class SkillProjectThumbnail extends Component
{
    constructor(project, local_user, notifications, switch_history)
    {
        let { div, title: title_element, text, date_text, image, link_text } = createSkillProjectThumbnail();
        super(div);

        image.base64 = project.thumbnail;

        local_user.translator.multiTranslate((title, intro, date_from, date_to, date_at, date_to_today) => {
            let language = local_user.preferences.language;

            title_element.innerHTML = title;
            text.innerHTML = intro

            if (project.date_to === null)
            {
                date_text.innerHTML = date_from + " " + project.date_from.toLocaleDateString(language) + " " + date_to_today ;
            } else if (project.date_from.toDateString() == project.date_to.toDateString()) {
                date_text.innerHTML = date_at + " " + project.date_from.toLocaleDateString(language);
            } else {
                date_text.innerHTML = date_from + " " + project.date_from.toLocaleDateString(language) + " " + date_to + " " + project.date_to.toLocaleDateString(language);
            }

        }, "project." + project.name + ".title", "project." + project.name + ".intro", "date.from", "date.to", "date.at", "date.to-today");

        div.addEventListener("click", () => {
            switch_history.pushState("project", {project: project.name});
        });

        if (project.link)
        {
            link_text.href = project.link;
            link_text.textContent = project.link;
        }

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

function createSkillProjectThumbnail()
{
    let div = document.createElement("div");
    div.classList.add("project-thumbnail");

    let image = appendChild(div, new ImageComponent());

    let description_div = div.appendChild(document.createElement("div"));
    description_div.classList.add("project-description");

    let title = description_div.appendChild(document.createElement("h3"));
    let text = description_div.appendChild(document.createElement("p"));
    text.classList.add("project-intro");

    let description_p = description_div.appendChild(document.createElement("p"));
    description_p.innerHTML = "<text id='date'></text> - <a id='link' target='_blank'></a>";

    let date_text = description_p.querySelector('#date');
    date_text.classList.add("project-dates");
    
    let link_text = description_p.querySelector('#link');
    link_text.classList.add("project-links");
    
    return {
        div,
        image,
        title,
        text,
        date_text,
        link_text
    };
}


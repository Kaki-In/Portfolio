import { appendChild, Component } from "../../../../components/Component.js";
import { Image } from "../../../../components/Image.js";

export class SkillExperienceThumbnail extends Component
{
    constructor(experience, local_user, notifications, switch_history)
    {
        let { div, title: title_element, intro_text, image, date_text } = createExperienceThumbnail();
        super(div);

        image.base64 = experience.thumbnail;

        local_user.translator.multiTranslate((title, intro, date_from, date_to, date_at, date_to_today) => {
            let language = local_user.preferences.language;

            title_element.innerHTML = title;
            intro_text.innerHTML = intro;

            if (experience.date_to === null)
            {
                date_text.innerHTML = date_from + " " + experience.date_from.toLocaleDateString(language) + " " + date_to_today;
            } else if (experience.date_from.toDateString() == experience.date_to.toDateString()) {
                date_text.innerHTML = date_at + " " + experience.date_from.toLocaleDateString(language);
            } else {
                date_text.innerHTML = date_from + " " + experience.date_from.toLocaleDateString(language) + " " + date_to + " " + experience.date_to.toLocaleDateString(language);
            }
        }, "experiences." + experience.name + ".title", "experiences." + experience.name + ".intro", "date.from", "date.to", "date.at", "date.to-today");
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

    get isOdd()
    {
        return this.element.classList.contains("odd");
    }
}

function createExperienceThumbnail()
{
    let div = document.createElement('div');
    div.classList.add("experience-thumbnail");

    let title = div.appendChild(document.createElement("h3"));

    let content_div = div.appendChild(document.createElement("div"));
    content_div.classList.add("experience-description");

    let intro_text = content_div.appendChild(document.createElement("p"));
    let image = appendChild(content_div, new Image());

    let date_text = div.appendChild(document.createElement('span'));
    date_text.classList.add("date");

    return {
        div,
        title,
        intro_text,
        image,
        date_text
    }
}


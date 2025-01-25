import { appendChild, Component } from "../../../components/Component.js";
import { Image } from "../../../components/Image.js";

export class SkillThumbnail extends Component
{
    constructor(skill, local_user, notifications)
    {
        let { div, image, title } = createSoftSkill();
        super(div);

        this._div = div;
        this._image = image;
        this._title = title;

        image.base64 = skill.logo;

        local_user.translator.multiTranslate((name) => {
            this._title.innerHTML = name;
        }, "skills." + skill.name);
    }
}

function createSoftSkill()
{ 
    let div = document.createElement("div");
    div.classList.add('skill-thumbnail');
    div.classList.add('bordered');

    let image = appendChild(div, new Image());

    let title = div.appendChild(document.createElement('h3'))

    return {
        div,
        image,
        title
    };
}


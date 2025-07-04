import { appendChild, Component } from "../../../../components/Component.js";
import { ImageComponent } from "../../../../components/Image.js";

export class ExperienceSkillThumbnail extends Component
{
    constructor(skill, local_user, notifications, switch_history)
    {
        let { div, image, title } = createExperienceSkill();
        super(div);

        div.addEventListener("click", () => {
            switch_history.pushState("skill", {
                skill: skill.name
            });
        })

        this._div = div;
        this._image = image;
        this._title = title;

        image.base64 = skill.logo;

        local_user.translator.multiTranslate((name) => {
            this._title.innerHTML = name;
        }, "skills." + skill.name);
    }
}

function createExperienceSkill()
{ 
    let div = document.createElement("div");
    div.classList.add('skill-thumbnail');
    div.classList.add('bordered');

    let image = appendChild(div, new ImageComponent());

    let title_div = div.appendChild(document.createElement("div")); // needed because of the table-cell display that can't handle the relative distances
    title_div.classList.add("title-div");

    let title = title_div.appendChild(document.createElement('p'));

    return {
        div,
        image,
        title
    };
}


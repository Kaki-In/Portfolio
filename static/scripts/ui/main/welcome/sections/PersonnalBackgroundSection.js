import { Component } from "../../../components/Component.js";

export class PersonnalBackgroundSection extends Component
{
    constructor(local_user, notifications)
    {
        let { div, title } = createExperienceSection(local_user, notifications);
        super(div);

        this._title = title;

        local_user.translator.multiTranslate((pers_back) => {
            this._title.textContent = pers_back;
        }, "common.title.pers-background")
    }
}

function createExperienceSection(local_user, notifications)
{
    let div = document.createElement("div");

    let title = div.appendChild(document.createElement("h2"));

    return {
        div,
        title
    }
}

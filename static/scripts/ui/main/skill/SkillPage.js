import { Component } from "../../components/Component.js";

export class SkillPage extends Component
{
    constructor(local_user, notifications, switch_history)
    {
        let { div, title, text } = createSkillPage();

        super(div);

        text.innerHTML = "Bonjour";
        title.innerHTML = "Bonjour";
    }
}

function createSkillPage()
{
    let div = document.createElement("div");

    let title = div.appendChild(document.createElement("h1"));

    let text = div.appendChild(document.createElement("p"));

    return {
        div,
        title,
        text,
    }
}


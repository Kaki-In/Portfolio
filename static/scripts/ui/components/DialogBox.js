import { Component, appendChild, removeChild } from "./Component.js";
import { Button } from "./Button.js";

export class DialogBox extends Component
{
    constructor(title)
    {
        let element = createAlertBox(title);
        super(element);
        this._buttons = {};

        this._resolver = undefined;

        this.addButton("OK");
    }

    show()
    {
        let dialogs_section = document.body.querySelector("section#dialogs");
        appendChild(dialogs_section, this);
    }

    hide()
    {
        let dialogs_section = document.body.querySelector("section#dialogs");
        appendChild(dialogs_section, this);
    }

    addButton(name)
    {
        let button = new Button();
        button.addEventListener("click", () => {this._resolver.resolve(name)})
        this._buttons[name] = button;
        appendChild(this.element.querySelector("#buttons-div"), button);
        return button;
    }

    removeButton(name)
    {
        removeChild(this.element.querySelector("#buttons-div"), this._buttons[name]);
        delete this._buttons[name];
    }

    resolver()
    {
        return this._resolver;
    }

    setButtons(...names)
    {
        for (let name of Object.keys(this._buttons))
        {
            this.removeButton(name);
        }

        let buttons = [];
        for (let name of names)
        {
            buttons.push(this.addButton(name));
        }
        return buttons;
    }

    async main()
    {
        let promise = new Promise((resolve, reject) => {
            this._resolver = resolve;
        });
        this.show();

        return await promise;
    }

}

function createAlertBox(title)
{
    let div = document.createElement("div");
    div.classList.add("dialog-div");

    let h1 = div.appendChild(document.createElement("h1"));
    h1.textContent = title;

    let content = div.appendChild(document.createElement("div"));
    content.classList.add("dialog-content");

    let button_div = div.appendChild(document.createElement("div"));
    button_div.id = "buttons-div"

    return div;
}

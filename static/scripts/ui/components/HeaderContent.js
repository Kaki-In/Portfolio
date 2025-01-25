import { Component, appendChild, removeChild } from "./Component.js";
import { Button } from "./Button.js";
import { HeaderBurger } from "./HeaderBurger.js";

export class HeaderContent extends Component {

    constructor() {
        let { div, buttons_div, logo } = createHeaderContent();

        super(div);

        this._buttons = buttons_div;

        this._logo = logo;
    }

    setLogo(name, func) {
        this._logo.src = "./static/images/" + name;
        this._logo.addEventListener("click", func);
    }

    addButton(name, func) {
        let button = new Button(name);
        button.className = "header-button";
        button.addEventListener("click", func);
        button.addEventListener("click", () => {document.querySelector("header").classList.remove("open");});

        let li = document.createElement("li");
        li.classList.add("bordered");
        appendChild(li, button);

//        li.textContent = name;

        this._buttons.appendChild(li);

        return button;
    }

    addSpace() {
        let space = document.createElement("span");
        this._buttons.appendChild(space).classList = "space";

        return space;
    }

    addComponent(component) {
        appendChild(this._buttons, component);
    }

    addElement(element) {
        this._buttons.appendChild(element);
    }

    addSeparator()
    {
        this._buttons.appendChild(document.createElement("span")).classList = "separator";
    }

    get logo()
    {
        return this._logo;
    }

}

function createHeaderContent() {
    let div = document.createElement("div");
    div.classList.add("header-content");

    let logo = document.createElement("img");
    div.appendChild(logo);

    let buttons_div = div.appendChild(document.createElement("ul"));
    buttons_div.classList.add("header-menu");

    return {
        div,
        buttons_div,
        logo
    };
}

import { Component, appendChild, removeChild } from "./Component.js";
import { Button } from "./Button.js";

export class FooterContent extends Component {

    constructor() {
        let div = createFooterContent();
        super(div);

        this._sections = div.querySelector("#footer-sections");
        this._copyright = div.querySelector("#copyright");

    }

    setCopyright(author, date, license)
    {
        this._copyright.textContent = author + " - Copyright " + date + " - " + (license?license:"All rights reserved");
    }

    addList(list)
    {
        appendChild(this._sections, list);
    }

}

function createFooterContent() {
    let div = document.createElement("div");
    div.classList.add("footer-content");

    let sections = div.appendChild(document.createElement("div"));
    sections.classList = "footer-sections";
    sections.id = "footer-sections";

    div.appendChild(document.createElement("p")).id = "copyright";

    return div;
}

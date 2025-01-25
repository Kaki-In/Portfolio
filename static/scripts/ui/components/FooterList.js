import { Component, appendChild, removeChild } from "./Component.js";
import { Button } from "./Button.js";

export class FooterList extends Component {

    constructor(title) {
        let { element, title_elem } = createFooterList(title);

        super(element);

        this._title = title_elem;
    }

    addAction(name, onclick) 
    {
        let li = document.createElement("li");
        let button = li.appendChild(document.createElement("button"));
        button.textContent = name;
        button.addEventListener("click", onclick);

        this.element.appendChild(li);

        return button;
    }

    addLink(name, href)
    {
        let li = document.createElement("li");
        let a = li.appendChild(document.createElement("a"));
        a.textContent = name;
        a.href = href;
        a.target = "_blank";

        this.element.appendChild(li);

        return a;
    }

    get title()
    {
        return this._title.textContent;
    }

    set title(value)
    {
        this._title.textContent = value;
    }

}

function createFooterList(title) {
    let element = document.createElement("ul");
    element.classList.add("footer-list");

    let title_elem = element.appendChild(document.createElement("h1"));
    title_elem.textContent = title;

    return {
        element,
        title_elem
    };
}

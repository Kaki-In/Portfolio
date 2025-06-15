import { Component, appendChild } from "./Component.js";
import { Loader } from "./Loader.js";
import { ImageComponent } from "./Image.js";

export class Button extends Component {

    constructor(text) {
        let {button, image} = createButton(text);
        super(button);

        this._button = button;
        this.element = button;
        this._loading = false;
        this._className = "";
        this._icon = image;

        this._loader = button.querySelector("span.loader");
    }

    get icon() {
        return this._icon;
    }

    set text(text) {
        this.element.children[ 2 ].textContent = text;
    }

    set innerHTML(content)
    {
        this.element.children[ 2 ].innerHTML = content;
    }

    get text() {
        return this.element.children[ 2 ].textContent;
    }

    get innerHTML()
    {
        return this.element.children[ 2 ].innerHTML;
    }

    set loading(value) {
        this._loading = value;
        if (this._loading) {
            this._loader.classList.remove("hidden");
            this.element.classList.add("loading");
            this.disable();
        } else {
            this._loader.classList.add("hidden");
            this.element.classList.remove("loading");
            this.enable();
        }
    }    
    
    set className(name) {
        this._className = name;
        this.element.className = name;
    }

    addEventListener(name, func) {
        this._button.addEventListener(name, func);
    }

    enable() {
        this._button.disabled = false;
    }

    disable() {
        this._button.disabled = true;
    }

}

function createButton(text, listener) {
    let button = document.createElement('button');
    button.addEventListener("click", listener);
    appendChild(button, new Loader()).element.classList.add("hidden");
    let image = appendChild(button, new ImageComponent());
    button.appendChild(document.createElement("text")).textContent = text;
    return {button, image};
}


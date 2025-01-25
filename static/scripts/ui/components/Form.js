import { Component, appendChild, insertBefore } from "./Component.js";
import { Button } from "./Button.js";
import { EventHandler } from "../../events/EventHandler.js";

export class Form extends Component {

    constructor(title) {
        let element = createForm(title);
        super(element[ 0 ]);
        this._button = element[ 1 ];
        this.button.addEventListener("click", () => {
            let args = [];
            for (let input of this._inputs) {
                let value;
                switch(input.type)
                {
                    case "checkbox":
                        value = input.checked;
                        break;
                    default: 
                        value = input.value;
                }
                args.push(value);
            }
            this._events[ "submit" ].emit(...args);
        });

        this._events = {
            "submit": new EventHandler()
        }

        this._alternatives = [];
        this._inputs = [];

        this._loading = false;
    }

    addEventListener (name, func) {
        let event = this._events[ name ]
        if (event === undefined) {
            throw new ReferenceError("no event named " + name);
        }  else {
            event.connect(func);
        }
    }

    get loading() {
        return this._loading;
    }

    set loading(loading) {
        this._loading = loading;
        this.button.loading = loading;
        if (loading) 
        {
            this.button.disable();
        } else {
            this.button.enable();
        };
        for (let input of this._inputs) {
            input.disabled = loading;
        }
        this.reloadButtonVisibility();
    }

    get button () {
        return this._button;
    }

    get inputs() {
        return this._inputs;
    }

    get alternatives() {
        return this._alternatives;
    }

    addAlternative(text, linktext, func){
        let p = document.createElement("p");
        p.className = "alternative-text";
        p.appendChild(document.createElement("text")).textContent = text + (text[ -1 ] === " "? "" : " ") ;
        let button = appendChild(p, new Button(linktext));
        button.className = 'text';
        button.addEventListener("click", func);
        this.element.insertBefore(p, this.button.element);

        this._alternatives.push(button);
        this.reloadButtonVisibility();
    }

    addInput(name, type, needed) {
        let label = document.createElement("label");
        label.className = "input-label";
        label.innerHTML = name + (name[ name.length - 1 ] === ":"? "" : ":") ;

        let input;
        if (type === "textarea")
        {
            input = document.createElement("textarea");
            input.rows = 5;
        } else {
            input = document.createElement("input");
            input.type = type;
        }

        if (needed) {
            input.needed = true;
        }
        input.addEventListener("input", () => {
            this.reloadButtonVisibility();
        });
        input.placeholder = name;
    
        this.element.insertBefore(label, this.button.element);
        this.element.insertBefore(input, this.button.element);

        this._inputs.push(input);
        this.reloadButtonVisibility();
    }

    reloadButtonVisibility()
    {
        if (this.checkValidity())
        {
            this.button.enable();
        } else {
            this.button.disable();
        }
    }

    checkValidity() {
        for (let input of this._inputs) {
            if ( input.value === "" && input.needed ) {
                return false;
            }
        }
        return true;
    }

}

function createForm(title) {
    let div = document.createElement("div");
    div.className = "form";

    div.appendChild(document.createElement("h2")).textContent = title;

    let button = new Button("");
    button.className = "submit-button";
    appendChild(div, button);

    return [ div, button ];
}


import { Component, appendChild } from "./Component.js";
import { Button } from "./Button.js";

export class FormLine extends Component {

    constructor() {
        let form = createFormLine();
        super(form.element);

        this._input = form.input;
        this._button = form.button;
    }

    get value()
    {
        return this._input.value;
    }

    set value(content)
    {
        this._input.value = content;
    }

    get button()
    {
        return this._button;
    }

}

function createFormLine() {
    let div = document.createElement("div");
    div.className.add("form-line");

    let input = div.appendChild(document.createElement("input"));
    let button = appendChild(div, new Button());

    return {
        element: div,
        input: input,
        button: button
    }
}


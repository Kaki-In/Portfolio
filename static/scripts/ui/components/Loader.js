import { Component } from "./Component.js";

export class Loader extends Component {

    constructor() {

        super(createDiv());

    }

}

function createDiv() {
    let div = document.createElement("span");
    div.className = "loader";
    return div;
}


import { Component } from "./Component.js";

export class Loader extends Component {

    constructor() {

        super(createLoader());

    }

}

function createLoader() {
    let div = document.createElement("span");
    div.className = "loader";
    return div;
}


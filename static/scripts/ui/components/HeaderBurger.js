import { Component } from "./Component.js";

export class HeaderBurger extends Component {

    constructor() {

        super(createHeaderBurger());

    }

}

function createHeaderBurger() {
    let div = document.createElement("div");
    div.className = "menu-burger";

    return div;
}


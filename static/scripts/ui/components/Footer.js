import { Component, appendChild } from "./Component.js";

export class FooterComponent extends Component {

    constructor(adapter) {
        let element = document.getElementsByTagName("footer")[ 0 ];

        if (element === null) {
            throw ReferenceError("couldn't find footer element");
        }

        element.innerHTML = "";

        super(element);

        appendChild(element, adapter);
        this.__adapter__ = adapter;
    }

    get adapter() {
        return this.__adapter__;
    }

}
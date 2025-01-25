import { Component } from "./Component.js";

export class VisioComponent extends Component
{
    constructor()
    {
        let element = createVisioElement();
        super(element);
    }

    prepare(domain, options)
    {
        options.parentNode = this.element;
        this._api = new JitsiMeetExternalAPI(domain, options);
    }

    get api()
    {
        return this._api;
    }
}

function createVisioElement()
{
    let div = document.createElement("div");
    div.className = "jitsi-lounge-div";
    return div;

}


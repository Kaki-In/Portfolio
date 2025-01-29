import { appendChild, Component } from "../../../../components/Component.js";
import { EsriMap } from "../../../../components/Map.js";

export class CountriesSection extends Component
{
    constructor(title, map_id, local_user, notifications, switch_history)
    {
        let { div, title: title_element } = createCountriesSection(map_id, local_user, notifications, switch_history);

        super(div);

        local_user.translator.multiTranslate((title) => {
            title_element.innerHTML = title;
        }, title);

    }
}

function createCountriesSection(map_id)
{
    let div = document.createElement("div");
    div.classList.add("countries-section");

    let title = div.appendChild(document.createElement("h2"));

    let map = appendChild(div, new EsriMap(map_id));

    return {
        div,
        title
    }
}


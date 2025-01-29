import { Button } from "./Button.js";
import { Component } from "./Component.js";

export class EsriMap extends Component
{
    constructor(map_id)
    {
        let map = createMap();
        super(map);

        this.prepare(map_id);
    }

    async prepare(map_id) {
        while (!(this.element.parentNode && ESRI.loaded)) await new Promise((resolve, reject) => {setTimeout(resolve, 100)});

        this._map = new ESRI.WebMap({
          portalItem: {
                  id: "810d2ec0386d4e30b3144cfd22e6781c"
              }
        });

        this._view = new ESRI.MapView({
          map: this._map,
          center: [2.618787, 47.824905],
          zoom: 3, // scale: 72223.819286
          container: this.element,
        });

        let button = new Button();
        button.icon.sourcePath = "/static/images/icons/fullscreen.png";
        button.addEventListener("click", () => {
            if (this.element.classList.contains("full-screen"))
            {
                this.element.classList.remove("full-screen");
                button.icon.sourcePath = "/static/images/icons/fullscreen.png";
            } else {
                this.element.classList.add("full-screen");
                button.icon.sourcePath = "/static/images/icons/out-fullscreen.png";
            }
        });

        this._view.ui.add(button.element, "top-left");

    }
}


function createMap()
{
    let element = document.createElement("div");
    element.classList.add("esri-map-integration");
    element.classList.add("bordered");

    return element;
}

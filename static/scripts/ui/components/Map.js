import { Button } from "./Button.js";
import { Component } from "./Component.js";
import { EventHandler } from "../../events/EventHandler.js";
export class EsriMap extends Component
{
    constructor(map_id)
    {
        let map = createMap();
        super(map);

        this._events = {
            displayed: new EventHandler()
        }

        this.prepare(map_id);
    }

    addEventListener(name, func)
    {
        this._events[name].connect(func);
    }

    async prepare(map_id) {
        while (!(this.element.parentNode && ESRI.loaded)) await new Promise((resolve, reject) => {setTimeout(resolve, 100)});

        this._map = new ESRI.WebMap({
          portalItem: {
                  id: "4f2e99ba65e34bb8af49733d9778fb8e"
              }
        });

        this._view = new ESRI.SceneView({
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

        this._view.when(() => {
            this._events.displayed.emit();
        });
    }

    get map()
    {
        return this._map;
    }

    get view()
    {
        return this._view;
    }
}


function createMap()
{
    let element = document.createElement("div");
    element.classList.add("esri-map-integration");
    element.classList.add("bordered");

    return element;
}

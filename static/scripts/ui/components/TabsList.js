import { Button } from "./Button.js";
import { Component, appendChild, removeChild } from "./Component.js";
import { EventHandler } from "../../events/EventHandler.js";

export class TabsList extends Component
{
    constructor() {
        let element = createTabsList();
        super(element)

        this._buttons = [];
        this._selected = 0;
        this._tabsAdapter = null;
    }

    get orientation()
    {
        return this.element.classList.includes("vertical") ? "vertical" : "horizontal";
    }

    set orientation( direction )
    {
        if (direction === "vertical")
        {
            this.element.classList.add("vertical");
        } else if (direction === "horizontal")
        {
            this.element.classList.remove("vertical");
        };
    }

    addTab(name, icon)
    {
        let button = new Button(name);
        button.icon.sourcePath = "static/images/icons/" + icon + ".png";

        button.addEventListener("click", () => {
            if (this._tabsAdapter !== null) this._tabsAdapter.displayedComponent = this._buttons.indexOf(button);
        });

        this._buttons.push(button);

        appendChild(this.element, button);
    }

    removeTab(position) 
    {
        let button = this._buttons.splice(position, 1) [0];
        removeChild(this.element, button);
    }

    setTabsList(names_and_icons)
    {
        while (this._buttons) this.removeTab(0)
        for (let name_and_icon of names_and_icons)
        {
            let name = name_and_icon.name;
            let icon = name_and_icon.icon;

            this.addTab(name, icon);
        };
    }

    addEventListener(name, func)
    {
        this._events[ name ].emit(func);
    }

    set selected(n)
    {
        this._buttons[this._selected].element.classList.remove("selected");
        this._buttons[n].element.classList.add("selected");
        this._selected = n;
    }

    get selected()
    {
        return this._selected;
    }

    set tabsAdapter(ta)
    {
        this._tabsAdapter = ta;
        if (ta.tabsList !== this)
        {
            ta.tabsList = this;
        }
    }

    get tabsAdapter ()
    {
        return this._tabsAdapter;
    }
}


function createTabsList()
{
    let div = document.createElement("div");
    div.classList.add("tabslist-div");

    return div;
}


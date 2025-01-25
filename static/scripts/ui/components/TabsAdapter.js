import { Adapter } from "./Adapter.js";
import { Component, appendChild } from "./Component.js";
import { EventHandler } from "../../events/EventHandler.js";

export class TabsAdapter extends Adapter
{
    constructor()
    {
        super();

        this._displayedComponent = 0;

        this._tabslist = null;

        this._events = {
            tabChanged: new EventHandler()
        };
    }

    addEventListener(name, func)
    {
        this._events[ name ].connect(func);
    }

    getTab(n)
    {
        return new Component(document.createElement("div"));
    }

    set displayedComponent(n)
    {
        this._displayedComponent = n;
        this.content = this.getTab(n);
        if (this._tabslist) this._tabslist.selected = n;
        this._events.tabChanged.emit(n);
    }

    get displayedComponent()
    {
        return this._displayedComponent;
    }

    set tabsList(tl)
    {
        this._tabslist = tl;
        if (tl.tabsAdapter !== this)
        {
            tl.tabsAdapter = this;
        }
    }

    get tabsList()
    {
        return this._tabslist;
    }
}

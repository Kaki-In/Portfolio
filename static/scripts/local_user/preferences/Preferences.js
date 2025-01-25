import { EventHandler } from "../../events/EventHandler.js";

export class UserPreferences
{
    constructor(database)
    {
        this._database = database;

        this._object = database.createObject("user-prefs");

        this._events = {
            language_changed: new EventHandler()
        }
    }

    addEventListener(name, func)
    {
        this._events[name].connect(func);
    }

    get language()
    {
        let lang = this._object.get("lang");
        if (!lang) lang = "en";
        return lang;
    }

    set language(value)
    {
        this._object.set("lang", value);
        this._events.language_changed.emit();
    }
}

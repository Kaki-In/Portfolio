import { EventHandler } from "../../events/EventHandler.js";
import { Translation } from "./Translation.js";

export class TranslatedText extends Translation
{
    constructor(data, preferences)
    {
        super();

        this._data = data;
        this._preferences = preferences;
       
        this._events.change = new EventHandler();

        this.addEventListener("update", () => {
            this._events.change.emit(this.actual_translation);
        });
        this._preferences.addEventListener("language_changed", () => {
            this._events.change.emit(this.actual_translation);
        });
    }

    get actual_translation()
    {
        return this.getTranslation(this._preferences.language);
    }


}
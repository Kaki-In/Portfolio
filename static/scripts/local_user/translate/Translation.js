import { EventHandler } from "../../events/EventHandler.js";
import { TranslationParser } from "./TranslationParser.js";

export class Translation
{
    constructor(data)
    {
        this._data = data;

        this._events = {
            update: new EventHandler()
        }
    }

    addEventListener(name, func)
    {
        this._events[name].connect(func);
    }

    getTranslation(language)
    {
        let data = this._data[language];

        if (data)
        {
            let parser = new TranslationParser();
            return parser.parse(data);
        } else {
            return this.getDefaultTranslation();
        }
    }

    getDefaultTranslation()
    {
        let parser = new TranslationParser();
        return parser.parse(this._data.en);
    }

    setTranslation(language, value)
    {
        this._data[language] = value;
        this._events["update"].emit();
    }

    setTranslationData(data)
    {
        this._data = data;
        this._events["update"].emit();
    }
}


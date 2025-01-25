import { MultiTranslator } from "./MultiTranslate.js";
import { TranslatedText } from "./TranslatedText.js";

export class TextTranslator
{
    constructor(api, preferences)
    {
        this._api = api;
        this._preferences = preferences;

        this._translations = {};
    }

    translate(name)
    {
        if (Object.keys(this._translations).includes(name))
        {
            return this._translations[name];
        } else {
            let t = new TranslatedText({en: name}, this._preferences);
            this._translations[name] = t;
            this._translateObject(name, t);
            return t;
        }
    }

    multiTranslate(func, ...names)
    {
        let translations = [];

        for (let name of names)
        {
            let result = this.translate(name);
            translations.push(result);
        }

        return new MultiTranslator(func, ...translations);
    }

    async _translateObject(name, translation)
    {
        try {
            translation.setTranslationData(await this._api.sendAction("translate", {
                name
            }));
        } catch (exc) {
            translation.setTranslationData({en: 'an error occured : ' + exc.message});
        }
    }
}


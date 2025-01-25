import { EventHandler } from "../events/EventHandler.js";
import { DistantAPI } from "./api/DistantApi.js";
import { CookiesDatabase } from "./cookies/CookiesDatabase.js";
import { UserPreferences } from "./preferences/Preferences.js";
import { TextTranslator } from "./translate/TranslateAPI.js";
import { World } from "./world/World.js";

export class LocalUser
{
    constructor()
    {
        this._database = new CookiesDatabase("em-portfolio");
        this._preferences = new UserPreferences(this._database);

        this._api = new DistantAPI("https://eden-morey.flopcreation.fr/api");
        this._translator = new TextTranslator(this._api, this._preferences);
        this._world = new World(this._api);

        this._events = {
            update: new EventHandler()
        }
    }

    addEventListener(name, func)
    {
        this._events[name].connect(func);
    }

    get database()
    {
        return this._database;
    }

    get translator()
    {
        return this._translator;
    }

    get preferences()
    {
        return this._preferences;
    }

    get world()
    {
        return this._world;
    }

    get mobileState()
    {
        var userAgent = navigator.userAgent.toLowerCase();

        let mobile = {
            mobile: false,
            dimensions: null,
            system: null
        }
    
        if (userAgent.includes("mobi")) {
            mobile.mobile = true;
            mobile.dimensions = "phone";
        };
        if (userAgent.includes("tablet")) {
            mobile.mobile = true;
            mobile.dimensions = "tablet";
        };
        if (userAgent.includes("android")) {
            mobile.system = "android";
        } else {
            mobile.system = "ios";
        }
        return mobile;
    
    }

}

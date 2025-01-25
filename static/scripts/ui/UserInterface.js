import { FooterUI } from "./footer/Footer.js";
import { HeaderUI } from "./header/Header.js";
import { MainUI } from "./main/MainUI.js";
import { Notifications } from "./notifications/Notifications.js";

export class UserInterface 
{
    constructor(local_user)
    {
        this._notifications = new Notifications();
        this._main_ui = new MainUI(local_user, this._notifications);
        this._header = new HeaderUI(local_user, this._notifications);
        this._footer = new FooterUI(local_user, this._notifications);
    }

    get main()
    {
        return this._main_ui;
    }

    get notifications()
    {
        return this._notifications;
    }
}

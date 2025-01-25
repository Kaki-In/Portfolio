import { MainComponent } from "../components/Main.js";
import { Adapter } from "../components/Adapter.js";
import { WelcomePage } from "./welcome/WelcomePage.js";

export class MainUI extends MainComponent
{
    constructor(local_user, notifications)
    {
        super(new Adapter());

        this._local_user = local_user;
        this._notifications = notifications;

        this.displayWelcome();
    }

    displayWelcome() {
        this.adapter.content = new WelcomePage(this._local_user, this._notifications);
    }

    get title()
    {
        
    }

}


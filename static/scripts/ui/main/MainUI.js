import { MainComponent } from "../components/Main.js";
import { Adapter } from "../components/Adapter.js";
import { WelcomePage } from "./welcome/WelcomePage.js";
import { SkillPage } from "./skill/SkillPage.js";

export class MainUI extends MainComponent
{
    constructor(local_user, notifications, switch_history)
    {
        super(new Adapter());

        this._local_user = local_user;
        this._notifications = notifications;
        this._switch_history = switch_history;

        switch_history.addEventListener("pop", () => {
            this.refreshPage();
        });

        switch_history.addEventListener("push", () => {
            this.refreshPage();
        });

        this.refreshPage();
    }

    displayWelcome() {
        this.adapter.content = new WelcomePage(this._local_user, this._notifications, this._switch_history);
    }

    refreshPage()
    {
        let [name, ...args] = this._switch_history.path;

        let displayed_component;

        switch (name)
        {
            case "skill":
                displayed_component = new SkillPage(this._local_user, this._notifications, this._switch_history);
                break

            default:
                displayed_component = new WelcomePage(this._local_user, this._notifications, this._switch_history);
        }

        this.adapter.content = displayed_component;

    }

}


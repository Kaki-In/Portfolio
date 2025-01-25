import { HeaderContent } from "../components/HeaderContent.js";

export class MainHeaderContent extends HeaderContent
{
    constructor(local_user, notifications)
    {
        super();

        this.setLogo("icon256x256.png", () => {
        });

        this._my_project_button = this.addButton("", () => {
        });

        this._pers_background_button = this.addButton("", () => {
        });

        this._prof_background_button = this.addButton("", () => {
        });

        let button_fr = this.addButton("FR", () => {
            local_user.preferences.language = "fr";
        });
        button_fr.icon.sourcePath = "/static/images/langs/lang_fr.png";

        let button_en = this.addButton("EN", () => {
            local_user.preferences.language = "en";
        });
        button_en.icon.sourcePath = "/static/images/langs/lang_en.png";

        let button_de = this.addButton("DE", () => {
            local_user.preferences.language = "de";
        });
        button_de.icon.sourcePath = "/static/images/langs/lang_de.png";

        local_user.translator.multiTranslate((projects, pers, prof) => {
            this._my_project_button.innerHTML = projects;
            this._pers_background_button.innerHTML = pers;
            this._prof_background_button.innerHTML = prof;
            
        }, "common.title.projects", "common.title.pers-background", "common.title.prof-background");
    }
}
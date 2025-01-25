import { FooterList } from "../../components/FooterList.js";

export class PersonnalExperienceList extends FooterList
{
    constructor(local_user) 
    {
        super("Mon parcours personnel");

        this._pers_action = this.addAction("Mon parcours personnel");

        local_user.translator.multiTranslate((pers) => {
            this.title = pers;
            this._pers_action.innerHTML = pers;

        }, "common.title.pers-background");
    }
}



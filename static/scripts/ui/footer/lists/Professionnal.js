import { FooterList } from "../../components/FooterList.js";

export class ProfessionnalFooterList extends FooterList
{
    constructor(local_user) 
    {
        super("Mon parcours professionel");

        this._prof_action = this.addAction("Mon parcours professionel");

        local_user.translator.multiTranslate((prof) => {
            this.title = prof;
            this._prof_action.innerHTML = prof;

        }, "common.title.prof-background");
    }
}



import { FooterList } from "../../components/FooterList.js";

export class ProjectsList extends FooterList
{
    constructor(local_user) 
    {
        super("Mes projets");

        this._projects_action = this.addAction("Mes projets");

        local_user.translator.multiTranslate((projects) => {
            this.title = projects;
            this._projects_action.innerHTML = projects;

        }, "common.title.projects");
    }
}



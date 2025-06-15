import { FooterList } from "../../components/FooterList.js";

export class WebsiteFooterList extends FooterList
{
    constructor(local_user) 
    {
        super("Rubriques");

        this._welcome_action = this.addAction("Bienvenue!", () => {

        });

        this._projects_action = this.addAction("Mes projets", () => {

        });

        this._pers_action = this.addAction("Mon parcours personnel", () => {

        });

        this._prof_action = this.addAction("Mon parcours professionnel", () => {

        });

        this._hard_skills_action = this.addAction("Mes compétences", () => {

        });

        this._soft_skills_action = this.addAction("Mes qualités", () => {
        });


        local_user.translator.multiTranslate((sections, hello, projects, pers, prof, hard, soft) => {
            this.title = sections;

            this._welcome_action.innerHTML = hello;
            this._projects_action.innerHTML = projects;
            this._pers_action.innerHTML = pers;
            this._prof_action.innerHTML = prof;
            this._hard_skills_action.innerHTML = hard;
            this._soft_skills_action.innerHTML = soft;

        }, "common.title.sections", "common.hello", "common.title.projects", "common.title.pers-background", "common.title.prof-background", "common.title.hard-skills", "common.title.soft-skills");
    }
}



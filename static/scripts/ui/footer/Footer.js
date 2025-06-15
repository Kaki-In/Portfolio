import { Adapter } from "../components/Adapter.js";
import { FooterComponent } from "../components/Footer.js";
import { FooterContent } from "../components/FooterContent.js";
import { HardSkillsFooterList } from "./lists/Competences.js";
import { ContactMeFooterList } from "./lists/Contact.js";
import { PersonnalExperienceFooterList } from "./lists/Personnal.js";
import { ProfessionnalFooterList } from "./lists/Professionnal.js";
import { ProjectsFooterList } from "./lists/Projects.js";
import { SoftSkillsFooterList } from "./lists/Qualities.js";
import { WebsiteFooterList } from "./lists/Website.js";

export class FooterUI extends FooterComponent
{
    constructor(local_user)
    {
        super(new Adapter());

        this._list = new FooterContent();

        this.adapter.content = this._list;

        this._list.addList(new WebsiteFooterList(local_user));
/*        this._list.addList(new ProjectsList(local_user));
        this._list.addList(new HardSkillsList(local_user));
        this._list.addList(new SoftSkillsList(local_user));
        this._list.addList(new PersonnalExperienceList(local_user));
        this._list.addList(new ProfessionnalList(local_user));*/
        this._list.addList(new ContactMeFooterList(local_user));

        this.adapter.content.setCopyright("Créé à la main par Eden Morey", new Date().getFullYear());

        local_user.translator.multiTranslate((copyright_translation) => {
            this.adapter.content.setCopyright(copyright_translation, new Date().getFullYear());
        }, 'copyright');

    }

}


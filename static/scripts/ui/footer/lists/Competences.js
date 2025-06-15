import { FooterList } from "../../components/FooterList.js";

export class HardSkillsFooterList extends FooterList
{
    constructor(local_user) 
    {
        super("Mes compétences");

        local_user.translator.multiTranslate((title) => {
            this.title = title;
        }, 'common.title.hard-skills');
    }

}



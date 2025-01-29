import { ExperiencesSection } from "./ExperiencesSection.js";

export class PersonnalBackgroundSection extends ExperiencesSection
{
    constructor(local_user, notifications, switch_history)
    {
        super("common.title.pers-background", 1, local_user, notifications, switch_history);
    }
}

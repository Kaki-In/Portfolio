import { ExperiencesSection } from "./ExperiencesSection.js";

export class ProfessionnalBackgroundSection extends ExperiencesSection
{
    constructor(local_user, notifications, switch_history)
    {
        super("common.title.prof-background", 0, local_user, notifications, switch_history);
    }
}

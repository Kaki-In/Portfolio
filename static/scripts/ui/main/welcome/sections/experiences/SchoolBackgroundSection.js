import { ExperiencesSection } from "./ExperiencesSection.js";

export class SchoolBackgroundSection extends ExperiencesSection
{
    constructor(local_user, notifications, switch_history)
    {
        super("common.title.school-background", 2, local_user, notifications, switch_history);
    }
}

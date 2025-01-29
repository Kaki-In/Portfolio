import { PROJECT_TYPE_PERSONNAL } from "../../../../../local_user/world/projects/Project.js";
import { ProjectsSection } from "./ProjectsSection.js";

export class PersonnalProjectsSection extends ProjectsSection
{
    constructor(local_user, notifications, switch_history)
    {
        super("common.title.pers-projects", PROJECT_TYPE_PERSONNAL, local_user, notifications, switch_history);
    }
}


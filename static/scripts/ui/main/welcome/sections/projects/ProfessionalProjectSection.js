import { PROJECT_TYPE_PROFESSIONNAL } from "../../../../../local_user/world/projects/Project.js";
import { ProjectsSection } from "./ProjectsSection.js";

export class ProfessionnalProjectsSection extends ProjectsSection
{
    constructor(local_user, notifications, switch_history)
    {
        super("common.title.prof-projects", PROJECT_TYPE_PROFESSIONNAL, local_user, notifications, switch_history);
    }
}


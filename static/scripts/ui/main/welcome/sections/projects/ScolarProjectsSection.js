import { PROJECT_TYPE_SCOLAR } from "../../../../../local_user/world/projects/Project.js";
import { ProjectsSection } from "./ProjectsSection.js";

export class ScolarProjectsSection extends ProjectsSection
{
    constructor(local_user, notifications, switch_history)
    {
        super("common.title.school-projects", PROJECT_TYPE_SCOLAR, local_user, notifications, switch_history);
    }
}


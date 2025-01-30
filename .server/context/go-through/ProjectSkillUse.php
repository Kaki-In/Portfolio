<?php

require "context/database/sqlElement.php";

require "SkillUse.php";
require "context/projects/Projects.php";
require "context/experiences/Experiences.php";

class ProjectSkillUse extends SkillUse
{
    private ProjectsList $projects;

    public function __construct(ElementConnection $element, ProjectsList $projects, SkillsList $skills)
    {
        parent::__construct($element, $skills);

        $this->projects = $projects;
    }

    public function project() : Project
    {
        return $this->projects->getProject($this->element->element);
    }
    
}

?>
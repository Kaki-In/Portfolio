<?php

require "context/database/sqlElement.php";

require "SkillUse.php";
require "context/projects/Projects.php";
require "context/experiences/Experiences.php";

class ProjectSkillUse extends SkillUse
{
    private ProjectsList $projects;
    private SkillsList $skills;

    public function __construct(ElementConnection $element, ProjectsList $projects, SkillsList $skills)
    {
        parent::__construct($element);

        $this->projects = $projects;
        $this->skills = $skills;
    }

    public function skill() : Skill
    {
        return $this->skills->getSkill($this->element->skill);
    }

    public function project() : Project
    {
        return $this->projects->getProject($this->element->element);
    }
    
}

?>
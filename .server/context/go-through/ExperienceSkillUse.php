<?php

require "context/database/sqlElement.php";

require "SkillUse.php";
require "context/projects/Projects.php";
require "context/experiences/Experiences.php";

class ExperienceSkillUse extends SkillUse
{
    private ExperiencesList $experiences;
    private SkillsList $skills;

    public function __construct(ElementConnection $element, ExperiencesList $experiences, SkillsList $skills)
    {
        parent::__construct($element);

        $this->experiences = $experiences;
        $this->skills = $skills;
    }

    public function skill() : Skill
    {
        return $this->skills->getSkill($this->element->skill);
    }

    public function experience() : Experience
    {
        return $this->experiences->getExperience($this->element->element);
    }
    
}

?>
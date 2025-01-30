<?php

require "context/database/sqlElement.php";

require "SkillUse.php";
require "context/projects/Projects.php";
require "context/experiences/Experiences.php";

class ExperienceSkillUse extends SkillUse
{
    private ExperiencesList $experiences;

    public function __construct(ElementConnection $element, ExperiencesList $experiences, SkillsList $skills)
    {
        parent::__construct($element, $skills);

        $this->experiences = $experiences;
    }

    public function experience() : Experience
    {
        return $this->experiences->getExperience($this->element->element);
    }
    
}

?>
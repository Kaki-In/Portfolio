<?php

if (!isset($HEADER_SKILL_USE))
{
    $HEADER_SKILL_USE = 0;

    require "context/database/sqlElement.php";

    class SkillUse
    {
        protected ElementConnection $element;
        private SkillsList $skills;

        public function __construct(ElementConnection $element, SkillsList $skills)
        {
            $this->element = $element;
            $this->skills = $skills;
        }

        public function skill() : Skill
        {
            return $this->skills->getSkill($this->element->skill);
        }

        public function element() : string
        {
            return $this->element->element;
        }

        public function type() : int
        {
            return $this->element->type;
        }
        
    }
}

?>